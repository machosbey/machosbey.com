'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { rtl } = useLocale();
  return <main className="statusPage" id="main-content" dir={rtl ? 'rtl' : 'ltr'}>
    <div>
      <p className="eyebrow">MACHOS BEY</p>
      <h1>{rtl ? 'تعذّر تحميل الصفحة' : 'Unable to load this page'}</h1>
      <p>{rtl ? 'حاول مرة أخرى، أو تواصل معنا عبر info@machosbey.com.' : 'Try again, or contact us at info@machosbey.com.'}</p>
      <button className="pill" onClick={reset}>{rtl ? 'حاول مجدداً' : 'Try again'}</button>
      <a className="textLink" href="/">{rtl ? 'الرئيسية' : 'Home'}</a>
    </div>
  </main>;
}
