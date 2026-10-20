'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useDesktopVisual } from './useDesktopVisual';
type Props = { shape?: 'sphere' | 'browser' | 'phone' | 'network' | 'graph' | 'blocks' | 'connected'; compact?: boolean };

const Scene=dynamic(()=>import('./ParticleFieldScene'),{ssr:false});
const serviceShapes = ['browser', 'phone', 'network', 'graph', 'blocks', 'connected'] as const;
export default function ParticleField(props:Props){
 const {ref,active}=useDesktopVisual();
 const [painted,setPainted]=useState(false);
 useEffect(()=>{if(!active)setPainted(false);},[active]);
 return <div ref={ref} className={`particleVisual visualHost ${active && painted ? 'visualReady' : ''}`} aria-hidden="true">
 {props.compact ? <div className="visualFrames">{serviceShapes.map(shape => <img key={shape} className="visualStatic" src={`/visuals/${shape}-depth.png`} alt="" loading="eager" style={{opacity: props.shape === shape ? 1 : 0}} />)}</div> : <img className="visualStatic" src={`/visuals/${props.shape || 'sphere'}-depth.png`} alt="" />}
 {active && <div className="visualScene"><Scene {...props} onReady={setPainted}/></div>}
 </div>;
}
