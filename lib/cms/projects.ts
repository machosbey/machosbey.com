export const PROJECTS_KEY='collection.projects';
export type ProjectText={name:string;summary:string;details:string};
export type Project={id:string;image:string;url:string;ar:ProjectText;en:ProjectText};
export function readProjects(content:Record<string,string>):Project[]{
 if(content[PROJECTS_KEY]!==undefined){try{return JSON.parse(content[PROJECTS_KEY])}catch{return []}}
 const text=(key:string,fallback:string)=>content[key]??fallback;
 return [{id:'form-01',image:content['media.portfolio']||'',url:'',
 ar:{name:text('inline.WorkFeature.AR.2','تصميم متجر إلكتروني'),summary:text('inline.WorkFeature.AR.27',''),details:[31,35,39].map(n=>text('inline.WorkFeature.AR.'+n,'')).filter(Boolean).join('\n\n')},
 en:{name:text('inline.WorkFeature.EN.3','E-commerce design'),summary:text('inline.WorkFeature.EN.28',''),details:[32,36,40].map(n=>text('inline.WorkFeature.EN.'+n,'')).filter(Boolean).join('\n\n')}}];
}
export function validateProjects(raw:string,validImage:(url:string)=>boolean):string {
 let list:unknown;try{list=JSON.parse(raw)}catch{throw new Error('قائمة الأعمال غير صالحة')}
 if(!Array.isArray(list)||list.length>100)throw new Error('الحد الأقصى 100 عمل');
 const ids=new Set<string>();
 const cleaned=list.map(p=>{
  if(!p||typeof p.id!=='string'||! /^[a-z0-9-]{1,80}$/.test(p.id)||ids.has(p.id))throw new Error('معرّف عمل غير صالح أو مكرر');
  ids.add(p.id);
  if(typeof p.image!=='string'||p.image.length>2048||!validImage(p.image))throw new Error('رابط صورة العمل غير صالح');
  if(typeof p.url!=='string'||p.url.length>2048||(p.url&&(!p.url.startsWith('https://')||!validImage(p.url))))throw new Error('رابط المشروع يجب أن يبدأ بـ https://');
  const localized=(lang:'ar'|'en'):ProjectText=>{
   const t=p[lang];if(!t||typeof t.name!=='string'||!t.name.trim()||t.name.length>200||typeof t.summary!=='string'||t.summary.length>2000||typeof t.details!=='string'||t.details.length>20000)throw new Error('أدخل اسم العمل باللغتين وتأكد من طول الوصف والتفاصيل');
   return {name:t.name.trim(),summary:t.summary,details:t.details};
  };
  return {id:p.id,image:p.image,url:p.url,ar:localized('ar'),en:localized('en')};
 });
 return JSON.stringify(cleaned);
}
