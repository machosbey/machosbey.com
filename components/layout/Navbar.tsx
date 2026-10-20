'use client';
import { useContent } from '@/components/providers/ContentProvider';

import ArrowIcon from '@/components/ui/ArrowIcon';


import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { Locale } from '@/data/i18n';

const routes = ['/', '/about', '/portfolio', '/subscriptions', '/contact'];

export default function Navbar() {
 const { copy } = useContent();

  const { t, locale, setLocale, rtl } = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () => Array.from(menuPanel.current?.querySelectorAll<HTMLElement>('a, button') || []);
    focusable()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); }
      if (event.key === 'Tab') {
        const elements = [menuButton.current, ...focusable()].filter(Boolean) as HTMLElement[];
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 1024) setOpen(false); };
    document.addEventListener('keydown', keydown); window.addEventListener('resize', resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', keydown); window.removeEventListener('resize', resize); };
  }, [open]);

  const labels = [t.nav.home, t.nav.about, t.nav.portfolio, t.nav.subscriptions, t.nav.contact];

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="skipLink" href="#main-content">{rtl ? copy("inline.Navbar.AR.2", "انتقل إلى المحتوى") : copy("inline.Navbar.EN.3", "Skip to content")}</a>
      <div className="nav__inner">
        <a href="/" className="brand" aria-label={t.brand}>
          <img className="brand__logo" src={copy("media.logo", "/brand/machos-bey-mark.png")} width={38} height={44} alt="" aria-hidden="true" />
          <span className="brand__name">{t.brand}</span>
        </a>

        <nav className="nav__links" aria-label={t.common.mainNavigation}>
          {labels.map((label: string, index: number) => (
            <a key={routes[index]} aria-current={pathname === routes[index] ? 'page' : undefined} className={pathname === routes[index] ? 'active' : ''} href={routes[index]}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <div className="lang" aria-label={t.common.languages}>
            {(['AR', 'EN'] as Locale[]).map((lang) => (
              <button key={lang} onClick={() => setLocale(lang)} className={lang === locale ? 'active' : ''} aria-pressed={lang === locale}>
                {lang}
              </button>
            ))}
          </div>
          <a className="pill pill--light" href="/contact">
            {t.nav.cta}<span><ArrowIcon /></span>
          </a>
        </div>

        <button ref={menuButton} className="menuBtn" aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={t.common.menu}>
          <span /><span />
        </button>
      </div>

      {open && (
        <div ref={menuPanel} id="mobile-navigation" role="navigation" aria-label={t.common.mainNavigation} className="mobileMenu" data-lenis-prevent>
          {labels.map((label: string, index: number) => (
            <a key={routes[index]} href={routes[index]} aria-current={pathname === routes[index] ? 'page' : undefined}>{label}</a>
          ))}
          <div className="lang lang--mobile">
            {(['AR', 'EN'] as Locale[]).map((lang) => (
              <button key={lang} onClick={() => { setLocale(lang); setOpen(false); menuButton.current?.focus(); }} aria-pressed={lang === locale} className={lang === locale ? 'active' : ''}>{lang}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
