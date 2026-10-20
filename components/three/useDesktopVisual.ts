'use client';
import { useEffect, useRef, useState } from 'react';
export function useDesktopVisual() {
 const ref=useRef<HTMLDivElement>(null); const [active,setActive]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: no-preference)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  let visible=false;
  const update=()=>setActive(media.matches && visible && !document.hidden && !connection?.saveData);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});
  if(ref.current)observer.observe(ref.current);
  media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
 },[]);
 return {ref,active};
}
