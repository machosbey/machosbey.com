import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';
import {publishedContent} from '@/lib/cms/store';
import {readProjects} from '@/lib/cms/projects';
export const dynamic='force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  if (!base) return [];
  return ['', '/about', '/portfolio', '/subscriptions', '/contact',...readProjects(await publishedContent()).map(p=>'/portfolio/'+p.id)].map(route => ({ url: `${base}${route}`, changeFrequency: route ? 'monthly' : 'weekly', priority: route ? 0.7 : 1 }));
}
