import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return base ? { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin'] }, sitemap: `${base}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
