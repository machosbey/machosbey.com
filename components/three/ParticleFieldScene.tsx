'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type Shape = 'sphere' | 'browser' | 'phone' | 'network' | 'graph' | 'blocks' | 'connected';
type P = [number, number, number];

function seeded(i: number) {
  const x = Math.sin(i * 999.91) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function jitter(i: number, amount = 0.014) {
  return (seeded(i * 31 + 17) - 0.5) * amount;
}

function line(ax: number, ay: number, bx: number, by: number, t: number, i: number, z = 0): P {
  return [
    lerp(ax, bx, t) + jitter(i, 0.016),
    lerp(ay, by, t) + jitter(i + 7, 0.016),
    z + jitter(i + 13, 0.028),
  ];
}

function rectEdge(cx: number, cy: number, width: number, height: number, u: number, i: number): P {
  const p = u * 4;
  const side = Math.min(3, Math.floor(p));
  const t = p - side;

  if (side === 0) return line(cx - width / 2, cy + height / 2, cx + width / 2, cy + height / 2, t, i);
  if (side === 1) return line(cx + width / 2, cy + height / 2, cx + width / 2, cy - height / 2, t, i);
  if (side === 2) return line(cx + width / 2, cy - height / 2, cx - width / 2, cy - height / 2, t, i);
  return line(cx - width / 2, cy - height / 2, cx - width / 2, cy + height / 2, t, i);
}

function filledRect(cx: number, cy: number, width: number, height: number, u: number, v: number, i: number): P {
  return [
    cx + (u - 0.5) * width + jitter(i, 0.012),
    cy + (v - 0.5) * height + jitter(i + 3, 0.012),
    jitter(i + 9, 0.035),
  ];
}

function circle(cx: number, cy: number, radius: number, u: number, i: number): P {
  const a = u * Math.PI * 2;
  return [
    cx + Math.cos(a) * radius + jitter(i, 0.012),
    cy + Math.sin(a) * radius + jitter(i + 5, 0.012),
    jitter(i + 11, 0.025),
  ];
}

function arc(cx: number, cy: number, radius: number, start: number, end: number, u: number, i: number): P {
  const a = lerp(start, end, u);
  return [
    cx + Math.cos(a) * radius + jitter(i, 0.012),
    cy + Math.sin(a) * radius + jitter(i + 5, 0.012),
    jitter(i + 11, 0.025),
  ];
}

function servicePoint(shape: Exclude<Shape, 'sphere'>, i: number): P {
  const u = seeded(i * 7 + 1);
  const v = seeded(i * 7 + 2);
  const band = i % 16;

  // 01 — WEBSITE: unmistakable browser window + top chrome + simple UI blocks.
  if (shape === 'browser') {
    if (band <= 6) return rectEdge(0, 0, 1.48, 1.02, u, i);
    if (band === 7 || band === 8) return line(-0.74, 0.33, 0.74, 0.33, u, i);
    if (band === 9) return circle(-0.57, 0.48, 0.035, u, i);
    if (band === 10) return circle(-0.46, 0.48, 0.035, u, i);
    if (band === 11) return circle(-0.35, 0.48, 0.035, u, i);
    if (band === 12) return filledRect(-0.31, -0.03, 0.55, 0.38, u, v, i);
    if (band === 13) return filledRect(0.35, 0.09, 0.42, 0.14, u, v, i);
    if (band === 14) return filledRect(0.35, -0.15, 0.42, 0.08, u, v, i);
    return filledRect(0.23, -0.33, 0.66, 0.055, u, v, i);
  }

  // 02 — APPLICATION: phone silhouette + speaker + four app tiles + gesture bar.
  if (shape === 'phone') {
    if (band <= 6) return rectEdge(0, 0, 0.9, 1.62, u, i);
    if (band === 7) return line(-0.13, 0.67, 0.13, 0.67, u, i);
    if (band === 8 || band === 9) return filledRect(-0.18, 0.22, 0.22, 0.22, u, v, i);
    if (band === 10 || band === 11) return filledRect(0.18, 0.22, 0.22, 0.22, u, v, i);
    if (band === 12) return filledRect(-0.18, -0.16, 0.22, 0.22, u, v, i);
    if (band === 13) return filledRect(0.18, -0.16, 0.22, 0.22, u, v, i);
    if (band === 14) return line(-0.16, -0.67, 0.16, -0.67, u, i);
    return circle(0, -0.67, 0.028, u, i);
  }

  // 03 — DIGITAL MARKETING: compact megaphone + handle + clean broadcast waves.
  if (shape === 'network') {
    if (band <= 3) {
      const edges = [
        [-0.62, 0.22, 0.18, 0.54],
        [-0.62, -0.22, 0.18, -0.54],
        [-0.62, 0.22, -0.62, -0.22],
        [0.18, 0.54, 0.18, -0.54],
      ] as const;
      const e = edges[band];
      return line(e[0], e[1], e[2], e[3], u, i);
    }
    if (band === 4 || band === 5) {
      const x = -0.58 + u * 0.69;
      const t = (x + 0.58) / 0.69;
      return [x + jitter(i, 0.012), (v - 0.5) * (0.22 + t * 0.7), jitter(i + 4, 0.03)];
    }
    if (band === 6 || band === 7) return circle(-0.66, 0, 0.17, u, i);
    if (band === 8) return line(-0.5, -0.22, -0.35, -0.6, u, i);
    if (band === 9 || band === 10) return arc(0.18, 0, 0.48, -0.75, 0.75, u, i);
    if (band === 11 || band === 12) return arc(0.18, 0, 0.72, -0.72, 0.72, u, i);
    if (band === 13 || band === 14) return arc(0.18, 0, 0.94, -0.68, 0.68, u, i);
    return circle(-0.66, 0, 0.045, u, i);
  }

  // 04 — MARKET ANALYSIS: baseline + four solid bars + clear rising trend arrow.
  if (shape === 'graph') {
    if (band === 0) return line(-0.72, -0.63, -0.72, 0.62, u, i);
    if (band === 1) return line(-0.72, -0.63, 0.76, -0.63, u, i);

    const bars = [
      { x: -0.45, h: 0.34 },
      { x: -0.12, h: 0.58 },
      { x: 0.21, h: 0.84 },
      { x: 0.54, h: 1.12 },
    ];

    if (band >= 2 && band <= 9) {
      const bar = bars[Math.floor((band - 2) / 2)];
      return filledRect(bar.x, -0.63 + bar.h / 2, 0.2, bar.h, u, v, i);
    }

    if (band === 10) return line(-0.55, -0.16, -0.17, 0.02, u, i);
    if (band === 11) return line(-0.17, 0.02, 0.16, 0.3, u, i);
    if (band === 12) return line(0.16, 0.3, 0.6, 0.66, u, i);
    if (band === 13) return line(0.6, 0.66, 0.46, 0.63, u, i);
    if (band === 14) return line(0.6, 0.66, 0.55, 0.5, u, i);
    return circle(0.6, 0.66, 0.035, u, i);
  }

  // 05 — COMPANY STRUCTURE: clean org chart, one leader + three departments + three lower nodes.
  if (shape === 'blocks') {
    if (band <= 2) return rectEdge(0, 0.58, 0.4, 0.2, u, i);
    if (band === 3 || band === 4) return rectEdge(-0.52, 0.02, 0.32, 0.18, u, i);
    if (band === 5 || band === 6) return rectEdge(0, 0.02, 0.32, 0.18, u, i);
    if (band === 7 || band === 8) return rectEdge(0.52, 0.02, 0.32, 0.18, u, i);
    if (band === 9) return line(0, 0.48, 0, 0.24, u, i);
    if (band === 10) return line(-0.52, 0.24, 0.52, 0.24, u, i);
    if (band === 11) return line(-0.52, 0.24, -0.52, 0.11, u, i);
    if (band === 12) return line(0, 0.24, 0, 0.11, u, i);
    if (band === 13) return line(0.52, 0.24, 0.52, 0.11, u, i);
    if (band === 14) return rectEdge(-0.28, -0.5, 0.26, 0.16, u, i);
    return rectEdge(0.28, -0.5, 0.26, 0.16, u, i);
  }

  // 06 — DIGITAL TRANSFORMATION: central digital hub + four connected systems.
  // This is intentionally symmetric and icon-like so it reads instantly.
  if (band <= 3) return circle(0, 0, 0.27, u, i);
  if (band === 4 || band === 5) return rectEdge(-0.68, 0.42, 0.34, 0.2, u, i);
  if (band === 6 || band === 7) return rectEdge(0.68, 0.42, 0.34, 0.2, u, i);
  if (band === 8 || band === 9) return rectEdge(-0.68, -0.42, 0.34, 0.2, u, i);
  if (band === 10 || band === 11) return rectEdge(0.68, -0.42, 0.34, 0.2, u, i);
  if (band === 12) return line(-0.48, 0.31, -0.19, 0.12, u, i);
  if (band === 13) return line(0.48, 0.31, 0.19, 0.12, u, i);
  if (band === 14) return line(-0.48, -0.31, -0.19, -0.12, u, i);
  return line(0.48, -0.31, 0.19, -0.12, u, i);
}

function pointFor(shape: Shape, i: number): P {
  if (shape !== 'sphere') { const p=servicePoint(shape,i); return [p[0],p[1],p[2]+(seeded(i*19)-.5)*.13]; }

  const u = seeded(i * 7 + 1);
  const v = seeded(i * 7 + 2);
  const w = seeded(i * 7 + 3);
  const phi = Math.acos(2 * u - 1);
  const theta = Math.PI * 2 * v;
  const r = 0.86 + (w - 0.5) * 0.18;

  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

function Cloud({
  shape = 'sphere',
  count = 16000,
  compact = false,
  reduced = false,
  onReady,
}: {
  shape?: Shape;
  count?: number;
  compact?: boolean;
  reduced?: boolean;
  onReady?: (ready: boolean) => void;
}) {
  const mouse = useRef({x:0,y:0});
  useEffect(()=>{if(compact||reduced)return; const move=(e:PointerEvent)=>{mouse.current={x:e.clientX/window.innerWidth-.5,y:e.clientY/window.innerHeight-.5}}; window.addEventListener('pointermove',move,{passive:true});return()=>window.removeEventListener('pointermove',move);},[compact,reduced]);
  const paintedFrames = useRef(0);
  useEffect(() => () => { onReady?.(false); }, [onReady]);
  const points = useRef<THREE.Points>(null);
  const current = useRef<Shape>(shape);
  const morphing = useRef(false);
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => { invalidate(); }, [shape, invalidate]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const position = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const white = new THREE.Color('#FFFFFF');
    const electric = new THREE.Color('#3E8BFF');
    const soft = new THREE.Color('#7DBBFF');

    for (let i = 0; i < count; i++) {
      const p = pointFor(shape, i);
      position.set(p, i * 3);
      target.set(p, i * 3);

      const pick = seeded(i * 13 + 9);
      const c = pick < 0.08 ? white : pick < 0.6 ? electric : soft;
      const intensity = 0.84 + seeded(i * 17 + 11) * 0.16;
      colors[i * 3] = c.r * intensity;
      colors[i * 3 + 1] = c.g * intensity;
      colors[i * 3 + 2] = c.b * intensity;
    }

    g.setAttribute('position', new THREE.BufferAttribute(position, 3));
    g.setAttribute('target', new THREE.BufferAttribute(target, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    if (paintedFrames.current < 2 && ++paintedFrames.current === 2) onReady?.(true);
    if (!points.current) return;

    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    const target = geometry.getAttribute('target') as THREE.BufferAttribute;

    if (current.current !== shape) {
      current.current = shape;
      morphing.current = true;
      for (let i = 0; i < count; i++) {
        const p = pointFor(shape, i);
        target.setXYZ(i, p[0], p[1], p[2]);
      }
      target.needsUpdate = true;
    }

    if (morphing.current) {
    // Frame-rate independent morph. Fast enough to feel responsive, slow enough to read.
    const alpha = reduced ? 1 : 1 - Math.exp(-delta * 5.2);
    let moving = false;

    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const tx = target.getX(i);
      const ty = target.getY(i);
      const tz = target.getZ(i);

      if (Math.abs(x - tx) + Math.abs(y - ty) + Math.abs(z - tz) > 0.001) moving = true;

      pos.setXYZ(
        i,
        THREE.MathUtils.lerp(x, tx, alpha),
        THREE.MathUtils.lerp(y, ty, alpha),
        THREE.MathUtils.lerp(z, tz, alpha),
      );
    }

    pos.needsUpdate = true;
    morphing.current = moving && !reduced;
    }

    if (reduced) return;
    if (compact) {
      // Keep service icons front-facing and legible. Only a tiny breathing motion.
      points.current.rotation.set(.045, Math.sin(state.clock.elapsedTime*.22)*.14, 0);
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.006;
      points.current.scale.setScalar(s);
    } else {
      points.current.rotation.y += delta * 0.075;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.07;
      points.current.rotation.y += mouse.current.x * delta * .04;
      points.current.rotation.x += mouse.current.y * .025;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={compact ? 0.009 : 0.011}
        vertexColors
        transparent
        opacity={compact ? 0.78 : 0.78}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}

function Fallback() {
  // The parent keeps the matching transparent artwork visible until a frame is painted.
  return null;
}
class ParticleBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <Fallback /> : this.props.children; }
}

export default function ParticleField({ shape = 'sphere', compact = false, onReady }: { shape?: Shape; compact?: boolean; onReady?: (ready: boolean) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    setMobile(window.matchMedia('(max-width: 768px)').matches);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    setSupported(Boolean(gl));
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '150px' });
    if (host.current) observer.observe(host.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return (
    <div ref={host} style={{ width: '100%', height: '100%' }} aria-hidden="true">
    <ParticleBoundary>
    {supported && visible ? <Canvas events={() => ({ enabled: false, priority: 0 })}
      onCreated={({gl}) => { gl.domElement.addEventListener('webglcontextlost', () => { onReady?.(false); setSupported(false); }, {once:true}); }}
      dpr={mobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, compact ? 3.35 : 3.2], fov: compact ? 39 : 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      frameloop={visible && !reduced ? 'always' : 'demand'}
      fallback={<Fallback />}
    >
      <Cloud shape={shape} count={mobile ? (compact ? 4200 : 6000) : (compact ? 12000 : 16000)} compact={compact} reduced={reduced} onReady={onReady} />
    </Canvas> : <Fallback />}
    </ParticleBoundary>
    </div>
  );
}


