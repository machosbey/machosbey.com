'use client';
import ArrowIcon from '@/components/ui/ArrowIcon';

import LiquidOrb from '@/components/motion/LiquidOrb';
import Molecule from '@/components/ui/Molecule';

type HeroProps = {
  label: string;
  title: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: 'sphere' | 'browser' | 'phone' | 'network' | 'graph' | 'blocks' | 'connected' | 'motif';
  statement?: boolean;
};

export default function PageHero({ label, title, description, primary, secondary, visual = 'motif', statement = false }: HeroProps) {
  const lines = title.split('\n');
  return (
    <section className={`pageHero ${statement ? 'pageHero--statement' : ''}`}>
      <div className="container pageHero__grid">
        <div className="pageHero__copy">
          <div className="pageHero__eyebrow">{label}</div>
          <h1>
            {lines.map((line) => <span className="pageHero__line" key={line}><span>{line}</span></span>)}
          </h1>
          {(description || primary || secondary) && (
            <div className="pageHero__support">
              {description && <p>{description}</p>}
              {(primary || secondary) && <div className="pageHero__actions">
                {primary && <a className="pill pill--blue" href={primary.href}>{primary.label}<span><ArrowIcon /></span></a>}
                {secondary && <a className="textLink" href={secondary.href}>{secondary.label}<span><ArrowIcon down /></span></a>}
              </div>}
            </div>
          )}
        </div>
        <div className="pageHero__visual" aria-hidden="true">
          {visual === 'sphere' ? <LiquidOrb /> : <Molecule />}
        </div>
      </div>
    </section>
  );
}
