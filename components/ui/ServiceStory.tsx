'use client';


import { useLayoutEffect, useRef, useState } from 'react';
import { useRailSelection } from '@/components/motion/useRailSelection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from '@/components/three/ParticleField';
import { useLocale } from '@/components/providers/LocaleProvider';

gsap.registerPlugin(ScrollTrigger);

type Shape = 'browser' | 'phone' | 'network' | 'graph' | 'blocks' | 'connected';
type Item = { title: string; text: string; tags?: string[]; shape: Shape };

export default function ServiceStory({ title, intro, items, id }: { title: string; intro: string; items: Item[]; id: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { rtl, locale } = useLocale();

  useRailSelection(railRef, setActive, active, locale);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const move = () => {
      if (window.innerWidth <= 768) { gsap.set(rail, { x: 0 }); return; }
      const maxShift = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const progress = items.length > 1 ? active / (items.length - 1) : 0;
      gsap.to(rail, { x: (rtl ? 1 : -1) * maxShift * progress, duration: 0.66, ease: 'power3.out', overwrite: 'auto' });
    };

    move();
    const observer = new ResizeObserver(move);
    observer.observe(rail);
    window.addEventListener('resize', move);
    return () => { observer.disconnect(); window.removeEventListener('resize', move); gsap.killTweensOf(rail); };
  }, [active, items.length, rtl]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add('(min-width: 769px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * items.length * 0.68)}`,
        pin: section.querySelector('.storyServices__stage') as HTMLElement,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          setActive(index);
        },
      });
      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <section id={id} ref={sectionRef} className="storyServices darkSection">
      <div className="storyServices__stage">
        <div className="container storyServices__layout">
          <div className="storyServices__visual">
            <ParticleField shape={items[active].shape} compact />
            <div className="orbGlow" />
          </div>
          <div className="storyServices__content">
            <div className="sectionTop">
              <h2>{title}</h2>
              <p>{intro}</p>
            </div>
            <div ref={railRef} className="storyServices__rail">
              {items.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className={`storyServiceCard ${index === active ? 'is-active' : ''}`}
                  tabIndex={0}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => { if (window.matchMedia('(pointer: fine)').matches) setActive(index); }}
                >
                  <div className="storyServiceCard__top"><span>{String(index + 1).padStart(2, '0')}</span><i>↗</i></div>
                  <div className="storyServiceCard__body"><h3>{item.title}</h3><p>{item.text}</p></div>
                  <div className="storyServiceCard__tags">{item.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </article>
              ))}
            </div>
            <div className="storyServices__progress"><span style={{ width: `${((active + 1) / items.length) * 100}%` }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
