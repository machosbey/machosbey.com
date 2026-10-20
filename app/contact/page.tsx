import { siteUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import ContactPage from '@/components/sections/ContactPage';

import { publishedContent } from '@/lib/cms/store';
export async function generateMetadata():Promise<Metadata> { const content=await publishedContent(); return {
  alternates: siteUrl() ? { canonical: '/contact' } : undefined,
  title: content['seo.contact.title'],
  description: content['seo.contact.description'],
}; }
export default function Page() { return <ContactPage deliveryEnabled={Boolean(process.env.CONTACT_WEBHOOK_URL?.match(/^https?:\/\//))} />; }

