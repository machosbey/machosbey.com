import { siteUrl } from '@/lib/site-url';
import type { Metadata } from 'next';
import HomePage from '@/components/sections/AurosHomePage';
export const metadata: Metadata = { alternates: siteUrl() ? { canonical: '/' } : undefined };
export default function Page() { return <HomePage />; }
