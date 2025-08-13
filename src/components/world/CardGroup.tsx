'use client';

import { useEffect, useState } from 'react';
import Card from './Card';

type Item = {
  width?: number;
  height?: number;
  depth?: number;
  header?: string;
  date?: string;
  subtext?: string[];
};

type Props = {
  items: Item[]; // 1..5
  radiusX?: number;
  radiusZ?: number;
  y?: number;
  centerZ?: number;
};

export default function CardGroup({
  items,
  radiusX = 3,
  radiusZ = 1,
  y = 0,
  centerZ = 2,
}: Props) {
  const list = items.slice(0, 5);
  const n = list.length;
  const [offset, setOffset] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    if (n === 0) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setOffset((prev) => (prev - 1 + n) % n);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setOffset((prev) => (prev + 1) % n);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [n]);

  if (n === 0) return null;

  const step = (2 * Math.PI) / n;

  return (
    <group>
      {list.map((it, i) => {
        const angle = ((i - offset) * step) % (2 * Math.PI);
        const x = Math.sin(angle) * radiusX;
        const z = centerZ - Math.cos(angle) * radiusZ;

        return (
          <group
            key={it.header ?? i}
            position={[x, y, -z]}
            rotation={[0, 0, 0]}
          >
            <Card {...it} />
          </group>
        );
      })}
    </group>
  );
}
