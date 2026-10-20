import ArrowIcon from '@/components/ui/ArrowIcon';
import BrandMotif from '@/components/ui/BrandMotif';

export default function PageCTA({ title, text, button, href = '/contact', light = false }: { title: string; text?: string; button: string; href?: string; light?: boolean }) {
  return (
    <section className={`pageCTA ${light ? 'pageCTA--light' : ''}`}>
      <div className="container">
        <div className="pageCTA__panel" data-reveal>
          {!light && <><div className="aurora aurora--1" /><div className="aurora aurora--2" /></>}
          <BrandMotif className="pageCTA__motif" />
          <div className="pageCTA__content">
            <h2>{title}</h2>
            {text && <p>{text}</p>}
            <a className={light ? 'pill pill--blue' : 'pill pill--light'} href={href}>{button}<span><ArrowIcon /></span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
