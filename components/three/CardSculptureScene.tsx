'use client';

import { Canvas } from '@react-three/fiber';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';

export type SculptureKind = 'layers' | 'workflow' | 'links' | 'target' | 'growth' | 'team';
const shades = ['#236cdd', '#448df1', '#79b6ff'];
let webglAvailable: boolean | undefined;
function supportsWebgl() {
  if (webglAvailable !== undefined) return webglAvailable;
  try {
    const context = document.createElement('canvas').getContext('webgl2');
    webglAvailable = Boolean(context);
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch { webglAvailable = false; }
  return webglAvailable;
}

function Block({ position = [0, 0, 0], size = [1, 1, .2], color = shades[0] }: {
  position?: [number, number, number]; size?: [number, number, number]; color?: string;
}) {
  return <mesh position={position}>
    <boxGeometry args={size} />
    <meshStandardMaterial color={color} roughness={.3} metalness={.12} />
  </mesh>;
}

function Ring({ position = [0, 0, 0], rotation = [0, 0, 0], radius = .52, color = shades[0] }: {
  position?: [number, number, number]; rotation?: [number, number, number]; radius?: number; color?: string;
}) {
  return <mesh position={position} rotation={rotation}>
    <torusGeometry args={[radius, .105, 12, 48]} />
    <meshStandardMaterial color={color} roughness={.25} metalness={.15} />
  </mesh>;
}

function Model({ kind }: { kind: SculptureKind }) {
  if (kind === 'layers') return <group rotation={[0, -.25, 0]}>
    {[0, 1, 2].map(i => <Block key={i} position={[(i - 1) * .38, (i - 1) * .23, (i - 1) * -.18]} size={[.85, 1.05, .14]} color={shades[i]} />)}
  </group>;
  if (kind === 'workflow') return <group>
    <Block position={[-.63, .43, 0]} size={[.58, .38, .25]} />
    <Block position={[.63, .43, 0]} size={[.58, .38, .25]} color={shades[1]} />
    <Block position={[.63, -.43, 0]} size={[.58, .38, .25]} color={shades[2]} />
    <Block position={[0, .43, 0]} size={[.7, .065, .07]} />
    <Block position={[0, 0, 0]} size={[.065, .86, .07]} />
    <Block position={[.18, -.43, 0]} size={[.36, .065, .07]} />
  </group>;
  if (kind === 'links') return <group rotation={[0, 0, -.45]}>
    <Ring position={[-.35, 0, 0]} rotation={[0, .4, 0]} />
    <Ring position={[.35, 0, 0]} rotation={[.85, -.35, 0]} color={shades[1]} />
  </group>;
  if (kind === 'target') return <group>
    <Ring radius={.67} />
    <Ring radius={.36} color={shades[1]} />
    <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.12, .12, .2, 24]} /><meshStandardMaterial color={shades[2]} /></mesh>
    <group position={[.42, .42, .3]} rotation={[0, 0, -.75]}>
      <Block size={[.07, .85, .07]} color={shades[0]} />
      <mesh position={[0, .48, 0]}><coneGeometry args={[.16, .3, 4]} /><meshStandardMaterial color={shades[0]} roughness={.35} /></mesh>
    </group>
  </group>;
  if (kind === 'growth') return <group>
    {[.45, .86, 1.35].map((height, i) => <Block key={i} size={[.35, height, .4]} position={[(i - 1) * .52, height / 2 - .65, 0]} color={shades[2 - i]} />)}
  </group>;
  return <group>
    {[-.6, 0, .6].map((x, i) => <group key={i} position={[x, i === 1 ? .16 : 0, i === 1 ? .17 : -.12]}>
      <mesh position={[0, .36, 0]}><sphereGeometry args={[.19, 20, 16]} /><meshStandardMaterial color={shades[i]} roughness={.3} /></mesh>
      <mesh position={[0, -.2, 0]}><capsuleGeometry args={[.19, .28, 6, 16]} /><meshStandardMaterial color={shades[i]} roughness={.3} /></mesh>
    </group>)}
  </group>;
}

function Fallback({ kind }: { kind: SculptureKind }) {
  return <div className={`sculptureFallback sculptureFallback--${kind}`}><i /><i /><i /></div>;
}

class Boundary extends Component<{ children: ReactNode; kind: SculptureKind }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback kind={this.props.kind} /> : this.props.children; }
}

/** Actual lit 3D geometry; rendered on demand, mounted only near the viewport. */
export default function CardSculpture({ kind = 'layers' }: { kind?: SculptureKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className="cardSculpture" aria-hidden="true">
    <Boundary kind={kind}>
      {visible && supportsWebgl() ? <Canvas events={() => ({ enabled: false, priority: 0 })} orthographic camera={{ position: [2.2, 1.5, 5], zoom: 46 }} dpr={[1, 1.5]} frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<Fallback kind={kind} />}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 5, 6]} intensity={2} />
        <directionalLight position={[-4, 1, -2]} intensity={1.5} color="#84baff" />
        <Model kind={kind} />
      </Canvas> : <Fallback kind={kind} />}
    </Boundary>
  </div>;
}


