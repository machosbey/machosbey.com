import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID, timingSafeEqual } from 'node:crypto';
import sharp from 'sharp';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';
import { db, init } from '@/lib/cms/db';
import { admin, body, sameOrigin, limit, hash, passwordHash, verify, loginSession } from '@/lib/cms/auth';
import { defaults, validateContent } from '@/lib/cms/model';
export const runtime='nodejs';
export const dynamic='force-dynamic';
type Context={params:Promise<{action:string}>};
const json=(data:unknown,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'no-store'}});
function failure(error:unknown) {
 const code=error instanceof Error?error.message:'';
 const messages:Record<string,[number,string]>={FORBIDDEN:[403,'الطلب غير مسموح.'],UNAUTHORIZED:[401,'سجّل الدخول للمتابعة.'],RATE_LIMIT:[429,'محاولات كثيرة. انتظر 15 دقيقة ثم حاول مجدداً.'],CONFLICT:[409,'تغيّر المحتوى من جلسة أخرى. أعد تحميل البيانات قبل الحفظ.'],INVALID:[400,'راجع البيانات المدخلة.'],TOO_LARGE:[413,'الملف أكبر من الحد المسموح.'],SETUP_DISABLED:[403,'إنشاء المدير غير متاح. راجع إعداد رمز التهيئة.']};
 const [status,message]=messages[code]||[503,'تعذّر إتمام العملية. تحقق من إعدادات قاعدة البيانات ثم حاول مجدداً.'];
 if(status===503)console.error('CMS operation failed:', (error as {code?:string})?.code||'configuration or data error');
 return json({error:message},status);
}
export async function GET(request:Request,ctx:Context){
 try {
  await init(); const {action}=await ctx.params;
  if(action==='state'){
   const [rows]=await db().execute<RowDataPacket[]>('SELECT id FROM cms_admin WHERE id=1');
   return json({setupRequired:rows.length===0,authenticated:Boolean(await admin())});
  }
  if(!await admin())throw new Error('UNAUTHORIZED');
  if(action==='content'){
   const [rows]=await db().execute<RowDataPacket[]>('SELECT draft,published,version,updated_at FROM cms_content WHERE id=1');
   return json({draft:{...defaults,...JSON.parse(rows[0].draft)},published:{...defaults,...JSON.parse(rows[0].published)},version:rows[0].version,updatedAt:rows[0].updated_at});
  }
  if(action==='media') {const [rows]=await db().execute<RowDataPacket[]>('SELECT id,name,created_at FROM cms_media ORDER BY created_at DESC LIMIT 100');return json(rows);}
  if(action==='revisions'){const [rows]=await db().execute<RowDataPacket[]>('SELECT id,created_at FROM cms_revisions ORDER BY id DESC LIMIT 20');return json(rows);}
  return json({error:'غير موجود'},404);
 }catch(error){return failure(error)}
}
export async function POST(request:Request,ctx:Context){
 try {
  sameOrigin(request); await init(); const {action}=await ctx.params;
  if(action==='setup'||action==='login') {
   await limit(action,15); const input=await body(request,8192);
   if(typeof input.email!=='string'||!/^\S+@\S+\.\S+$/.test(input.email)||input.email.length>254||typeof input.password!=='string'||input.password.length>256)throw new Error('INVALID');
   const email=input.email.trim().toLowerCase();
   if(action==='setup'){
    const token=process.env.CMS_SETUP_TOKEN;
    if(!token||token.length<32||typeof input.token!=='string'||!timingSafeEqual(Buffer.from(hash(token)),Buffer.from(hash(input.token))))throw new Error('SETUP_DISABLED');
    if(input.password.length<12) return json({error:'استخدم كلمة مرور من 12 حرفاً على الأقل.'},400);
    const [existing]=await db().execute<RowDataPacket[]>('SELECT id FROM cms_admin WHERE id=1');
    if(existing.length)throw new Error('SETUP_DISABLED');
    try{await db().execute('INSERT INTO cms_admin (id,email,password_hash) VALUES (1,?,?)',[email,await passwordHash(input.password)]);}catch{throw new Error('SETUP_DISABLED')}
   }else{
    const [rows]=await db().execute<RowDataPacket[]>('SELECT email,password_hash FROM cms_admin WHERE id=1');
    const valid=await verify(input.password,rows[0]?.password_hash||'00000000000000000000000000000000:'+ '00'.repeat(64));
    if(!valid||rows[0]?.email!==email)return json({error:'بيانات الدخول غير صحيحة.'},401);
   }
   await loginSession();return json({ok:true});
  }
  if(!await admin())throw new Error('UNAUTHORIZED');
  if(action==='logout'){
   const jar=await cookies(),token=jar.get('machos_session')?.value;
   if(token)await db().execute('DELETE FROM cms_sessions WHERE token_hash=?',[hash(token)]);
   jar.delete('machos_session');return json({ok:true});
  }
  if(action==='upload') {
   if(!['image/jpeg','image/png','image/webp'].includes(request.headers.get('content-type')||''))throw new Error('INVALID');
   await limit('uploads',60);
   const reader=request.body?.getReader();if(!reader)throw new Error('INVALID');let size=0;const parts:Uint8Array[]=[];
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>4*1024*1024){await reader.cancel();throw new Error('TOO_LARGE')}parts.push(value)}
   let data:Buffer;
   try {data=await sharp(Buffer.concat(parts),{limitInputPixels:25000000}).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:90}).toBuffer();}catch{throw new Error('INVALID')}
   if(data.length>4*1024*1024)throw new Error('TOO_LARGE');
   const id=randomUUID(),name=decodeURIComponent(request.headers.get('x-file-name')||'image').slice(0,190);
   await db().execute('INSERT INTO cms_media (id,name,mime,data) VALUES (?,?,?,?)',[id,name,'image/webp',data]);
   return json({url:'/api/media/'+id,id,name});
  }
  const input=await body(request);
  if(action==='password'){
   if(typeof input.current!=='string'||input.current.length>256||typeof input.next!=='string'||input.next.length<12||input.next.length>256)throw new Error('INVALID');
   await limit('password',10);const [rows]=await db().execute<RowDataPacket[]>('SELECT password_hash FROM cms_admin WHERE id=1');
   if(!await verify(input.current,rows[0].password_hash))return json({error:'كلمة المرور الحالية غير صحيحة.'},400);
   await db().execute('UPDATE cms_admin SET password_hash=? WHERE id=1',[await passwordHash(input.next)]);
   await db().execute('DELETE FROM cms_sessions WHERE admin_id=1');await loginSession();return json({ok:true});
  }
  if(!['save','publish','restore'].includes(action))return json({error:'غير موجود'},404);
  if(!Number.isInteger(input.version))throw new Error('INVALID');
  const connection=await db().getConnection();
  try {
   await connection.beginTransaction();
   const [rows]=await connection.execute<RowDataPacket[]>('SELECT draft,published,version FROM cms_content WHERE id=1 FOR UPDATE');
   if(rows[0].version!==input.version)throw new Error('CONFLICT');
   if(action==='restore'){
    if(!Number.isInteger(input.id))throw new Error('INVALID');
    const [revs]=await connection.execute<RowDataPacket[]>('SELECT content FROM cms_revisions WHERE id=?',[input.id]);
    if(!revs.length)throw new Error('INVALID');
    await connection.execute('UPDATE cms_content SET draft=?,version=version+1 WHERE id=1',[revs[0].content]);
   }else{
    let content;try{content=validateContent(input.content)}catch(error){await connection.rollback();return json({error:(error as Error).message},400)}
    const serialized=JSON.stringify(content);
    if(action==='publish'){
     await connection.execute('INSERT INTO cms_revisions (content) VALUES (?)',[rows[0].published]);
     await connection.execute('UPDATE cms_content SET draft=?,published=?,version=version+1 WHERE id=1',[serialized,serialized]);
    }else await connection.execute('UPDATE cms_content SET draft=?,version=version+1 WHERE id=1',[serialized]);
   }
   await connection.commit(); return json({ok:true,version:input.version+1});
  }catch(error){await connection.rollback();throw error}finally{connection.release()}
 }catch(error){return failure(error)}
}
