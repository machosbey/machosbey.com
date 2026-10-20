'use client';
import { useContent } from '@/components/providers/ContentProvider';

import { useLocale } from '@/components/providers/LocaleProvider';
import ArrowIcon from '@/components/ui/ArrowIcon';

export default function WorkFeature({ detailed = false }: { detailed?: boolean }) {
 const { copy } = useContent();

  const { rtl } = useLocale();
  return <article className="workFeature">
    <div className="workFeature__visual">
      <span className="workFeature__caption">{copy("inline.WorkFeature.EN.1", "FORM / 01 —")}{' '}{rtl ? copy("inline.WorkFeature.AR.2", "تصميم متجر إلكتروني") : copy("inline.WorkFeature.EN.3", "E-commerce design")}</span>
      {copy('media.portfolio') ? <img src={copy('media.portfolio')} alt="" style={{width:'100%',height:'auto',borderRadius:16}}/> : <div className="storeStudy" aria-hidden="true">
        <div className="storeStudy__nav"><span>{copy("inline.WorkFeature.EN.4", "FORM / 01")}</span><span>{rtl ? copy("inline.WorkFeature.AR.5", "أشياء بسيطة. تفاصيل مختلفة.") : copy("inline.WorkFeature.EN.6", "Simple objects. Considered details.")}</span></div>
        <div className="storeStudy__main">
          <div className="storeStudy__copy"><span>{rtl ? copy("inline.WorkFeature.AR.7", "مجموعة الإضاءة") : copy("inline.WorkFeature.EN.8", "THE LIGHT COLLECTION")}</span><strong>{rtl ? <>{copy("inline.WorkFeature.AR.9", "مساحة أهدأ.")}<br />{copy("inline.WorkFeature.AR.10", "ضوء أجمل.")}</> : <>{copy("inline.WorkFeature.EN.11", "Less noise.")}<br />{copy("inline.WorkFeature.EN.12", "More light.")}</>}</strong><span className="storeStudy__link">{rtl ? copy("inline.WorkFeature.AR.13", "استكشف المجموعة") : copy("inline.WorkFeature.EN.14", "Explore the collection")} <ArrowIcon /></span></div>
          <div className="studyLamp"><i /><b /><span /></div>
        </div>
        <div className="storeStudy__bottom"><span>{rtl ? copy("inline.WorkFeature.AR.15", "تصميم مدروس") : copy("inline.WorkFeature.EN.16", "Considered design")}</span><span>{rtl ? copy("inline.WorkFeature.AR.17", "تفاصيل تصنع الفرق") : copy("inline.WorkFeature.EN.18", "Details make the difference")}</span><span>01 — 03</span></div>
      </div>
      }<div className="workFeature__tags"><span>{rtl ? copy("inline.WorkFeature.AR.19", "تصميم الواجهات") : copy("inline.WorkFeature.EN.20", "Interface design")}</span><span>{rtl ? copy("inline.WorkFeature.AR.21", "تجربة المتجر") : copy("inline.WorkFeature.EN.22", "Store experience")}</span></div>
    </div>
    <div className="workFeature__copy">
      <span className="sectionKicker">{rtl ? copy("inline.WorkFeature.AR.23", "الفكرة وراء الواجهة") : copy("inline.WorkFeature.EN.24", "Behind the interface")}</span>
      <h3>{rtl ? copy("inline.WorkFeature.AR.25", "المنتج أولاً.\nوالتفاصيل في مكانها.") : copy("inline.WorkFeature.EN.26", "Product first.\nEvery detail in place.")}</h3>
      <p>{rtl ? copy("inline.WorkFeature.AR.27", "هوية هادئة لمتجر إضاءة، تترك مساحة للمنتج وتجعل طريق استكشافه واضحاً. ألوان محدودة، وتفاصيل محسوبة، ومحتوى يركّز على الاختيار.") : copy("inline.WorkFeature.EN.28", "A quiet visual identity for a lighting store, giving products room to stand out. A restrained palette, considered details, and content focused on choice.")}</p>
      <dl className="workFeature__notes">
        <div><dt>{rtl ? copy("inline.WorkFeature.AR.29", "الفكرة") : copy("inline.WorkFeature.EN.30", "The idea")}</dt><dd>{rtl ? copy("inline.WorkFeature.AR.31", "عرض المنتج دون ازدحام الخيارات أو تشتيت الانتباه.") : copy("inline.WorkFeature.EN.32", "Present the product without competing choices or distractions.")}</dd></div>
        <div><dt>{rtl ? copy("inline.WorkFeature.AR.33", "التصميم") : copy("inline.WorkFeature.EN.34", "The design")}</dt><dd>{rtl ? copy("inline.WorkFeature.AR.35", "عنوان مختصر، منتج بارز، وتسلسل بصري يقود إلى المجموعة.") : copy("inline.WorkFeature.EN.36", "A concise headline, a prominent product, and a visual hierarchy leading to the collection.")}</dd></div>
        {detailed && <div><dt>{rtl ? copy("inline.WorkFeature.AR.37", "تفاصيل الواجهة") : copy("inline.WorkFeature.EN.38", "Interface details")}</dt><dd>{rtl ? copy("inline.WorkFeature.AR.39", "إضاءة بلون سماوي، خلفية فاتحة، ومساحات تتكيّف مع حجم الشاشة مع الحفاظ على أولوية المنتج.") : copy("inline.WorkFeature.EN.40", "Sky-blue lighting, a pale backdrop, and spacing that adapts to the screen while keeping the product in focus.")}</dd></div>}
      </dl>
      <a className="textLink" href={detailed ? '/contact?service=0' : '/portfolio#design-study'}>{rtl ? (detailed ? copy("inline.WorkFeature.AR.41", "ناقش مشروعاً مشابهاً") : copy("inline.WorkFeature.AR.42", "شاهد تفاصيل التصميم")) : (detailed ? copy("inline.WorkFeature.EN.43", "Discuss a similar project") : copy("inline.WorkFeature.EN.44", "Explore the design"))}<ArrowIcon /></a>
    </div>
  </article>;
}
