'use client';
import CardSculpture from '@/components/three/CardSculpture';


import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import ServiceStory from '@/components/ui/ServiceStory';
import PageCTA from '@/components/ui/PageCTA';
import { useLocale } from '@/components/providers/LocaleProvider';

const shapes = ['browser', 'phone', 'network'] as const;

export default function DigitalServicesPage() {
  const { t } = useLocale();
  const p = t.digitalPage;
  const serviceItems = p.servicesItems.map((item, index) => ({ ...item, shape: shapes[index] }));

  return (
    <PageFrame className="digitalPage">
      <PageHero
        label={p.label}
        title={p.heroTitle}
        description={p.heroText}
        primary={{ label: p.heroButton, href: '#digital-services' }}
        secondary={{ label: t.nav.contact, href: '/contact' }}
        visual="browser"
      />

      <ServiceStory id="digital-services" title={p.servicesTitle} intro={p.servicesIntro} items={serviceItems} />

      <section className="lightSection innerSection advantagesSection expressiveSection">
        <div className="container innerHeading" data-reveal>
          <span className="sectionKicker">MACHOS BEY / 02</span>
          <h2>{p.advantagesTitle}</h2>
        </div>
        <div className="container advantageGrid">
          {p.advantages.map((item, index) => (
            <article className="advantageCard" data-reveal key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <CardSculpture kind={(['layers', 'workflow', 'links'] as const)[index]} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <PageCTA title={p.ctaTitle} button={p.ctaButton} href="/contact" />
    </PageFrame>
  );
}
