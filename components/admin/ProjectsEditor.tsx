'use client';
import { PROJECTS_KEY,readProjects,type Project } from '@/lib/cms/projects';
import s from './Admin.module.css';
export default function ProjectsEditor({content,edit,media,upload}:{content:Record<string,string>;edit:(key:string,value:string)=>void;media:{id:string;name:string}[];upload:(file:File,done:(url:string)=>void)=>Promise<void>}){
 const projects=readProjects(content);
 const commit=(list:Project[])=>edit(PROJECTS_KEY,JSON.stringify(list));
 const update=(id:string,patch:Partial<Project>)=>commit(projects.map(p=>p.id===id?{...p,...patch}:p));
 function move(index:number,delta:number){const next=[...projects];[next[index],next[index+delta]]=[next[index+delta],next[index]];commit(next)}
 return <div><h3>إدارة الأعمال ({projects.length})</h3><p className={s.hint}>أضف أعمالك ورتّبها. كل عمل له صفحة تفاصيل مستقلة. احفظ المسودة ثم انشر لتظهر التغييرات.</p>
 <button type="button" disabled={projects.length>=100} onClick={()=>commit([...projects,{id:crypto.randomUUID(),image:'',url:'',ar:{name:'عمل جديد',summary:'',details:''},en:{name:'New project',summary:'',details:''}}])}>＋ إضافة عمل</button>
 {projects.map((project,index)=><details key={project.id} className={s.projectEditor} open><summary>{index+1}. {project.ar.name||project.en.name||'عمل جديد'}</summary>
 <div className={s.actions}><button type="button" disabled={index===0} onClick={()=>move(index,-1)}>نقل للأعلى</button><button type="button" disabled={index===projects.length-1} onClick={()=>move(index,1)}>نقل للأسفل</button><button type="button" onClick={()=>{if(confirm('حذف هذا العمل؟ يُطبق على الموقع بعد النشر.'))commit(projects.filter(p=>p.id!==project.id))}}>حذف العمل</button></div>
 <div className={s.projectLanguages}>{(['ar','en'] as const).map(lang=><div key={lang} dir={lang==='ar'?'rtl':'ltr'}><h4>{lang==='ar'?'العربية':'English'}</h4>{([['name','اسم العمل / Project name',200],['summary','الوصف المختصر / Summary',2000],['details','التفاصيل الكاملة / Full details',20000]] as const).map(([key,label,max])=><label className={s.field} key={key}><span>{label}</span><textarea rows={key==='details'?6:2} maxLength={max} value={project[lang][key]} onChange={e=>update(project.id,{[lang]:{...project[lang],[key]:e.target.value}})}/></label>)}</div>)}</div>
 <label className={s.field}><span>صورة العمل</span><input dir="ltr" value={project.image} placeholder="https://… أو اختر صورة" onChange={e=>update(project.id,{image:e.target.value})}/>{project.image&&<img src={project.image} alt="معاينة صورة العمل"/>}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>{const file=e.target.files?.[0];if(file)void upload(file,url=>update(project.id,{image:url}));e.target.value=''}}/><select value="" onChange={e=>{if(e.target.value)update(project.id,{image:e.target.value})}}><option value="">اختيار من مكتبة الصور…</option>{media.map(item=><option key={item.id} value={'/api/media/'+item.id}>{item.name}</option>)}</select></label>
 <label className={s.field}><span>رابط موقع المشروع (اختياري)</span><input dir="ltr" type="url" placeholder="https://…" value={project.url} onChange={e=>update(project.id,{url:e.target.value})}/></label>
 <p className={s.hint}>رابط التفاصيل: <span dir="ltr">/portfolio/{project.id}</span></p>
 </details>)}{projects.length===0&&<p>لا توجد أعمال. اضغط «إضافة عمل» للبدء.</p>}</div>
}
