'use client';
import { useContent } from '@/components/providers/ContentProvider';


import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/forms/ContactForm';
import { useLocale } from '@/components/providers/LocaleProvider';


export default function ContactPage({ deliveryEnabled = false }: { deliveryEnabled?: boolean }) {
 const { copy, site: siteConfig } = useContent();

  const { t } = useLocale();
  const p = t.contactPage;

  return (
    <PageFrame className="contactPage">
      <PageHero label={p.label} title={p.heroTitle} description={p.heroText} visual="sphere" />

      <section className="lightSection innerSection contactSection">
        <div className="container contactGrid">
          <aside className="contactDetails" data-reveal>
            <span className="sectionKicker">{copy("inline.ContactPage.EN.1", "MACHOS BEY / CONTACT")}</span>
            <h2>{p.detailsTitle}</h2>
            <div className="contactDetailRow"><span>{p.email}</span><a dir="ltr" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
            {siteConfig.phone && <div className="contactDetailRow"><span>{p.phone}</span><a dir="ltr" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a></div>}
            <div className="contactDetailRow"><span>{p.location}</span><strong>{t.common.region}</strong></div>
          </aside>

          <div className="contactFormWrap" data-reveal>
            <div className="contactFormHeading"><h2>{p.formTitle}</h2><p>{p.formText}</p></div>
            <ContactForm deliveryEnabled={deliveryEnabled} />
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
