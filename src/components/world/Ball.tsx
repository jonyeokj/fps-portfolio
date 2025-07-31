'use client';

import { useSphere } from '@react-three/cannon';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type BallProps = {
  position: [number, number, number];
  color?: string;
  id: string;
  onHit: (id: string) => void;
};

const Ball = ({ position, color = 'cyan', id, onHit }: BallProps) => {
  const [ref, api] = useSphere(() => ({
    type: 'Kinematic',
    position,
    args: [0.5],
  }));

  const t = useRef(Math.random() * 100); // Time offset for uniqueness
  const base = useRef<[number, number, number]>(position);

  useFrame((_, delta) => {
    t.current += delta;

    const [baseX, baseY, baseZ] = base.current;

    // Oscillate around base within 0.5 (total movement 1.0)
    const rawX = baseX + Math.sin(t.current + id.length) * 0.5;
    const rawY = baseY + Math.sin(t.current * 0.5) * 0.25;

    // Clamp to wall-safe bounds
    const x = THREE.MathUtils.clamp(rawX, -14, 14);
    const y = THREE.MathUtils.clamp(rawY, 0.5, 9.5);
    const z = baseZ;

    api.position.set(x, y, z);
  });

  const handleClick = () => {
    onHit(id);
  };

  return (
    <mesh ref={ref} onClick={handleClick} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Ball;
