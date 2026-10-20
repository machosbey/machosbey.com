import { db, init } from '@/lib/cms/db';
import type { RowDataPacket } from 'mysql2';
export const runtime='nodejs';
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}) {
 const {id}=await params;
 if(!/^[a-f0-9-]{36}$/.test(id))return new Response(null,{status:404});
 try {await init();const [rows]=await db().execute<RowDataPacket[]>('SELECT mime,data FROM cms_media WHERE id=?',[id]);
 if(!rows.length)return new Response(null,{status:404});
 return new Response(new Uint8Array(rows[0].data),{headers:{'Content-Type':rows[0].mime,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=31536000, immutable'}});
 }catch{return new Response(null,{status:503})}
}
