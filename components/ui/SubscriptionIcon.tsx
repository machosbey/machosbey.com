'use client';
import { useContent } from '@/components/providers/ContentProvider';

import styles from './SubscriptionIcon.module.css';

type Point = { x: number; y: number };
function createPoints(index: number) {
  const points: Point[] = [];
  const line = (x1: number, y1: number, x2: number, y2: number) => {
    const steps = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 5));
    for (let i = 0; i <= steps; i++)
      points.push({
        x: x1 + ((x2 - x1) * i) / steps,
        y: y1 + ((y2 - y1) * i) / steps,
      });
  };
  const ellipse = (cx: number, cy: number, rx: number, ry: number) => {
    const steps = Math.ceil((Math.PI * 2 * Math.max(rx, ry)) / 5);
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      points.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
    }
  };
  const box = (x: number, y: number, w: number, h: number) => {
    line(x, y, x + w, y);
    line(x + w, y, x + w, y + h);
    line(x + w, y + h, x, y + h);
    line(x, y + h, x, y);
  };
  if (index === 0) {
    box(58, 94, 304, 226);
    line(58, 135, 362, 135);
    [79, 94, 109].forEach((x) => ellipse(x, 115, 2, 2));
    box(82, 158, 108, 131);
    line(215, 169, 333, 169);
    line(215, 190, 309, 190);
    box(215, 234, 102, 38);
    line(108, 216, 129, 239);
    line(129, 239, 164, 195);
  } else if (index === 1) {
    box(127, 45, 166, 330);
    box(141, 81, 138, 258);
    line(185, 63, 235, 63);
    ellipse(210, 355, 6, 6);
    box(156, 102, 108, 104);
    line(176, 154, 201, 176);
    line(201, 176, 246, 128);
    for (let i = 0; i < 4; i++)
      box(156 + (i % 2) * 61, 226 + Math.floor(i / 2) * 53, 47, 37);
  } else if (index === 2) {
    for (let y = 150; y <= 254; y += 52) {
      line(63, y, 210, y - 80);
      line(210, y - 80, 357, y);
      line(357, y, 210, y + 80);
      line(210, y + 80, 63, y);
    }
    line(178, 115, 151, 139);
    line(151, 139, 178, 158);
    line(242, 115, 269, 139);
    line(269, 139, 242, 158);
    line(218, 106, 201, 168);
  } else if (index === 3) {
    box(112, 112, 196, 196);
    box(140, 140, 140, 140);
    for (let n = 136; n < 300; n += 28) {
      line(n, 77, n, 112);
      line(n, 308, n, 343);
      line(77, n, 112, n);
      line(308, n, 343, n);
    }
    const nodes = [
      [172, 174],
      [246, 172],
      [210, 210],
      [171, 247],
      [248, 246],
    ];
    nodes.forEach(([x, y]) => {
      ellipse(x, y, 9, 9);
      line(x, y, 210, 210);
    });
  } else {
    ellipse(210, 190, 127, 127);
    ellipse(210, 190, 65, 127);
    ellipse(210, 190, 104, 127);
    ellipse(210, 190, 127, 44);
    ellipse(210, 190, 116, 85);
    line(83, 190, 337, 190);
    box(112, 299, 231, 49);
    line(148, 324, 288, 324);
    ellipse(131, 324, 4, 4);
    line(303, 315, 313, 324);
    line(313, 324, 303, 333);
  }
  return points;
}
// Batch the particles into four paths instead of thousands of DOM circles.
const dot = (p: Point, radius: number, offset = 0) => {
  const x = (p.x + offset).toFixed(3),
    y = (p.y + offset).toFixed(3);
  return `M${x} ${y}m-${radius} 0a${radius} ${radius} 0 1 0 ${radius * 2} 0a${radius} ${radius} 0 1 0 -${radius * 2} 0`;
};
const shapes = Array.from({ length: 5 }, (_, i) => {
  const points = createPoints(i);
  return {
    depth: points.map((p) => dot(p, 1.1)).join(''),
    body: points
      .filter((_, j) => j % 5 !== 0)
      .map((p) => dot(p, 1.35))
      .join(''),
    light: points
      .filter((_, j) => j % 5 === 0)
      .map((p) => dot(p, 1.8))
      .join(''),
    shimmer: points
      .filter((_, j) => j % 5 === 0)
      .map((p) => dot(p, 1.25, -1))
      .join(''),
  };
});
export default function SubscriptionIcon({ index }: { index: number }) {
  const {copy}=useContent();
  const image=copy('media.service.'+index);
  if(image)return <img className={`subscriptionIcon ${styles.art}`} src={image} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>;
  const shape = shapes[index] ?? shapes[0];
  return (
    <svg
      className={`subscriptionIcon ${styles.art}`}
      viewBox="0 0 420 420"
      fill="none"
      aria-hidden="true"
    >
      <g>
        <path
          d={shape.depth}
          opacity=".12"
          transform="translate(8 10)"
          fill="#05223c"
        />
        <path d={shape.body} opacity=".9" fill="#05223c" />
        <path d={shape.light} fill="#05223c" />
        <path d={shape.shimmer} opacity=".75" fill="#05223c" />
      </g>
    </svg>
  );
}
