'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/motion/Atmosphere';
import { useLocale } from '@/components/providers/LocaleProvider';

gsap.registerPlugin(ScrollTrigger);

export default function PageFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const { rtl, locale } = useLocale();

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      if(root.current?.querySelector('.pageHero')) {
      gsap.from('.pageHero__eyebrow', { y: 16, opacity: 0, duration: 0.65, ease: 'power3.out' });
      gsap.from('.pageHero__line > span', { y: 70, opacity: 0, duration: 1.0, stagger: 0.12, ease: 'power3.out', delay: 0.08 });
      gsap.from('.pageHero__support', { y: 22, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 0.45 });
      gsap.from('.pageHero__visual', { scale: 0.9, opacity: 0, duration: 1.15, ease: 'expo.out', delay: 0.2 });
      }

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 42,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.editorialRow').forEach((element, index) => {
        gsap.from(element, {
          y: 34,
          duration: 0.72,
          delay: Math.min(index * 0.035, 0.2),
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => { window.clearTimeout(refresh); ctx.revert(); };
  }, [locale]);

  return (
    <div ref={root} className={`site innerSite ${className}`} dir={rtl ? 'rtl' : 'ltr'}>
      <Atmosphere />
      <Navbar />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
