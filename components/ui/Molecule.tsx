'use client';
import { useContent } from '@/components/providers/ContentProvider';
export default function Molecule() {
 const { copy } = useContent();

  return (
    <div className="molecule brandSculpture" aria-hidden="true">
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
