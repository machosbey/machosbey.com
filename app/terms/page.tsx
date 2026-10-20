import type { Metadata } from 'next';
export const metadata: Metadata = { robots: { index: false, follow: false } };
import LegalPage from '@/components/sections/LegalPage';
export default function Page() { return <LegalPage type="terms" />; }
