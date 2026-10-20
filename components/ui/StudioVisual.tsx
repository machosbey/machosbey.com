"use client";
import {useId} from 'react';
type Kind='sphere'|'browser'|'phone'|'network'|'graph'|'blocks'|'connected';
export default function StudioVisual({kind='sphere'}:{kind?:Kind}){
 const id=useId().replace(/:/g,'');
 const fill=`url(#${id}-face)`,edge=`url(#${id}-edge)`;
 return <svg className={`studioVisual studioVisual--${kind}`} viewBox="0 0 600 460" fill="none" aria-hidden="true">
 <defs><linearGradient id={id+'-face'} x1="140" y1="90" x2="450" y2="370" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff"/><stop offset=".5" stopColor="#edf6ff"/><stop offset="1" stopColor="#a6cfff"/></linearGradient><linearGradient id={id+'-edge'} x1="120" y1="100" x2="470" y2="360" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#7dbbff"/></linearGradient></defs>
 <g strokeLinecap="round" strokeLinejoin="round">
 {kind==='browser'?<>
  <rect x="94" y="89" width="412" height="282" rx="20" fill={fill} stroke={edge} strokeWidth="3"/>
  <path d="M95 139H505" stroke="#82b8e9" strokeWidth="2"/>
  <g fill="#398bdd">{[120,139,158].map(x=><circle key={x} cx={x} cy="114" r="4"/>)}</g>
  <rect x="119" y="163" width="239" height="181" rx="10" fill="#cbe4ff"/>
  <path d="m199 217-32 29 32 29m76-58 32 29-32 29m-26-76-25 94" stroke="#226ba7" strokeWidth="5"/>
  <rect x="378" y="165" width="103" height="82" rx="9" fill="#7dbbff"/>
  <path d="M380 272h96m-96 23h76m-76 23h86" stroke="#4686b8" strokeWidth="4"/>
 </>:kind==='phone'?<>
  <rect x="199" y="51" width="202" height="359" rx="32" fill={fill} stroke={edge} strokeWidth="3"/>
  <rect x="263" y="70" width="74" height="8" rx="4" fill="#669dcc"/>
  <rect x="220" y="113" width="160" height="153" rx="18" fill="#7dbbff"/>
  <circle cx="300" cy="188" r="40" fill="#edf6ff"/>
  <path d="m280 187 15 15 28-32" stroke="#226ba7" strokeWidth="5"/>
  <path d="M225 295h150m-150 24h115m-115 24h135" stroke="#4686b8" strokeWidth="4"/>
  <path d="M272 386h56" stroke="#4686b8" strokeWidth="5"/>
 </>:kind==='sphere'?<g stroke={edge} strokeWidth="2.5">
  <circle cx="300" cy="230" r="162" fill="#7dbbff" fillOpacity=".16"/>
  <ellipse cx="300" cy="230" rx="80" ry="162"/><ellipse cx="300" cy="230" rx="134" ry="162"/>
  <path d="M139 230h322M159 151c85 30 197 30 282 0M159 309c85-30 197-30 282 0"/>
  <ellipse cx="300" cy="230" rx="203" ry="72" transform="rotate(-30 300 230)" stroke="#ffffff"/>
  <circle cx="468" cy="130" r="8" fill="#ffffff" stroke="none"/>
 </g>:kind==='network'?<>
  <g stroke="#a6cfff" strokeWidth="3"><path d="M300 140V87m0 233v53M210 230h-53m233 0h53M236 166l-37-37m165 165 37 37m-165-37-37 37m165-165 37-37"/></g>
  <rect x="214" y="144" width="172" height="172" rx="30" fill={fill} stroke={edge} strokeWidth="3"/>
  <rect x="241" y="171" width="118" height="118" rx="20" fill="#7dbbff"/>
  <path d="M270 248v-36a15 15 0 0 1 30 0v36m-30-15h30m26-36v51" stroke="#226ba7" strokeWidth="5"/>
  {[ [300,78],[300,382],[148,230],[452,230] ].map(([x,y])=><circle key={x+','+y} cx={x} cy={y} r="8" fill="#edf6ff"/>)}
 </>:kind==='graph'?<>
  <path d="M124 101v263h366" stroke="#cbe4ff" strokeWidth="3"/>
  {[110,170,224].map((h,i)=><rect key={h} x={170+i*100} y={352-h} width="61" height={h} rx="10" fill={fill}/>)}
  <path d="m164 203 98-69 85 13 120-75m-41 1h42v42" stroke="#7dbbff" strokeWidth="5"/>
 </>:<>
  <path d="M175 133h125v195h125M175 328h125V133h125" stroke="#9ccfff" strokeWidth="3"/>
  {[[115,95],[377,95],[115,290],[377,290]].map(([x,y])=><rect key={x+','+y} x={x} y={y} width="108" height="76" rx="14" fill={fill} stroke={edge} strokeWidth="2.5"/>)}
  <rect x="258" y="188" width="84" height="84" rx="18" fill="#7dbbff" stroke="#edf6ff" strokeWidth="3"/>
  <g stroke="#226ba7" strokeWidth="3.5"><path d="m282 230 12 12 25-27M149 133h38m244-17v34m-17-17h34m-287 194 9 9 19-22"/><circle cx="431" cy="328" r="15"/></g>
 </>}
 </g></svg>;
}
