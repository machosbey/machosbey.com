'use client';
import { useContent } from '@/components/providers/ContentProvider';


import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import ArrowIcon from '@/components/ui/ArrowIcon';
import SubscriptionIcon from '@/components/ui/SubscriptionIcon';
import styles from './ExploreServices.module.css';

export default function ExploreServices() {
 const { copy } = useContent();

  const { t, rtl } = useLocale();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const copy = section.querySelector<HTMLElement>('[data-service-copy]');
    const visual = section.querySelector<HTMLElement>('[data-service-visual]');
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      if (copy && visual) {
        const mobile = innerWidth <= 800 && innerHeight > 600;
        const edge = mobile
          ? visual.getBoundingClientRect().bottom -
            copy.getBoundingClientRect().top
          : -80;
        copy.style.setProperty(
          '--service-fade-edge',
          `${Math.max(-80, edge)}px`
        );
      }
      const target =
        innerWidth <= 800
          ? Math.min(innerHeight * 0.65, 470)
          : innerHeight * 0.48;
      let closest = 0,
        distance = Infinity;
      section
        .querySelectorAll<HTMLElement>('[data-service]')
        .forEach((card, i) => {
          const rect = card.getBoundingClientRect();
          const delta = Math.abs(rect.top + rect.height / 2 - target);
          if (delta < distance) {
            closest = i;
            distance = delta;
          }
        });
      setActive(closest);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(section);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [t]);
  return (
    <section
      ref={root}
      className={`${styles.explore} container`}
      aria-labelledby="explore-title"
    >
      <div className={styles.copy} data-service-copy>
        <header className={styles.heading}>
          <p className="eyebrow">
            {rtl ? copy("inline.ExploreServices.AR.1", "اكتشف إمكانياتك") : copy("inline.ExploreServices.EN.2", "Explore the possibilities")}
          </p>
          <h2 id="explore-title">
            {rtl ? copy("inline.ExploreServices.AR.3", "حلول تفتح آفاقاً.") : copy("inline.ExploreServices.EN.4", "Possibilities, unlocked.")}
          </h2>
        </header>
        <div className={styles.cards}>
          {t.services.items.map((item, i) => (
            <a
              data-service
              key={item.title}
              className={`${styles.card} ${active === i ? styles.active : ''}`}
              href={`/subscriptions#service-${i}`}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') setActive(i);
              }}
              onFocus={() => setActive(i)}
            >
              <h3>
                {item.title}
                <span className={styles.arrow} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </h3>
              <p>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
      <aside className={styles.visual} data-service-visual>
        <a className={`pill ${styles.cta}`} href="/subscriptions">
          {rtl ? copy("inline.ExploreServices.AR.5", "جميع الاشتراكات") : copy("inline.ExploreServices.EN.6", "All subscriptions")}
          <span aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
        <div className={styles.stage} aria-hidden="true">
          {t.services.items.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.illustration} ${active === index ? styles.illustrationActive : ''}`}
            >
              <SubscriptionIcon index={index} />
            </div>
          ))}
        </div>
        <div className={styles.caption} aria-hidden="true">
          <span>0{active + 1} / 05</span>
          <span>{t.services.items[active]?.title}</span>
        </div>
      </aside>
    </section>
  );
}
