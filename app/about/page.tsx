import { siteUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import AboutPage from '@/components/sections/AboutPage';

import { publishedContent } from '@/lib/cms/store';
export async function generateMetadata():Promise<Metadata> { const content=await publishedContent(); return {
  alternates: siteUrl() ? { canonical: '/about' } : undefined,
  title: content['seo.about.title'],
  description: content['seo.about.description'],
}; }
export default function Page() { return <AboutPage />; }
