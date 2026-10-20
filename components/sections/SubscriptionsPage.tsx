'use client';
import { useContent } from '@/components/providers/ContentProvider';

import ArrowIcon from '@/components/ui/ArrowIcon';

import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import PageCTA from '@/components/ui/PageCTA';
import SubscriptionIcon from '@/components/ui/SubscriptionIcon';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function SubscriptionsPage() {
 const { copy } = useContent();

  const {t,rtl}=useLocale();
  const details=rtl ? [
    [copy("inline.SubscriptionsPage.AR.1", "موقع تعريفي أو متجر إلكتروني"),copy("inline.SubscriptionsPage.AR.2", "تصميم متجاوب للموبايل والحاسوب"),copy("inline.SubscriptionsPage.AR.3", "تكاملات الدفع بحسب نطاق المشروع")],
    [copy("inline.SubscriptionsPage.AR.4", "تجربة استخدام مصمّمة لخدماتك"),copy("inline.SubscriptionsPage.AR.5", "ربط التطبيق بأنظمتك"),copy("inline.SubscriptionsPage.AR.6", "اختبار وتجهيز للإطلاق")],
    [copy("inline.SubscriptionsPage.AR.7", "أنظمة مخصصة لاحتياجات العمل"),copy("inline.SubscriptionsPage.AR.8", "ربط الأدوات والخدمات"),copy("inline.SubscriptionsPage.AR.9", "أتمتة العمليات المتكررة")],
    [copy("inline.SubscriptionsPage.AR.10", "دراسة الاستخدام المناسب لمشروعك"),copy("inline.SubscriptionsPage.AR.11", "مساعدات ذكية وأتمتة"),copy("inline.SubscriptionsPage.AR.12", "دمج الحل مع أدوات العمل")],
    [copy("inline.SubscriptionsPage.AR.13", "اختيار وتسجيل اسم الدومين"),copy("inline.SubscriptionsPage.AR.14", "ربط الدومين بالموقع"),copy("inline.SubscriptionsPage.AR.15", "إدارة إعدادات النطاق")]
  ] : [
    [copy("inline.SubscriptionsPage.EN.16", "Business websites and online stores"),copy("inline.SubscriptionsPage.EN.17", "Responsive mobile and desktop design"),copy("inline.SubscriptionsPage.EN.18", "Payment integrations within the agreed scope")],
    [copy("inline.SubscriptionsPage.EN.19", "An experience designed around your services"),copy("inline.SubscriptionsPage.EN.20", "Connections to your existing systems"),copy("inline.SubscriptionsPage.EN.21", "Testing and launch preparation")],
    [copy("inline.SubscriptionsPage.EN.22", "Systems tailored to your business"),copy("inline.SubscriptionsPage.EN.23", "Tools and service integrations"),copy("inline.SubscriptionsPage.EN.24", "Automation of repetitive processes")],
    [copy("inline.SubscriptionsPage.EN.25", "Defining the right use case for your project"),copy("inline.SubscriptionsPage.EN.26", "Intelligent assistants and automation"),copy("inline.SubscriptionsPage.EN.27", "Integration with your business tools")],
    [copy("inline.SubscriptionsPage.EN.28", "Domain selection and registration"),copy("inline.SubscriptionsPage.EN.29", "Connecting your domain to your website"),copy("inline.SubscriptionsPage.EN.30", "Domain configuration and management")]
  ];
  return <PageFrame className="servicesPage">
    <PageHero label={t.nav.subscriptions} title={rtl?copy("inline.SubscriptionsPage.AR.31", "أطلق مشروعك\nبالحل المناسب."):copy("inline.SubscriptionsPage.EN.32", "The right solution.\nA new beginning.")} description={rtl?copy("inline.SubscriptionsPage.AR.33", "نحدّد معك احتياجات المشروع، ونحوّلها إلى حل رقمي واضح. من الفكرة الأولى إلى الإطلاق."):copy("inline.SubscriptionsPage.EN.34", "Together, we define what your project needs and turn it into a clear digital solution. From the first idea to launch.")} primary={{label:rtl?copy("inline.SubscriptionsPage.AR.35", "استكشف الاشتراكات"):copy("inline.SubscriptionsPage.EN.36", "Explore subscriptions"),href:'#plans'}} visual="connected" />
    <section id="plans" className="innerSection"><div className="container serviceDetails">
      {t.services.items.map((service,i)=><article id={`service-${i}`} className="serviceDetail" key={service.title} data-reveal>
        <div className="serviceDetail__copy"><span className="eyebrow">0{i+1} / {rtl?copy("inline.SubscriptionsPage.AR.37", "اشتراكات"):t.nav.subscriptions.toUpperCase()}</span><h2>{service.title}</h2><p>{service.description}</p><ul>{details[i].map(item=><li key={item}>{item}</li>)}</ul><a className="pill" href={`/contact?service=${i}`}>{rtl?copy("inline.SubscriptionsPage.AR.38", "اطلب عرضاً مخصّصاً"):copy("inline.SubscriptionsPage.EN.39", "Request a proposal")}<span aria-hidden="true"><ArrowIcon /></span></a></div>
        <div className="serviceDetail__art" aria-hidden="true"><SubscriptionIcon index={i} /></div>
      </article>)}
      <p className="offerNote">{rtl?copy("inline.SubscriptionsPage.AR.40", "تُحدَّد التكلفة والمدة ومراحل الدفع بحسب نطاق المشروع المتفق عليه."):copy("inline.SubscriptionsPage.EN.41", "Cost, timeline and payment milestones are defined by the agreed project scope.")}</p>
    </div></section><PageCTA title={t.cta.title} button={t.nav.cta} href="/contact" />
  </PageFrame>;
}

