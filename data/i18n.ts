import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
export const dictionaries = { AR: ar, EN: en };
export type Locale = keyof typeof dictionaries;
