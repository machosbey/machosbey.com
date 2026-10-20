'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useContent } from './ContentProvider';
import { dictionaries, type Locale } from '@/data/i18n';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof dictionaries)['AR'];
  rtl: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = 'machos-bey-locale';

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { content } = useContent();
  const [locale, setLocaleState] = useState<Locale>('AR');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && Object.hasOwn(dictionaries, saved)) setLocaleState(saved as Locale);
    } catch { /* Storage may be disabled; the default language remains usable. */ }
  }, []);

  const setLocale = (next: Locale) => {
    if (!Object.hasOwn(dictionaries, next)) return;
    setLocaleState(next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  const rtl = locale === 'AR';
  const t = useMemo(() => {
    const result = structuredClone(dictionaries[locale]);
    for (const [key,value] of Object.entries(content)) {
      if (!key.startsWith(locale+'.')) continue;
      const parts=key.slice(3).split('.');
      let cursor: any=result;
      for(const part of parts.slice(0,-1)) { if(!Object.hasOwn(cursor,part)){cursor=null;break} cursor=cursor[part]; }
      if(cursor && Object.hasOwn(cursor,parts[parts.length-1])) cursor[parts[parts.length-1]]=value;
    }
    return result as (typeof dictionaries)['AR'];
  },[locale,content]);

  useEffect(() => {
    document.documentElement.lang = locale.toLowerCase();
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';

  }, [locale, rtl]);

  const value = useMemo(() => ({ locale, setLocale, t, rtl }), [locale, t, rtl]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}
