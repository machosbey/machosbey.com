import catalog from '@/data/cms/catalog.json';
import { PROJECTS_KEY, validateProjects } from './projects';
export { catalog };
export type Content = Record<string, string>;
export const defaults: Content = Object.fromEntries(catalog.map(f => [f.key, f.value]));
export function imageUrl(value: string) {
  if(value === '' || /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(value))return true;
  try {const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false}
}
export function validateContent(value: unknown): Content {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('محتوى غير صالح');
  const result: Content = {};
  for (const field of catalog) {
    const text = (value as Content)[field.key];
    if (typeof text !== 'string' || text.length > 20000) throw new Error('قيمة غير صالحة: ' + field.label);
    if (field.kind === 'image' && !imageUrl(text)) throw new Error('رابط الصورة غير صالح');
    if (field.kind === 'url' && text && (!/^https:\/\//.test(text)||!imageUrl(text))) throw new Error('أدخل رابط https صحيحاً');
    if (field.kind === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) throw new Error('البريد الإلكتروني غير صالح');
    result[field.key] = text;
  }
  if (Object.hasOwn(value,PROJECTS_KEY)) {
    const raw=(value as Content)[PROJECTS_KEY];
    if(typeof raw!=='string')throw new Error('قائمة الأعمال غير صالحة');
    result[PROJECTS_KEY]=validateProjects(raw,imageUrl);
  }
  if (Buffer.byteLength(JSON.stringify(result)) > 1500000) throw new Error('المحتوى أكبر من الحد المسموح');
  return result;
}
