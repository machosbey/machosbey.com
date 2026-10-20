import { redirect } from 'next/navigation';
import type { RowDataPacket } from 'mysql2';
import { admin } from '@/lib/cms/auth';
import { db } from '@/lib/cms/db';
import ProjectDetail from '@/components/sections/ProjectDetail';
import {readProjects} from '@/lib/cms/projects';
import { defaults } from '@/lib/cms/model';
import { ContentProvider } from '@/components/providers/ContentProvider';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import Home from '@/components/sections/AurosHomePage';
import About from '@/components/sections/AboutPage';
import Contact from '@/components/sections/ContactPage';
import Portfolio from '@/components/sections/PortfolioPage';
import Services from '@/components/sections/SubscriptionsPage';
export const dynamic='force-dynamic';
export const metadata={title:'معاينة المسودة',robots:{index:false,follow:false}};
export default async function Preview({searchParams}:{searchParams:Promise<{page?:string;id?:string}>}){
 let authenticated=false;try{authenticated=Boolean(await admin())}catch{}
 if(!authenticated)redirect('/admin');
 const [rows]=await db().execute<RowDataPacket[]>('SELECT draft FROM cms_content WHERE id=1');
 const content={...defaults,...JSON.parse(rows[0].draft)};
 const query=await searchParams;const page=query.page||'home';const project=readProjects(content).find(p=>p.id===query.id);
 return <ContentProvider content={content}><LocaleProvider>
 <aside style={{position:'fixed',bottom:12,insetInline:12,zIndex:9999,background:'#fff',color:'#05223c',padding:'12px 18px',borderRadius:12,display:'flex',gap:16,flexWrap:'wrap',boxShadow:'0 4px 24px #0004',fontSize:14}}>
 <strong>معاينة المسودة — غير منشورة</strong>
 {Object.entries({home:'الرئيسية',about:'من نحن',services:'الاشتراكات',portfolio:'الأعمال',contact:'التواصل'}).map(([key,label])=><a key={key} href={'/admin/preview?page='+key} style={{textDecoration:page===key?'underline':'none'}}>{label}</a>)}<a href="/admin">العودة للوحة</a>
 </aside>
 {page==='project'&&project?<ProjectDetail project={project} preview/>:page==='about'?<About/>:page==='services'?<Services/>:page==='portfolio'?<Portfolio preview/>:page==='contact'?<Contact/>:<Home/>}
 </LocaleProvider></ContentProvider>;
}
