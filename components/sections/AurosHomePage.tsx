'use client';
import { useContent } from '@/components/providers/ContentProvider';

import ArrowIcon from '@/components/ui/ArrowIcon';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/motion/Atmosphere';
import LiquidOrb from '@/components/motion/LiquidOrb';
import ExploreServices from '@/components/sections/ExploreServices';

import { useLocale } from '@/components/providers/LocaleProvider';
gsap.registerPlugin(ScrollTrigger);
export default function AurosHomePage() {
 const { copy } = useContent();

  const root = useRef<HTMLDivElement>(null);
  const { t, rtl, locale } = useLocale();
  useLayoutEffect(() => {
    if (!root.current || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const ctx = gsap.context(() => {
      gsap.from('.auHero__copy > *', {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 1.15,
        ease: 'power3.out',
        delay: 0.15,
      });
      gsap.from('.auHero .liquidOrb', {
        opacity: 0,
        duration: 1.8,
        delay: 0.3,
      });
      gsap.to('.auHero .liquidOrb', {
        y: -24,
        ease: 'none',
        scrollTrigger: {
          trigger: '.auHero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      gsap.fromTo(
        '.kinetic__one',
        { xPercent: rtl ? -16 : 16 },
        {
          xPercent: rtl ? 8 : -8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.kinetic',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
      gsap.fromTo(
        '.kinetic__two',
        { xPercent: rtl ? 16 : -16 },
        {
          xPercent: rtl ? -8 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: '.kinetic',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
      gsap.utils
        .toArray<HTMLElement>('[data-reveal]')
        .forEach((el) =>
          gsap.from(el, {
            y: 36,
            opacity: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        );
    }, root);
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      ctx.revert();
    };
  }, [locale, rtl]);
  return (
    <div ref={root} className="site auHome" dir={rtl ? 'rtl' : 'ltr'}>
      <Atmosphere />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="auHero">
          <div className="auHero__copy container">
            <h1>
              {rtl ? (
                <>{copy("inline.AurosHomePage.AR.1", "نمنح أفكارك")}<br />{copy("inline.AurosHomePage.AR.2", "حياة رقمية.")}</>
              ) : (
                <>{copy("inline.AurosHomePage.EN.3", "Bringing your ideas")}<br />{copy("inline.AurosHomePage.EN.4", "to digital life.")}</>
              )}
            </h1>
            <p className="auHero__description">{t.hero.description}</p>
            <a className="pill" href="/contact">
              {t.nav.cta}
              <span aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
          <div className="auHero__visual">
            <div className="auHero__brand" aria-hidden="true">
              {rtl ? t.brand : t.brand.toUpperCase()}
            </div>
            <LiquidOrb />
          </div>
          <a className="scrollCue" href="#discover">
            <span>{rtl ? copy("inline.AurosHomePage.AR.7", "اكتشف ماخوس بيه") : copy("inline.AurosHomePage.EN.8", "Discover Machos Bey")}</span>
            <span aria-hidden="true">
              <ArrowIcon down />
            </span>
          </a>
        </section>
        <section
          className="kinetic"
          id="discover"
          aria-label={
            rtl ? copy("inline.AurosHomePage.AR.9", "نطوّر المستقبل الرقمي") : copy("inline.AurosHomePage.EN.10", "We build digital futures")
          }
        >
          <div aria-hidden="true" className="kinetic__one">
            {rtl ? copy("inline.AurosHomePage.AR.11", "نطوّر") : copy("inline.AurosHomePage.EN.12", "We Build")}
          </div>
          <div aria-hidden="true" className="kinetic__two">
            {rtl ? copy("inline.AurosHomePage.AR.13", "المستقبل.") : copy("inline.AurosHomePage.EN.14", "What’s Next.")}
          </div>
          <p>
            {rtl
              ? copy("inline.AurosHomePage.AR.15", "ماخوس بيه. خبرة في البرمجة والذكاء الاصطناعي، ورؤية تتجاوز الحدود.")
              : copy("inline.AurosHomePage.EN.16", "Machos Bey. Technology and AI expertise, with a vision that goes beyond borders.")}
          </p>
        </section>
        <ExploreServices />
        <section
          className="projectProcess container"
          aria-labelledby="process-title"
        >
          <div>
            <span className="sectionKicker">
              {rtl
                ? copy("inline.AurosHomePage.AR.17", "من أول محادثة إلى الإطلاق")
                : copy("inline.AurosHomePage.EN.18", "From conversation to launch")}
            </span>
            <h2 id="process-title">
              {rtl
                ? copy("inline.AurosHomePage.AR.19", "خطوة واضحة.\nفي كل مرحلة.")
                : copy("inline.AurosHomePage.EN.20", "A clear next step.\nAt every stage.")}
            </h2>
          </div>
          <ol>
            {(rtl
              ? [
                  [
                    copy("inline.AurosHomePage.AR.21", "نفهم ما تحتاجه"),
                    copy("inline.AurosHomePage.AR.22", "نبدأ بهدف المشروع، والمستخدمين، وما يحتاجه نشاطك فعلاً."),
                  ],
                  [
                    copy("inline.AurosHomePage.AR.23", "نصمّم ونطوّر"),
                    copy("inline.AurosHomePage.AR.24", "نحوّل المتطلبات إلى تجربة واضحة، ثم نبني الوظائف المتفق عليها."),
                  ],
                  [
                    copy("inline.AurosHomePage.AR.25", "نراجع ونسلّم"),
                    copy("inline.AurosHomePage.AR.26", "نراجع الاستخدام والتجاوب، ونوضّح خطوات تشغيل المشروع."),
                  ],
                ]
              : [
                  [
                    copy('inline.AurosHomePage.EN.understand','Understand'),
                    copy("inline.AurosHomePage.EN.27", "Start with your goals, your users, and what your business actually needs."),
                  ],
                  [
                    copy("inline.AurosHomePage.EN.28", "Design & build"),
                    copy("inline.AurosHomePage.EN.29", "Turn requirements into a clear experience and build the agreed functionality."),
                  ],
                  [
                    copy("inline.AurosHomePage.EN.30", "Review & hand over"),
                    copy("inline.AurosHomePage.EN.31", "Review usability and responsiveness, then explain how to run your project."),
                  ],
                ]
            ).map(([title, description], i) => (
              <li key={title}>
                <span className="projectProcess__number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="auReach container" data-reveal>
          <div className="auReach__copy">
            <p className="eyebrow">{rtl ? copy("inline.AurosHomePage.AR.32", "من نحن") : copy("inline.AurosHomePage.EN.33", "Beyond borders")}</p>
            <h2>
              {rtl ? (
                <>{copy("inline.AurosHomePage.AR.34", "خبرة محلية.")}<br />{copy("inline.AurosHomePage.AR.35", "طموح عالمي.")}</>
              ) : (
                <>{copy("inline.AurosHomePage.EN.36", "Connected expertise.")}<br />{copy("inline.AurosHomePage.EN.37", "Global ambition.")}</>
              )}
            </h2>
            <p>
              {rtl
                ? copy("inline.AurosHomePage.AR.38", "فريق متخصص ذو خبرة في التكنولوجيا والذكاء الاصطناعي. نقدم خدماتنا في أوروبا والشرق الأوسط، ونتطلع إلى الوصول عالمياً.")
                : copy("inline.AurosHomePage.EN.39", "A specialist team with experience in technology and artificial intelligence. Serving Europe and the Middle East, with an ambition to reach the world.")}
            </p>
            <a className="pill pill--dark" href="/about">
              {t.nav.about}
              <span aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
          <div className="reachWorld" aria-hidden="true">
            <img
              src={copy("media.AurosHomePage.40", "/images/reach-world.svg")}
              alt=""
              width="800"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
        <section className="closing container" data-reveal>
          <h2>
            {rtl ? (
              <>{copy("inline.AurosHomePage.AR.41", "نحن نتكفّل بكل شيء.")}<br />{copy("inline.AurosHomePage.AR.42", "عليك فقط أن تبدأ.")}</>
            ) : (
              <>{copy("inline.AurosHomePage.EN.43", "We take care of everything.")}<br />{copy("inline.AurosHomePage.EN.44", "You take the first step.")}</>
            )}
          </h2>
          <div>
            <p>
              {rtl
                ? copy("inline.AurosHomePage.AR.45", "فكرتك القادمة تبدأ بمحادثة.")
                : copy("inline.AurosHomePage.EN.46", "Your next idea begins with a conversation.")}
            </p>
            <a className="pill" href="/contact">
              {t.nav.cta}
              <span aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
