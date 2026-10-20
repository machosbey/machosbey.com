"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '@/components/providers/LocaleProvider';
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  const { locale } = useLocale();
  const pathname = usePathname();
  useEffect(() => {
    let disposed = false;
    let frame = 0;
    const refresh = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    document.addEventListener('load', refresh, true);

    return () => { disposed = true; cancelAnimationFrame(frame); window.removeEventListener('load', refresh); document.removeEventListener('load', refresh, true); };
  }, [locale, pathname]);
  return null;
}
