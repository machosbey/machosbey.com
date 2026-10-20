const names:Record<string,string>={brand:'اسم الموقع',label:'اسم القسم',heroTitle:'العنوان الرئيسي للصفحة',heroText:'وصف افتتاحية الصفحة',description:'الوصف',title:'العنوان',text:'النص التفصيلي',secondary:'نص زر التواصل',visionMissionTitle:'عنوان الرؤية والرسالة',consultingLabel:'اسم قسم الاستشارة',quote:'عنوان قسم الاستشارة',consultingText:'وصف الاستشارة',principlesTitle:'عنوان قسم المبادئ',ctaTitle:'عنوان الدعوة للتواصل',ctaButton:'نص زر الدعوة للتواصل',email:'البريد الإلكتروني',phone:'رقم الهاتف',facebook:'رابط فيسبوك',instagram:'رابط إنستغرام',portfolio:'اسم رابط الأعمال',about:'اسم رابط من نحن',home:'اسم رابط الرئيسية',subscriptions:'اسم رابط الاشتراكات',contact:'اسم رابط التواصل',cta:'نص زر بدء المشروع'};
const inline:Record<string,string>={
 'AboutPage.AR.1':'نص زر الرؤية والرسالة','AboutPage.EN.2':'نص زر الرؤية والرسالة','AboutPage.AR.3':'العنوان الصغير للرؤية','AboutPage.EN.4':'العنوان الصغير للرؤية','AboutPage.EN.5':'الحروف داخل الرسم','AboutPage.AR.6':'عنوان خطوات التعاون لقارئ الشاشة','AboutPage.EN.7':'عنوان خطوات التعاون لقارئ الشاشة','AboutPage.AR.8':'خطوة التعاون الأولى','AboutPage.AR.9':'خطوة التعاون الثانية','AboutPage.AR.10':'خطوة التعاون الثالثة','AboutPage.EN.11':'خطوة التعاون الأولى','AboutPage.EN.12':'خطوة التعاون الثانية','AboutPage.EN.13':'خطوة التعاون الثالثة','AboutPage.AR.14':'العنوان الصغير للمبادئ','AboutPage.EN.15':'العنوان الصغير للمبادئ',
 'PortfolioPage.AR.13':'العنوان الرئيسي لصفحة الأعمال','PortfolioPage.EN.14':'العنوان الرئيسي لصفحة الأعمال','PortfolioPage.AR.15':'وصف افتتاحية الأعمال','PortfolioPage.EN.16':'وصف افتتاحية الأعمال','PortfolioPage.AR.17':'نص زر استعراض الأعمال','PortfolioPage.EN.18':'نص زر استعراض الأعمال','PortfolioPage.AR.19':'اسم قسم المجالات الأخرى','PortfolioPage.EN.20':'اسم قسم المجالات الأخرى','PortfolioPage.AR.21':'عنوان المجالات الأخرى','PortfolioPage.EN.22':'عنوان المجالات الأخرى','PortfolioPage.AR.23':'عنوان الدعوة للتواصل','PortfolioPage.EN.24':'عنوان الدعوة للتواصل'};
export function fieldLabel(field:{key:string;value:string;kind:string}){
 const key=field.key.replace(/^inline\./,'');if(inline[key])return inline[key];
 const parts=key.split('.'),last=parts.at(-1)||'';
 const card=key.match(/(?:cards|items)\.(\d+)\.(\w+)$/);
 if(card)return `البطاقة ${Number(card[1])+1} — ${names[card[2]]||'النص'}`;
 const principle=key.match(/principles\.(\d+)$/);if(principle)return 'المبدأ '+(Number(principle[1])+1);
 if(names[last])return names[last];
 if(field.kind==='url')return 'رابط الموقع';
 if(field.kind==='email')return 'البريد الإلكتروني';
 return (field.value.length>100?'وصف القسم':field.value.includes('\n')?'عنوان القسم':'نص الواجهة')+(/\d+/.test(last)?' · '+last:'');
}
