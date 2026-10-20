'use client';
import { useContent } from '@/components/providers/ContentProvider';

import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import PageCTA from '@/components/ui/PageCTA';
import ProjectGallery from './ProjectGallery';
import WorkFeature from '@/components/ui/WorkFeature';
import {PROJECTS_KEY} from '@/lib/cms/projects';
import { useLocale } from '@/components/providers/LocaleProvider';
export default function PortfolioPage({preview=false}:{preview?:boolean}) {
 const { copy, content } = useContent();

 const {t,rtl}=useLocale();
 const fields=rtl?[
 [copy("inline.PortfolioPage.AR.1", "مواقع الأعمال"),copy("inline.PortfolioPage.AR.2", "حضور يعبّر عن نشاطك، ويقود الزائر إلى الخطوة المناسبة."),copy("inline.PortfolioPage.AR.3", "هيكلة المحتوى / تصميم متجاوب / نموذج تواصل")],
 [copy("inline.PortfolioPage.AR.4", "تطبيقات وحلول رقمية"),copy("inline.PortfolioPage.AR.5", "واجهات تساعد المستخدم على إتمام مهمته بوضوح."),copy("inline.PortfolioPage.AR.6", "تجربة المستخدم / واجهات التطبيق / تكامل الخدمات")]
 ]:[[copy("inline.PortfolioPage.EN.7", "Business websites"),copy("inline.PortfolioPage.EN.8", "A presence that reflects your business and guides visitors to the next step."),copy("inline.PortfolioPage.EN.9", "Content structure / Responsive design / Contact flow")],[copy("inline.PortfolioPage.EN.10", "Apps & digital solutions"),copy("inline.PortfolioPage.EN.11", "Interfaces that help people complete their tasks with clarity."),copy("inline.PortfolioPage.EN.12", "User experience / App interfaces / Service integration")]];
 return <PageFrame className="workPage"><PageHero label={t.nav.portfolio} title={rtl?copy("inline.PortfolioPage.AR.13", "وراء كل واجهة،\nفكرة تستحق الوضوح."):copy("inline.PortfolioPage.EN.14", "Behind every interface,\na clear idea.")} description={rtl?copy("inline.PortfolioPage.AR.15", "التصميم يبدأ بما يحتاجه المستخدم. نستعرض هنا تفاصيل الواجهة والقرارات التي تشكّل تجربة استخدامها."):copy("inline.PortfolioPage.EN.16", "Design starts with what people need. Explore the interface details and decisions that shape the experience.")} primary={{label:rtl?copy("inline.PortfolioPage.AR.17", "شاهد التصميم"):copy("inline.PortfolioPage.EN.18", "Explore the design"),href:'#design-study'}} visual="browser"/>
 <section id="design-study" className="workStudySection innerSection"><div className="container">{content[PROJECTS_KEY]===undefined?<WorkFeature detailed/>:<ProjectGallery preview={preview}/>}</div></section>
 <section className="lightSection innerSection"><div className="container capabilityList"><div className="innerHeading"><span className="sectionKicker">{rtl?copy("inline.PortfolioPage.AR.19", "مجالات أخرى"):copy("inline.PortfolioPage.EN.20", "Other capabilities")}</span><h2>{rtl?copy("inline.PortfolioPage.AR.21", "نفس الاهتمام.\nتجارب مختلفة."):copy("inline.PortfolioPage.EN.22", "The same care.\nDifferent experiences.")}</h2></div><div>{fields.map(([title,description,scope],i)=><article className="capabilityRow" key={title}><span className="capabilityRow__number">0{i+2}</span><div><h3>{title}</h3><p>{description}</p><p className="capabilityRow__scope">{scope}</p></div></article>)}</div></div></section>
 <PageCTA title={rtl?copy("inline.PortfolioPage.AR.23", "لنبدأ بفكرة مشروعك."):copy("inline.PortfolioPage.EN.24", "Let’s start with your idea.")} button={t.nav.cta} href="/contact"/></PageFrame>;
}
