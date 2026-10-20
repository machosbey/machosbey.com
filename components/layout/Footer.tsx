'use client';
import { useContent } from '@/components/providers/ContentProvider';


import { useLocale } from '@/components/providers/LocaleProvider';


const navRoutes = ['/', '/about', '/portfolio', '/subscriptions', '/contact'];

export default function Footer() {
 const { copy, site: siteConfig } = useContent();

  const { t, locale, setLocale } = useLocale();
  const navLabels = [t.nav.home, t.nav.about, t.nav.portfolio, t.nav.subscriptions, t.nav.contact];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <a href="/" className="brand brand--footer" aria-label={t.brand}>
              <span className="footerBrandMark"><img className="brand__logo" src={copy("media.logo","/brand/machos-bey-mark.png")} alt="" aria-hidden="true" /></span>
              <span className="brand__name">{t.brand}</span>
            </a>
            <p>{t.footer.tagline}</p>
            <a dir="ltr" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><br /><a dir="ltr" href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phone}</a>
          </div>

          <div className="footerCols">
            <div>
              <span>{t.common.navigation}</span>
              {navLabels.map((label: string, index: number) => <a href={navRoutes[index]} key={navRoutes[index]}>{label}</a>)}
            </div>
            {siteConfig.socials.length > 0 && <div>
              <span>{t.common.social}</span>
              {siteConfig.socials.map((item) => <a href={item.href} key={item.label} target={item.href === '#' ? undefined : '_blank'} rel="noreferrer">{item.label}</a>)}
            </div>}
            <div>
              <span>{t.common.legal}</span>
              <a href="/privacy">{t.footer.privacy}</a>
              <a href="/terms">{t.footer.terms}</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 {t.brand} — {t.footer.rights}</span>
          <span>{t.common.region}</span><div className="lang" aria-label={t.common.languages}>{(['AR','EN'] as const).map(lang=><button key={lang} className={lang===locale?'active':''} aria-pressed={lang===locale} onClick={()=>setLocale(lang)}>{lang}</button>)}</div>
        </div>
      </div>
    </footer>
  );
}

