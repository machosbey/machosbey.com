'use client';
import { useContent } from '@/components/providers/ContentProvider';
export default function BrandMotif({ className = '' }: { className?: string }) {
 const { copy } = useContent();

  return (
    <div className={`brandMotif ${className}`} aria-hidden="true">
      <img
        src={copy("media.logo","/brand/machos-bey-mark.png")}
        alt=""
        width={611}
        height={482}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
