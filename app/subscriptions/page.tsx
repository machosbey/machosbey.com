import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site-url';
import { publishedContent } from '@/lib/cms/store';
import SubscriptionsPage from '@/components/sections/SubscriptionsPage';
export async function generateMetadata():Promise<Metadata> {
 const content=await publishedContent();
 return { title:content['seo.subscriptions.title'],description:content['seo.subscriptions.description'],alternates:siteUrl()?{canonical:'/subscriptions'}:undefined };
}
export default function Page(){return <SubscriptionsPage/>;}