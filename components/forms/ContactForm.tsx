'use client';
import { useContent } from '@/components/providers/ContentProvider';

import ArrowIcon from '@/components/ui/ArrowIcon';



import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'not-configured';

export default function ContactForm({ deliveryEnabled = false }: { deliveryEnabled?: boolean }) {
 const { copy, site: siteConfig } = useContent();

  const { t, rtl } = useLocale();
  const serviceRef = useRef<HTMLSelectElement>(null);
  const selectedService = useRef<number | null>(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('service');
    if (selectedService.current === null && query !== null && /^[0-4]$/.test(query)) selectedService.current = Number(query);
    if (selectedService.current !== null && serviceRef.current) serviceRef.current.value = t.contactPage.serviceOptions[selectedService.current];
  }, [t]);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    if (!deliveryEnabled) {
      const body = Object.entries(payload).map(([key, value]) => key + ': ' + value).join('\n');
      window.location.href = 'mailto:' + siteConfig.email + '?subject=' + encodeURIComponent(copy("inline.ContactForm.EN.1", "Machos Bey — Project inquiry")) + '&body=' + encodeURIComponent(body);
      setMessage(rtl ? copy("inline.ContactForm.AR.2", "تم تجهيز مسودة البريد. أكمل إرسالها من تطبيق البريد لديك.") : copy("inline.ContactForm.EN.3", "Your email draft is ready. Complete sending it in your email app."));
      return;
    }
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        selectedService.current = null;
        setStatus('success');
        setMessage(t.common.success);
      } else if (result?.code === 'NOT_CONFIGURED') {
        setStatus('not-configured');
        setMessage(t.common.notConfigured);
      } else {
        setStatus('error');
        setMessage(t.common.error);
      }
    } catch {
      setStatus('error');
      setMessage(t.common.error);
    }
  }

  return (
    <form className="formGrid" onSubmit={submit}>
      {!deliveryEnabled && <p className="formDeliveryNote">{rtl ? copy("inline.ContactForm.AR.4", "املأ التفاصيل لفتح مسودة في تطبيق البريد وإرسالها، أو راسلنا مباشرة: ") : copy("inline.ContactForm.EN.5", "Fill in your details to open an email draft and send it, or email us directly: ")}<a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>}
      <label><span>{t.contactPage.fields.name} *</span><input name="name" required maxLength={200} autoComplete="name" /></label>
      <label><span>{t.contactPage.fields.email} *</span><input name="email" type="email" required maxLength={254} dir="ltr" autoComplete="email" /></label>
      <label className="formGrid__wide">
        <span>{t.contactPage.fields.service} *</span>
        <select ref={serviceRef} onChange={event => { selectedService.current = event.currentTarget.selectedIndex - 1; }} name="service" required defaultValue="">
          <option value="" disabled>—</option>
          {t.contactPage.serviceOptions.map((option: string) => <option value={option} key={option}>{option}</option>)}
        </select>
      </label>
      <label className="formGrid__wide"><span>{t.contactPage.fields.details} *</span><textarea name="details" rows={6} required maxLength={10000} /></label>
      <div className="formActions formGrid__wide">
        <button className="pill pill--blue" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.common.sending : !deliveryEnabled ? (rtl ? copy("inline.ContactForm.AR.6", "افتح مسودة البريد") : copy("inline.ContactForm.EN.7", "Open email draft")) : t.contactPage.fields.submit}<span><ArrowIcon /></span>
        </button>
        {status === 'not-configured' && <a className="formEmail" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
        {message && <p className={`formStatus formStatus--${status}`} role="status">{message}</p>}
      </div>
    </form>
  );
}