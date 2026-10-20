import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site-url';
import './variables.css';
import './auros-blue.css';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import SmoothScroll from '@/components/motion/SmoothScroll';

import { ContentProvider } from '@/components/providers/ContentProvider';
import { publishedContent } from '@/lib/cms/store';
export const dynamic = 'force-dynamic';
const base = siteUrl();
export async function generateMetadata(): Promise<Metadata> {
  const content = await publishedContent();
  return {
  metadataBase: base ? new URL(base) : undefined,
  robots: base ? { index: true, follow: true } : { index: false, follow: false },
  applicationName: content['EN.brand'],
  title: content['AR.meta.siteTitle'],
  description: content['AR.meta.siteDescription'],
};

}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await publishedContent();
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ContentProvider content={content}><LocaleProvider>
          <SmoothScroll />
          {children}
        </LocaleProvider></ContentProvider>
      </body>
    </html>
  );
}


