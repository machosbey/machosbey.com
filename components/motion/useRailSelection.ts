'use client';
import { useEffect, useRef, type RefObject } from 'react';

export function useRailSelection(ref: RefObject<HTMLDivElement | null>, select: (index: number) => void, active: number, locale: string) {
  const current = useRef(active);
  const align = useRef<(index: number) => void>(() => {});
  useEffect(() => {
    const rail = ref.current;
    const section = rail?.closest<HTMLElement>('.services, .storyServices');
    if (!rail || !section) return;
    const media = window.matchMedia('(max-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)');
    let frame = 0, bucket = -1;
    const cards = Array.from(rail.children) as HTMLElement[];
    section.style.setProperty('--service-count', String(cards.length));
    const centerCard = (index: number) => {
      if (window.innerWidth > 768 || !cards[index]) return;
      const r = rail.getBoundingClientRect(), c = cards[index].getBoundingClientRect();
      rail.scrollLeft += (c.left + c.width / 2) - (r.left + rail.clientWidth / 2);
    };
    align.current = centerCard;
    const pageScroll = () => {
      if (!media.matches) return;
      const r = section.getBoundingClientRect();
      const stage = section.firstElementChild as HTMLElement;
      const travel = section.offsetHeight - stage.offsetHeight;
      if (travel <= 0 || r.top > 64 || r.bottom < stage.offsetHeight) return;
      const progress = Math.max(0, Math.min(1, (64 - r.top) / travel));
      const index = Math.min(cards.length - 1, Math.floor(progress * cards.length));
      if (index === bucket) return;
      bucket = index; current.current = index; select(index); centerCard(index);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(pageScroll); };
    const railScroll = () => {
      if (window.innerWidth > 768) return;
      const r = rail.getBoundingClientRect();
      let best = 0, distance = Infinity;
      cards.forEach((card, index) => {
        const c = card.getBoundingClientRect();
        const d = Math.abs(c.left + c.width / 2 - r.left - rail.clientWidth / 2);
        if (d < distance) { distance = d; best = index; }
      });
      if (current.current !== best) { current.current = best; select(best); }
    };
    const resize = () => { bucket = -1; centerCard(current.current); schedule(); };
    rail.addEventListener('scroll', railScroll, {passive:true});
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', resize); media.addEventListener('change', resize);
    centerCard(current.current); schedule();
    return () => { cancelAnimationFrame(frame); rail.removeEventListener('scroll', railScroll); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', resize); media.removeEventListener('change', resize); section.style.removeProperty('--service-count'); };
  }, [ref, select, locale]);
  useEffect(() => { if (current.current !== active) { current.current = active; align.current(active); } }, [active]);
}
