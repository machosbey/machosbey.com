'use client';
import { useContent } from '@/components/providers/ContentProvider';


import PageFrame from '@/components/ui/PageFrame';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
 const { copy } = useContent();

  const { t } = useLocale();
  const title = type === 'privacy' ? t.legalPage.privacyTitle : t.legalPage.termsTitle;
  return (
    <PageFrame className="legalSite">
      <section className="legalHero lightSection">
        <div className="container legalHero__inner">
          <span className="sectionKicker">{copy("inline.LegalPage.EN.1", "MACHOS BEY / LEGAL")}</span>
          <h1>{title}</h1>
          <p>{t.legalPage.notice}</p>
        </div>
      </section>
    </PageFrame>
  );
}
