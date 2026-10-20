'use client';
import { useContent } from '@/components/providers/ContentProvider';

import ArrowIcon from '@/components/ui/ArrowIcon';
import styles from './AboutPage.module.css';


import PageFrame from '@/components/ui/PageFrame';
import PageHero from '@/components/ui/PageHero';
import PageCTA from '@/components/ui/PageCTA';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AboutPage() {
 const { copy } = useContent();

  const { t, rtl } = useLocale();
  const p = t.aboutPage;

  return (
    <PageFrame className="aboutPage">
      <PageHero
        label={p.label}
        title={p.heroTitle}
        description={p.heroText}
        primary={{ label: rtl ? copy("inline.AboutPage.AR.1", "رؤيتنا ورسالتنا") : copy("inline.AboutPage.EN.2", "Our vision & mission"), href: '#vision' }}
        secondary={{ label: p.secondary, href: '/contact' }}
        visual="motif"
        statement
      />

      <section id="vision" className={styles.vision}>
        <div className={`container ${styles.visionGrid}`}>
          <header className={styles.intro}><span className={styles.kicker}>{rtl ? copy("inline.AboutPage.AR.3", "ما الذي يوجّهنا") : copy("inline.AboutPage.EN.4", "What guides us")}</span><h2>{p.visionMissionTitle}</h2><div className={styles.orbits} aria-hidden="true"><i/><i/><i/><span>{copy("inline.AboutPage.EN.5", "MB")}</span></div></header>
          <div className={styles.values}>{p.cards.map((card,index)=><article key={card.title} className={styles.value}><span className={styles.number}>0{index+1}</span><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
        </div>
      </section>
      <section className={styles.consultation}>
        <div className={`container ${styles.consultGrid}`}>
          <div><span className={styles.kicker}>{p.consultingLabel}</span><h2>{p.quote}</h2><p>{p.consultingText}</p><a className="textLink" href="/contact">{p.secondary}<ArrowIcon/></a></div>
          <div className={styles.process} aria-label={rtl?copy("inline.AboutPage.AR.6", "خطوات التعاون"):copy("inline.AboutPage.EN.7", "Our collaboration process")}>{(rtl?[copy("inline.AboutPage.AR.8", "نفهم فكرتك"),copy("inline.AboutPage.AR.9", "نحدّد الأولويات"),copy("inline.AboutPage.AR.10", "نرسم خطة التنفيذ")]:[copy("inline.AboutPage.EN.11", "Understand your idea"),copy("inline.AboutPage.EN.12", "Define priorities"),copy("inline.AboutPage.EN.13", "Plan the implementation")]).map((label,i)=><div key={label}><span>0{i+1}</span><strong>{label}</strong><span className={styles.dot}/></div>)}</div>
        </div>
      </section>
      <section className={styles.principles}>
        <div className="container"><header className={styles.principlesHead}><span className={styles.kicker}>{rtl?copy("inline.AboutPage.AR.14", "في كل تفصيل"):copy("inline.AboutPage.EN.15", "In every detail")}</span><h2>{p.principlesTitle}</h2></header><div className={styles.principleGrid}>{p.principles.map((item,index)=><article key={item}><svg viewBox="0 0 64 64" fill="none" aria-hidden="true">{index===0?<><path d="M15 33l11 11 24-27"/><circle cx="32" cy="32" r="26"/></>:index===1?<><path d="m32 5 8 17 19 3-14 14 3 20-16-10-17 10 4-20L5 25l19-3Z"/></>:index===2?<><path d="M5 32s10-19 27-19 27 19 27 19-10 19-27 19S5 32 5 32Z"/><circle cx="32" cy="32" r="9"/></>:<><path d="M23 45h18m-17 7h16M22 39c-17-18-2-34 10-34s27 16 10 34l-3 6H25Z"/><path d="m28 21 6 7-6 7"/></>}</svg><span className={styles.number}>0{index+1}</span><h3>{item}</h3></article>)}</div></div>
      </section>

      <PageCTA title={p.ctaTitle} button={p.ctaButton} href="/contact" />
    </PageFrame>
  );
}
