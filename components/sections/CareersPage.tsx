'use client';
import CardSculpture from '@/components/three/CardSculpture';


import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import CareersForm from '@/components/forms/CareersForm';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function CareersPage() {
  const { t } = useLocale();
  const p = t.careersPage;

  return (
    <PageFrame className="careersPage">
      <PageHero label={p.label} title={p.heroTitle} description={p.heroText} primary={{ label: p.applyTitle, href: '#apply' }} visual="connected" />

      <section className="lightSection innerSection benefitsSection expressiveSection">
        <div className="container innerHeading" data-reveal>
          <span className="sectionKicker">MACHOS BEY / CAREERS</span>
          <h2>{p.whyTitle}</h2>
        </div>
        <div className="container benefitGrid">
          {p.benefits.map((benefit, index) => (
            <article className="benefitCard" key={benefit.title} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <CardSculpture kind={(['growth', 'team', 'layers'] as const)[index]} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
              
            </article>
          ))}
        </div>
      </section>

      <section id="apply" className="darkSection innerSection formSection">
        <div className="container formSection__grid">
          <div className="formSection__intro" data-reveal>
            <span className="sectionKicker">MACHOS BEY / APPLY</span>
            <h2>{p.applyTitle}</h2>
            <p>{p.applyText}</p>
          </div>
          <div className="formPanel" data-reveal><CareersForm /></div>
        </div>
      </section>
    </PageFrame>
  );
}
