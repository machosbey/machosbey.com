'use client';
import {useContent} from '@/components/providers/ContentProvider';
import {useLocale} from '@/components/providers/LocaleProvider';
import {readProjects} from '@/lib/cms/projects';
import s from './ProjectGallery.module.css';
export default function ProjectGallery({preview=false}:{preview?:boolean}){
 const {content}=useContent();const {rtl}=useLocale();const projects=readProjects(content);
 return <div className={s.list}>{projects.map((project,index)=>{const text=rtl?project.ar:project.en;const href=preview?'/admin/preview?page=project&id='+project.id:'/portfolio/'+project.id;return <article className={s.row} key={project.id}>
 <a href={href} className={s.visual} aria-label={text.name}>{project.image?<img src={project.image} alt={text.name} loading="lazy" width={800} height={600}/>:<div className={s.placeholder}><span>MACHOS BEY / {String(index+1).padStart(2,'0')}</span>{text.name}</div>}</a>
 <div className={s.copy} dir={rtl?'rtl':'ltr'}><span className={s.number}>{String(index+1).padStart(2,'0')}</span><h2>{text.name}</h2><p>{text.summary}</p><a className={s.link} href={href}>{rtl?'تفاصيل العمل':'Project details'} <span aria-hidden="true">{rtl?'↖':'↗'}</span></a></div>
 </article>})}{!projects.length&&<p>{rtl?'سنشارك أعمالنا هنا قريباً.':'Our work will appear here soon.'}</p>}</div>
}
