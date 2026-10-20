'use client';
import { useContent } from '@/components/providers/ContentProvider';
import { useEffect, useRef } from 'react';
/** Evenly distributed spherical particles. Fixed silhouette, gentle rotation, visibility-aware rendering. */
export default function LiquidOrb({ className = '' }: { className?: string }) {
 const {copy}=useContent();const image=copy('media.orb');
 const host=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  if(image)return;
  const el=host.current,node=canvas.current,ctx=node?.getContext('2d',{alpha:true});
  if(!el||!node||!ctx)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let w=1,h=1,frame=0,visible=false,time=0,previous=0,lastDraw=0;
  const mobile=matchMedia('(max-width: 700px)').matches,count=mobile?1400:3000;
  const random=(i:number)=>{const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n)};
  const particles=Array.from({length:count},(_,i)=>{const a=i*Math.PI*(3-Math.sqrt(5)),b=Math.acos(1-2*(i+.5)/count);return {x:Math.sin(b)*Math.cos(a),y:Math.cos(b),z:Math.sin(b)*Math.sin(a),phase:b*7+a*2,size:.55+random(i*4+2)*.85,color:random(i*4+3)>.79?'#edf6ff':random(i*4+3)>.3?'#7dbbff':'#398bdd'}});
  const draw=(t:number)=>{
   ctx.clearRect(0,0,w,h);
   const radius=Math.min(w,h)*.405*(1+Math.sin(t*.9)*.012),rotation=t*.15,cos=Math.cos(rotation),sin=Math.sin(rotation);
   const tilt=.18+Math.sin(t*.42)*.12,ct=Math.cos(tilt),st=Math.sin(tilt);
   for(const p of particles){
    const {x,y,z}=p;
    const rx=x*cos-z*sin,rz=x*sin+z*cos,ry=y*ct-rz*st,depth=y*st+rz*ct;
    // Orthographic projection retains a complete circular silhouette through every rotation.
    const perspective=1,light=(depth+1)*.5;
    const alpha=.2+light*.62;
    const s=p.size*(.75+light*.35)*(mobile?.85:1);

    ctx.fillStyle=p.color;ctx.globalAlpha=alpha;
    ctx.fillRect(w/2+rx*radius*perspective,h/2+ry*radius*perspective,s,s);
   }
  };
  const resize=()=>{w=el.clientWidth;h=el.clientHeight;const dpr=Math.min(devicePixelRatio,1.5);node.width=Math.round(w*dpr);node.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(time)};
  const tick=(stamp:number)=>{frame=0;if(!visible||document.hidden||media.matches)return;time+=previous?Math.min((stamp-previous)/1000,.05):0;previous=stamp;if(stamp-lastDraw>=1000/30){draw(time);lastDraw=stamp;}frame=requestAnimationFrame(tick)};
  const sync=()=>{cancelAnimationFrame(frame);frame=0;previous=0;if(media.matches)draw(0);else if(visible&&!document.hidden)frame=requestAnimationFrame(tick)};
  const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync()},{rootMargin:'100px'}),sizeObserver=new ResizeObserver(resize);
  resize();observer.observe(el);sizeObserver.observe(el);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();sizeObserver.disconnect();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync)};
 },[image]);
 return <div className={`liquidOrb ${className}`} ref={host} aria-hidden="true">{image?<img src={image} alt="" style={{width:"100%",height:"100%",objectFit:"contain"}}/>:<canvas ref={canvas}/>}</div>;
}
