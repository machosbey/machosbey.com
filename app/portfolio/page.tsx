import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site-url';
import { publishedContent } from '@/lib/cms/store';
import PortfolioPage from '@/components/sections/PortfolioPage';
export async function generateMetadata():Promise<Metadata> {
 const content=await publishedContent();
 return { title:content['seo.portfolio.title'],description:content['seo.portfolio.description'],alternates:siteUrl()?{canonical:'/portfolio'}:undefined };
}
export default function Page(){return <PortfolioPage/>;}