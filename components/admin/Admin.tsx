'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { catalog, type Content } from '@/lib/cms/model';
import s from './Admin.module.css';
import AdminIcon from './AdminIcon';
import ProjectsEditor from './ProjectsEditor';
import {fieldLabel} from '@/lib/cms/field-labels';
const labels:Record<string,string>={identity:'هوية الموقع',home:'الرئيسية',about:'من نحن',services:'الاشتراكات',portfolio:'الأعمال',contact:'التواصل',footer:'القوائم والتذييل',legal:'الصفحات القانونية',meta:'محركات البحث',other:'نصوص إضافية'};
function section(f:typeof catalog[number]){
 const g=f.group.toLowerCase();
 if(f.key==='AR.brand'||f.key==='EN.brand'||f.key==='media.logo'||g==='identity')return 'identity';
 if(g.includes('meta'))return 'meta';if(g.includes('legal'))return 'legal';
 if(/contact|form|common/.test(g))return 'contact';if(/about/.test(g))return 'about';
 if(/service|subscription|explore/.test(g))return 'services';if(/portfolio|work/.test(g))return 'portfolio';
 if(/nav|footer/.test(g))return 'footer';if(/home|hero|cta/.test(g))return 'home';return 'other';
}
async function api(action:string,data?:unknown){
 const response=await fetch('/api/admin/'+action,{method:data===undefined?'GET':'POST',cache:'no-store',headers:data===undefined?{}:{'Content-Type':'application/json'},body:data===undefined?undefined:JSON.stringify(data)});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'تعذّر إتمام العملية');return result;
}
export default function Admin(){
 const [state,setState]=useState<{authenticated:boolean;setupRequired:boolean}|null>(null);
 const [content,setContent]=useState<Content>({}),[version,setVersion]=useState(0),[dirty,setDirty]=useState(false),[unpublished,setUnpublished]=useState(false);
 const [tab,setTab]=useState('identity'),[locale,setLocale]=useState('AR'),[search,setSearch]=useState('');
 const [notice,setNotice]=useState(''),[error,setError]=useState(false),[busy,setBusy]=useState(false);
 const [media,setMedia]=useState<{id:string;name:string}[]>([]),[revisions,setRevisions]=useState<{id:number;created_at:string}[]>([]);
 const notify=(text:string,isError=false)=>{setNotice(text);setError(isError)};
 async function load(){const result=await api('content');setContent(result.draft);setVersion(result.version);setDirty(false);setUnpublished(JSON.stringify(result.draft)!==JSON.stringify(result.published));}
 async function boot(){try{const result=await api('state');if(result.authenticated){await load();setMedia(await api('media'))}setState(result)}catch(e){notify((e as Error).message,true)}}
 useEffect(()=>{void boot()},[]);
 useEffect(()=>{const listener=(event:BeforeUnloadEvent)=>{if(dirty){event.preventDefault();event.returnValue=''}};window.addEventListener('beforeunload',listener);return()=>window.removeEventListener('beforeunload',listener)},[dirty]);
 const edit=(key:string,value:string)=>{setContent(old=>({...old,[key]:value}));setDirty(true)};
 async function run(task:()=>Promise<void>){setBusy(true);try{await task()}catch(e){notify((e as Error).message,true)}finally{setBusy(false)}}
 async function authenticate(event:FormEvent<HTMLFormElement>){event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));await run(async()=>{await api(state?.setupRequired?'setup':'login',data);notify('تم تسجيل الدخول.');await boot()})}
 async function save(publish=false){if(publish&&!confirm('نشر هذه التعديلات على الموقع للزوار؟'))return;await run(async()=>{const result=await api(publish?'publish':'save',{content,version});setVersion(result.version);setDirty(false);setUnpublished(!publish);notify(publish?'تم نشر التعديلات. افتح الموقع أو حدّث الصفحة لرؤيتها.':'تم حفظ المسودة. لم تتغير النسخة المنشورة.')})}
 async function upload(file:File,key?:string,done?:(url:string)=>void){await run(async()=>{
  if(file.size>4*1024*1024)throw new Error('اختر صورة أقل من 4 ميغابايت.');
  const response=await fetch('/api/admin/upload',{method:'POST',headers:{'Content-Type':file.type,'X-File-Name':encodeURIComponent(file.name)},body:file});const result=await response.json();if(!response.ok)throw new Error(result.error);
  if(key)edit(key,result.url);done?.(result.url);setMedia(await api('media'));notify('تم رفع الصورة. احفظ وانشر لتظهر في الموقع.');
 })}
 async function selectTab(next:string){setTab(next);setSearch('');if(next==='media')await run(async()=>setMedia(await api('media')));if(next==='history')await run(async()=>setRevisions(await api('revisions')))}
 const fields=catalog.filter(f=>section(f)===tab&&!f.key.includes('WorkFeature')&&f.key!=='media.portfolio'&&(f.locale===locale||f.locale==='shared')&&(!search||(fieldLabel(f)+' '+f.label+' '+content[f.key]).toLowerCase().includes(search.toLowerCase())));
 return <main className={s.shell} dir="rtl">
 <div className={s.masthead}><a className={s.brand} href="/" target="_blank" rel="noreferrer"><img src={content['media.logo']||'/brand/machos-bey-mark.png'} alt=""/><span>{content['AR.brand']||'ماخوس بيه'}<small>إدارة الموقع</small></span></a><span className={s.workspace}>مساحة إدارة المحتوى</span></div>
 {notice&&<div className={`${s.notice} ${error?s.error:''}`} role={error?'alert':'status'}>{notice}<button type="button" aria-label="إغلاق التنبيه" onClick={()=>setNotice('')}>×</button></div>}
 {!state?<div className={s.login}><h1>لوحة إدارة الموقع</h1><p>{error?'الاتصال غير متاح. راجع متغيرات قاعدة البيانات وأعد المحاولة.':'جارٍ الاتصال…'}</p><button onClick={()=>{setError(false);setNotice('');void boot()}}>إعادة المحاولة</button></div>:!state.authenticated?<div className={s.login}>
 <h1>{state.setupRequired?'إنشاء حساب المدير':'تسجيل الدخول'}</h1><p className={s.hint}>{state.setupRequired?'هذه الخطوة متاحة مرة واحدة فقط. أدخل رمز التهيئة الموجود بمتغير CMS_SETUP_TOKEN، واختر بيانات دخول اللوحة.':'إدارة المحتوى والصور والهوية من مكان واحد.'}</p>
 <form onSubmit={authenticate}>
 {state.setupRequired&&<label>رمز التهيئة<input name="token" type="password" required autoComplete="off"/></label>}
 <label>البريد الإلكتروني<input name="email" type="email" required autoComplete="username" dir="ltr"/></label>
 <label>كلمة المرور<input name="password" type="password" required minLength={state.setupRequired?12:1} maxLength={256} autoComplete={state.setupRequired?'new-password':'current-password'}/></label>
 <button disabled={busy}>{busy?'جارٍ المتابعة…':state.setupRequired?'إنشاء المدير':'دخول'}</button></form><a href="/">العودة للموقع</a></div>:<>
 <header className={s.header}><div><span className={s.breadcrumb}>لوحة التحكم / المحتوى</span><h1>{({...labels,media:'مكتبة الصور',history:'سجل النشر',account:'أمان الحساب'} as Record<string,string>)[tab]}</h1><span className={`${s.saved} ${dirty?s.pending:''}`}>{dirty?'تعديلات غير محفوظة':unpublished?'مسودة محفوظة تنتظر النشر':'النسخة محفوظة ومنشورة'}</span></div>
 <div className={s.actions}><a href="/" target="_blank" rel="noreferrer">عرض الموقع</a><a href="/admin/preview" target="_blank" rel="noreferrer" title="احفظ المسودة أولاً">معاينة المسودة المحفوظة</a><button className={s.secondary} disabled={busy} onClick={()=>void save()}>حفظ مسودة</button><button disabled={busy} onClick={()=>void save(true)}>نشر التعديلات</button><button className={s.secondary} disabled={busy} onClick={()=>{if(dirty&&!confirm('توجد تعديلات غير محفوظة. خروج؟'))return;void run(async()=>{await api('logout',{});setState({authenticated:false,setupRequired:false});setContent({});setDirty(false)})}}>خروج</button></div></header>
 <div className={s.grid}><nav className={s.sidebar} aria-label="أقسام لوحة التحكم"><span className={s.navCaption}>محتوى الموقع</span>{Object.entries({...labels,media:'مكتبة الصور',history:'سجل النشر',account:'كلمة المرور'}).map(([key,label])=><button key={key} aria-pressed={tab===key} onClick={()=>void selectTab(key)}><AdminIcon name={key}/><span>{label}</span></button>)}</nav>
 <section className={s.panel}><fieldset disabled={busy} style={{border:0,padding:0,margin:0,minWidth:0}}>
 {tab==='media'?<><h2 className={s.sectionTitle}>مكتبة الصور</h2><p className={s.hint}>PNG وJPEG وWebP حتى 4 ميغابايت. الصور محفوظة بقاعدة البيانات وتبقى بعد إعادة النشر. يمكنك اختيارها من حقل أي صورة.</p><input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{if(e.target.files?.[0])void upload(e.target.files[0]);e.target.value=''}}/><div className={s.mediaGrid}>{media.map(item=><article className={s.mediaItem} key={item.id}><img src={'/api/media/'+item.id} alt={item.name}/><p>{item.name}</p><button onClick={()=>void run(async()=>{await navigator.clipboard.writeText('/api/media/'+item.id);notify('تم نسخ رابط الصورة.')})}>نسخ الرابط</button></article>)}</div></>:
 tab==='history'?<><h2 className={s.sectionTitle}>النسخ السابقة</h2><p className={s.hint}>الاسترجاع يضع النسخة في المسودة للمراجعة. لن تتغير النسخة المنشورة حتى تضغط نشر.</p>{revisions.length===0&&<p>لا توجد نسخ سابقة بعد.</p>}{revisions.map(item=><div className={s.bar} key={item.id}><span>{new Date(item.created_at).toLocaleString('ar')}</span><button disabled={busy} onClick={()=>{if(!confirm('استبدال المسودة الحالية بهذه النسخة؟'))return;void run(async()=>{await api('restore',{id:item.id,version});await load();notify('تم استرجاع المسودة.')})}}>استرجاع للمسودة</button></div>)}</>:
 tab==='account'?<><h2 className={s.sectionTitle}>تغيير كلمة المرور</h2><form onSubmit={event=>{event.preventDefault();const form=event.currentTarget,data=Object.fromEntries(new FormData(form));void run(async()=>{await api('password',data);form.reset();notify('تم تغيير كلمة المرور وإغلاق الجلسات القديمة.')})}}><label className={s.field}>كلمة المرور الحالية<input name="current" type="password" required autoComplete="current-password"/></label><label className={s.field}>كلمة المرور الجديدة<input name="next" type="password" minLength={12} maxLength={256} required autoComplete="new-password"/></label><button disabled={busy}>تغيير كلمة المرور</button></form></>:
 <><div className={s.editorHeading}><div><h2 className={s.sectionTitle}>تحرير {labels[tab]}</h2><p>عدّل المحتوى، راجع المسودة، ثم انشر عندما تكون جاهزاً.</p></div><span className={s.languageBadge}>{locale==='AR'?'المحتوى العربي':'English content'}</span></div><div className={s.toolbar}><input aria-label="البحث في الحقول" placeholder="ابحث عن النص الذي تريد تغييره…" value={search} onChange={e=>setSearch(e.target.value)}/><select aria-label="لغة المحتوى" value={locale} onChange={e=>setLocale(e.target.value)}><option value="AR">العربية</option><option value="EN">English</option></select></div><p className={s.hint}>تعديلاتك تبقى في المسودة حتى النشر. <button className={s.secondary} disabled={busy} onClick={()=>{if(confirm('إلغاء التعديلات غير المحفوظة؟'))void run(load)}}>تراجع عن التعديلات</button></p>
 {tab==='portfolio'&&<ProjectsEditor content={content} edit={edit} media={media} upload={(file,done)=>upload(file,undefined,done)}/>}
 <div className={s.fields}>{fields.map(field=><label className={s.field} key={field.key}><span>{field.kind==='image'?(field.key==='media.logo'?'إشارة اللوغو الأصلية':field.key.startsWith('media.service.')?'صورة الخدمة '+(Number(field.key.split('.').pop())+1):field.key==='media.orb'?'صورة الكرة المتحركة (اختياري)':field.key==='media.portfolio'?'صورة معرض الأعمال':'صورة الانتشار العالمي'):fieldLabel(field)}</span>
 {field.kind==='image'?<><input value={content[field.key]??''} placeholder="رابط الصورة، أو ارفع صورة جديدة" dir="ltr" onChange={e=>edit(field.key,e.target.value)}/>{content[field.key]&&<img src={content[field.key]} alt="معاينة الصورة"/>}<input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{if(e.target.files?.[0])void upload(e.target.files[0],field.key);e.target.value=''}}/><select aria-label="اختيار صورة من المكتبة" value="" onChange={e=>{if(e.target.value)edit(field.key,e.target.value)}}><option value="">اختيار من مكتبة الصور…</option>{media.map(item=><option key={item.id} value={"/api/media/"+item.id}>{item.name}</option>)}</select><small>اتركه فارغاً لاستخدام الرسم الافتراضي، حيث يتوفر.</small></>:<textarea dir={field.locale==='EN'?'ltr':'rtl'} rows={(content[field.key]?.length||0)>130?4:2} value={content[field.key]??''} maxLength={20000} onChange={e=>edit(field.key,e.target.value)}/>}</label>)}</div>
 {fields.length===0&&<p className={s.empty}>لا توجد حقول مطابقة.</p>}</>}
 </fieldset></section></div></>}
 </main>;
}
