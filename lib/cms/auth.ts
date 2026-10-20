import 'server-only';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual, createHash } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import type { RowDataPacket } from 'mysql2';
import { db, init } from './db';
const scrypt = promisify(scryptCallback);
export const hash = (text: string) => createHash('sha256').update(text).digest('hex');
export async function passwordHash(password: string) {
  const salt=randomBytes(16).toString('hex');
  return salt+':'+(await scrypt(password,salt,64) as Buffer).toString('hex');
}
export async function verify(password: string, encoded: string) {
  const [salt,key]=encoded.split(':');
  if (!salt||!key) return false;
  const expected=Buffer.from(key,'hex'),actual=await scrypt(password,salt,64) as Buffer;
  return expected.length===actual.length&&timingSafeEqual(expected,actual);
}
export async function admin() {
  await init(); const token=(await cookies()).get('machos_session')?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const [rows]=await db().execute<RowDataPacket[]>('SELECT admin_id FROM cms_sessions WHERE token_hash=? AND expires_at>?',[hash(token),Date.now()]);
  return rows[0]?.admin_id??null;
}
export async function loginSession() {
  const token=randomBytes(32).toString('hex');
  await db().execute('DELETE FROM cms_sessions WHERE expires_at<?',[Date.now()]);
  await db().execute('INSERT INTO cms_sessions (token_hash,admin_id,expires_at) VALUES (?,1,?)',[hash(token),Date.now()+8*60*60*1000]);
  (await cookies()).set('machos_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:8*60*60});
}
export async function limit(name: string, maximum=12) {
  const key=hash(name),now=Date.now();
  await db().execute(`INSERT INTO cms_limits (bucket,attempts,reset_at) VALUES (?,1,?) ON DUPLICATE KEY UPDATE attempts=IF(reset_at<?,1,attempts+1),reset_at=IF(reset_at<?,VALUES(reset_at),reset_at)`,[key,now+15*60*1000,now,now]);
  const [rows]=await db().execute<RowDataPacket[]>('SELECT attempts FROM cms_limits WHERE bucket=?',[key]);
  if(rows[0].attempts>maximum)throw new Error('RATE_LIMIT');
}
export function sameOrigin(request: Request) {
  const expected=new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url).origin;
  if(request.headers.get('origin')!==expected)throw new Error('FORBIDDEN');
}
export async function body(request: Request,max=1600000) {
  if(!request.headers.get('content-type')?.includes('application/json'))throw new Error('INVALID');
  const reader=request.body?.getReader(); if(!reader)throw new Error('INVALID');
  let size=0;const chunks:Uint8Array[]=[];
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new Error('TOO_LARGE')}chunks.push(value)}
  try {
    const parsed=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error('INVALID');
    return parsed;
  } catch { throw new Error('INVALID'); }
}
