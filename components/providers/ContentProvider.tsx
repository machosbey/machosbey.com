'use client';
import { createContext, useContext, useMemo } from 'react';
import { defaults, type Content } from '@/lib/cms/model';
const Context=createContext<Content>(defaults);
export function ContentProvider({content,children}:{content:Content;children:React.ReactNode}) {
 return <Context.Provider value={content}>{children}</Context.Provider>;
}
export function useContent(){
 const content=useContext(Context);
 return useMemo(()=>({content,copy:(key:string,fallback='')=>key.startsWith('media.')?(content[key]||fallback):(content[key]??fallback),site:{
  name:content['EN.brand']||'Machos Bey',email:content['site.email'],phone:content['site.phone'],
  socials:[{label:'Facebook',href:content['site.facebook']},{label:'Instagram',href:content['site.instagram']}].filter(x=>x.href)
 }}),[content]);
}
