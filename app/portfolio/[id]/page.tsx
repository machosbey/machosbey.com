import {notFound} from 'next/navigation';
import {publishedContent} from '@/lib/cms/store';
import {readProjects} from '@/lib/cms/projects';
import ProjectDetail from '@/components/sections/ProjectDetail';
export const dynamic='force-dynamic';
async function projectById(id:string){return readProjects(await publishedContent()).find(p=>p.id===id)}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=await projectById(id);return {title:p?.ar.name||'العمل غير موجود',description:p?.ar.summary,alternates:{canonical:'/portfolio/'+id}}}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=await projectById(id);if(!p)notFound();return <ProjectDetail project={p}/>}
