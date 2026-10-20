'use client';

import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import EditorialRows from '@/components/ui/EditorialRows';
import ServiceStory from '@/components/ui/ServiceStory';
import PageCTA from '@/components/ui/PageCTA';
import { useLocale } from '@/components/providers/LocaleProvider';

const shapes = ['graph', 'connected', 'blocks', 'network', 'browser', 'connected'] as const;

export default function BusinessPage() {
  const { t } = useLocale();
  const p = t.businessPage;

  const storyItems = p.methodItems.map((item, index) => ({ ...item, shape: shapes[index] }));

  return (
    <PageFrame className="businessPage">
      <PageHero
        label={p.label}
        title={p.heroTitle}
        description={p.heroText}
        primary={{ label: p.heroButton, href: '#business-method' }}
        secondary={{ label: t.nav.contact, href: '/contact' }}
        visual="graph"
      />

      <section className="lightSection innerSection innerSection--intro">
        <div className="container innerHeading" data-reveal>
          <span className="sectionKicker">MACHOS BEY / 01</span>
          <h2>{p.helpTitle}</h2>
          <p>{p.helpIntro}</p>
        </div>
        <div className="container"><EditorialRows rows={p.helpItems} theme="light" /></div>
      </section>

      <ServiceStory id="business-method" title={p.methodTitle} intro={p.methodIntro} items={storyItems} />

      <PageCTA title={p.ctaTitle} button={p.ctaButton} href="/contact" light />
    </PageFrame>
  );
}
