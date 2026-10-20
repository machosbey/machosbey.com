import Admin from '@/components/admin/Admin';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'لوحة إدارة الموقع',robots:{index:false,follow:false}};
export default function Page(){return <Admin/>}
