'use client';
import ArrowIcon from '@/components/ui/ArrowIcon';

import ParticleField from '@/components/three/ParticleField';
import StudioVisual from '@/components/ui/StudioVisual';
import { siteConfig } from '@/config/site';
import CardSculpture from '@/components/three/CardSculpture';


import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import BrandMotif from '@/components/ui/BrandMotif';
import { useLocale } from '@/components/providers/LocaleProvider';


gsap.registerPlugin(ScrollTrigger);

const shapes = ['browser', 'phone', 'blocks', 'network', 'connected'] as const;


export default function HomePage() {
  const root = useRef<HTMLDivElement>(null);

  const serviceRail = useRef<HTMLDivElement>(null);
  const [service, setService] = useState(0);
  const [work, setWork] = useState(0);
  const { t, rtl, locale } = useLocale();
  const services = t.services.items;
  const workAreas = t.work.items;

  useLayoutEffect(() => { const rail=serviceRail.current; const card=rail?.children[service] as HTMLElement|undefined; if(!rail||!card||window.innerWidth<=900)return; const r=rail.getBoundingClientRect(),c=card.getBoundingClientRect(); rail.scrollBy({left:c.left-r.left-(rail.clientWidth-card.clientWidth)/2,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); },[service,locale]);
  useLayoutEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.nav__inner', { y: -12, opacity: 0, duration: 0.65 })
        .from('.hero__ghost', { opacity: 0, duration: 1 }, 0.15)
        .fromTo('.hero__particle .visualHost', { opacity: 0 }, { opacity: 1, duration: 1.45, ease: 'expo.out' }, 0.25)
        .from('.hero__line > span', { y: 58, opacity: 0, duration: 0.95, stagger: 0.13 }, 0.35)
        .from('.hero__desc', { y: 18, opacity: 0, duration: 0.65 }, 0.72)
        .from('.hero__cta', { y: 15, opacity: 0, duration: 0.55 }, 0.9);

      mm.add('(min-width: 901px) and (min-height: 650px)', () => {
        gsap.fromTo('.hero__particle',{scale:1},{scale:.93,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.5,invalidateOnRefresh:true}});
        gsap.to('.hero__copy',{y:-35,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.5}});
        gsap.to('.hero__ghost',{y:-24,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
        ScrollTrigger.create({trigger:'.services',start:'top top',end:()=>'+='+Math.min(1800,services.length*300),pin:'.services__stage',invalidateOnRefresh:true,onUpdate:self=>setService(Math.min(services.length-1,Math.floor(self.progress*services.length)))});
      });
      mm.add('(max-width: 900px)',()=>{gsap.utils.toArray<HTMLElement>('.serviceCard').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 65%',end:'bottom 35%',onEnter:()=>setService(i),onEnterBack:()=>setService(i)}));});
      gsap.utils.toArray<HTMLElement>('.workRow').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',onEnter:()=>setWork(i),onEnterBack:()=>setWork(i)}));
      gsap.utils.toArray<HTMLElement>('.processStep').forEach(el=>ScrollTrigger.create({trigger:el,start:'top 75%',end:'bottom 40%',toggleClass:'is-active'}));
      gsap.from('.serviceCard', { y: 20, duration: 0.6, stagger: 0.07, scrollTrigger: { trigger: '.services', start: 'top 80%', once: true } });
      gsap.from('.proofCard', { y: 24, duration: 0.85, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.proof', start: 'top 78%', once: true } });
      gsap.from('.ctaPanel', { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.ctaSection', start: 'top 78%', once: true } });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => { window.clearTimeout(refresh); mm.revert(); ctx.revert(); };
  }, [services.length, locale]);

  return (
    <div ref={root} className="site referenceHome videoHome" dir={rtl ? 'rtl' : 'ltr'}>
      <Navbar />
      <main>
        <section id="top" className="hero section">
          <div className="hero__ghost">{t.brand}</div>
          <BrandMotif className="brandMotif--hero" />
          <div className="hero__particle"><ParticleField shape="sphere" /></div>
          <div className="container hero__content">
            <div className="hero__copy">
              <h1>
                <span className="hero__line"><span>{t.hero.title1}</span></span>
                <span className="hero__line hero__line--accent"><span>{t.hero.title2}</span></span>
              </h1>
            </div>
            <div className="hero__lower">
              <div className="hero__intro">
                <p className="hero__desc">{t.hero.description}</p>
                <div className="hero__cta">
                  <a className="pill pill--blue" href="/contact">{t.hero.primary}<span><ArrowIcon /></span></a>
                  <a className="textLink" href="/subscriptions">{t.hero.secondary}<span><ArrowIcon down /></span></a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="services" className="services section">
          <div className="services__stage">
            <div className="container services__layout"><div className="services__visual"><ParticleField shape={shapes[service]} compact /></div>
              
              <div className="services__content">
                <div className="sectionTop"><h2>{t.services.title}</h2><p>{t.services.intro}</p></div>
                <div ref={serviceRail} className="serviceRail">
                  {services.map((item, index) => (
                    <article key={item.title} className={`serviceCard ${index === service ? 'is-active' : ''}`} role="button" aria-pressed={index === service} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setService(index); } }} onFocus={() => setService(index)} onClick={() => setService(index)} onMouseEnter={() => { if (window.matchMedia('(pointer: fine)').matches) setService(index); }}>
                      <div className="serviceCard__top"><span>{String(index + 1).padStart(2, '0')}</span><span className="arrow" aria-hidden="true">{index === service ? '●' : '○'}</span></div>
                      <div className="serviceCard__body"><h3>{item.title}</h3><p>{item.description}</p></div>
                      
                      <div className="serviceCard__tags">{item.tags.map((tag: string) => <span key={tag}>{tag}</span>)}</div>
                    </article>
                  ))}
                </div>
                <div className="serviceProgress"><span style={{ width: `${((service + 1) / services.length) * 100}%` }} /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work section">
          <div className="container work__layout">
            <div className="work__list">
              <a className="textLink" href="/portfolio">{t.nav.portfolio} ↗</a>
              <div className="sectionTop sectionTop--work"><h2>{t.work.title}</h2><p>{t.work.intro}</p></div>
              <div>
                {workAreas.map((item, index) => (
                  <button key={item.title} className={`workRow ${work === index ? 'active' : ''}`} onMouseEnter={() => setWork(index)} onFocus={() => setWork(index)} onClick={() => setWork(index)} aria-pressed={work === index}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item.title}</strong>
                    <span className="workTags">{item.tags.map((tag: string) => <em key={tag}>{tag}</em>)}</span>
                    <span><ArrowIcon /></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="workPreview">
              <div className="studioShowcase" key={work}><div className="studioShowcase__meta"><span>{rtl?'مجالات التنفيذ':'Areas of delivery'}</span><span>0{work+1}</span></div><StudioVisual kind={(['browser','blocks','phone','network','graph'] as const)[work]} /><div className="studioShowcase__caption"><h3>{workAreas[work].title}</h3><p>{rtl?'تصوّر بصري للمجال':'A visual interpretation of the field'}</p></div></div>
            </div>
          </div>
        </section>

        <section className="studioAbout section" aria-labelledby="home-about-title"><div className="container studioAbout__layout"><div><a className="sectionKicker" href="/about">{t.nav.about} ↗</a><h2 id="home-about-title">{rtl?'خبرة تقنية.\nرؤية تتجاوز الحدود.':'Technical expertise.\nA vision beyond borders.'}</h2></div><div className="studioAbout__body"><p>{rtl?'فريق متخصص ذو خبرة في التكنولوجيا والذكاء الاصطناعي، نقدم خدماتنا في أوروبا والشرق الأوسط ونسعى إلى التوسع عالميًا. نركز على بناء حلول رقمية موثوقة، قابلة للتوسع، ومصممة وفق احتياجات كل مشروع.':'An experienced team specializing in technology and artificial intelligence. We serve Europe and the Middle East and aim to expand globally through digital solutions that combine quality, flexibility and a deep understanding of client needs.'}</p><div className="studioAbout__points">{(rtl?['خبرة تقنية','عمل دولي','جودة التنفيذ','قابلية التوسع']:['Technical expertise','International reach','Quality delivery','Scalability']).map((v,i)=><div key={v}><span>0{i+1}</span><strong>{v}</strong></div>)}</div></div></div></section>
        <section id="pillars" className="proof section expressiveSection" aria-labelledby="pillars-title">
          <div className="container">
            <div className="proofHeader"><span>MACHOS BEY</span><h2 id="pillars-title">{t.pillars.title}</h2></div>
            <div className="proofGrid">
              <article className="proofCard proofCard--large">
                <span>01</span>
                <CardSculpture kind="layers" />
                <div className="proofCard__copy"><h3>{t.pillars.advanced.title}</h3><p>{t.pillars.advanced.text}</p></div>
              </article>
              <article className="proofCard">
                <span>02</span>
                <CardSculpture kind="workflow" />
                <div className="proofCard__copy"><h3>{t.pillars.management.title}</h3><p>{t.pillars.management.text}</p></div>
              </article>
              <article className="proofCard">
                <span>03</span>
                <CardSculpture kind="links" />
                <div className="proofCard__copy"><h3>{t.pillars.why.title}</h3><p>{t.pillars.why.text}</p></div>
              </article>
              {(rtl?[['المرونة','كل مشروع يتم تصميمه حسب احتياجاته الفعلية.'],['الوضوح','تواصل واضح خلال مراحل العمل والتسليم.']]:[['Flexibility','Each project is designed around its actual needs.'],['Clarity','Clear communication throughout delivery and handover.']]).map(([title,text],i)=><article className="proofCard proofCard--support" key={title}><span>0{i+4}</span><div className="proofCard__copy"><h3>{title}</h3><p>{text}</p></div></article>)}
            </div>
          </div>
        </section>

        <section className="videoProcess section"><div className="container"><div className="processHeading"><span className="sectionKicker">{rtl?'من الفكرة إلى الإطلاق':'From idea to launch'}</span><h2>{rtl?'كيف نعمل':'Our approach'}</h2></div><div className="processSequence">{(rtl?['فهم المشروع','تحليل الاحتياجات','التصميم','التطوير','الاختبار','الإطلاق']:['Discovery','Requirements','Design','Development','Testing','Launch']).map((v,i)=><div className="processStep" key={v}><span>0{i+1}</span><h3>{v}</h3></div>)}</div></div></section>
        <section className="studioStart section"><div className="container"><div className="studioStart__heading"><span className="sectionKicker">{t.nav.subscriptions}</span><h2>{rtl?'كل مشروع يبدأ بخطوة.':'Every project starts with a step.'}</h2></div><div className="studioStart__links">{services.map((item,i)=><a key={item.title} href={'/contact?service='+i}><span>0{i+1}</span><strong>{item.title}</strong><span><ArrowIcon /></span></a>)}</div></div></section>
        <section id="contact" className="ctaSection section">
          <div className="container">
            <div className="ctaPanel">
              <div className="aurora aurora--1" /><div className="aurora aurora--2" />
              <BrandMotif className="brandMotif--cta" />
              <div className="ctaPanel__content">
                <h2>{t.cta.title}</h2><p>{t.cta.text}</p>
                <a className="pill pill--light" href="/contact">{t.cta.button}<span><ArrowIcon /></span></a><div className="studioContactLinks"><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a dir="ltr" href="tel:+31626100020">{siteConfig.phone}</a></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


