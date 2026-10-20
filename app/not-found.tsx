'use client';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import ArrowIcon from '@/components/ui/ArrowIcon';

export default function NotFound() {
  const { rtl } = useLocale();
  return (
    <main id="main-content" className="statusPage" dir={rtl ? 'rtl' : 'ltr'}>
      <div style={{ textAlign: 'center', maxWidth: 620 }}>
        <div style={{ fontSize: 12, opacity: .6, marginBottom: 18 }}>MACHOS BEY / 404</div>
        <h1 style={{ fontSize: 'clamp(52px,8vw,110px)', margin: '0 0 18px' }}>404</h1>
        <p style={{ lineHeight: 1.8, marginBottom: 28 }}>{rtl ? 'الصفحة المطلوبة غير موجودة.' : 'The page you requested could not be found.'}</p>
        <Link href="/" className="pill pill--blue">{rtl ? 'العودة للرئيسية' : 'Back to home'} <span aria-hidden="true"><ArrowIcon /></span></Link>
      </div>
    </main>
  );
}
