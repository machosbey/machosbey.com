'use client';
import {useLocale} from '@/components/providers/LocaleProvider';
import type {Project} from '@/lib/cms/projects';
import PageFrame from '@/components/ui/PageFrame';
import s from './ProjectGallery.module.css';
export default function ProjectDetail({project,preview=false}:{project:Project;preview?:boolean}){
 const {rtl}=useLocale();const text=rtl?project.ar:project.en;
 return <PageFrame><article className={s.detail}><a className={s.back} href={preview?'/admin/preview?page=portfolio':'/portfolio'}>{rtl?'العودة إلى الأعمال':'Back to projects'}</a><h1>{text.name}</h1><p>{text.summary}</p>{project.image&&<img className={s.cover} src={project.image} alt={text.name}/>}<div className={s.details}><p>{text.details}</p></div>{project.url&&<a className={s.link} href={project.url} target="_blank" rel="noopener noreferrer">{rtl?'زيارة موقع المشروع':'Visit project website'} ↗</a>}</article></PageFrame>
}
