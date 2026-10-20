'use client';
import ArrowIcon from '@/components/ui/ArrowIcon';


import { siteConfig } from '@/config/site';
import { FormEvent, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'not-configured';

export default function CareersForm() {
  const { t } = useLocale();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('cv');

    if (!(file instanceof File) || !file.size) {
      setStatus('error');
      setMessage(t.common.required);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setStatus('error');
      setMessage(t.careersPage.fileHint);
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/careers', { method: 'POST', body: formData, signal: AbortSignal.timeout(20000) });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
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
    <form className="formGrid careerForm" onSubmit={submit} encType="multipart/form-data">
      <label><span>{t.careersPage.fields.name} *</span><input name="name" required maxLength={200} autoComplete="name" /></label>
      <label><span>{t.careersPage.fields.email} *</span><input name="email" type="email" required maxLength={254} dir="ltr" autoComplete="email" /></label>
      <label className="formGrid__wide"><span>{t.careersPage.fields.experience} *</span><input name="experience" required maxLength={500} /></label>
      <label className="formGrid__wide fileField">
        <span>{t.careersPage.fields.cv} *</span>
        <input name="cv" type="file" required accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        <small>{t.careersPage.fileHint}</small>
      </label>
      <label className="formGrid__wide"><span>{t.careersPage.fields.bio} *</span><textarea name="bio" rows={6} required maxLength={10000} /></label>
      <div className="formActions formGrid__wide">
        <button className="pill pill--blue" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t.common.sending : t.careersPage.fields.submit}<span><ArrowIcon /></span>
        </button>
        {status === 'not-configured' && <a className="formEmail" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>}
        {message && <p className={`formStatus formStatus--${status}`} role="status">{message}</p>}
      </div>
    </form>
  );
}
