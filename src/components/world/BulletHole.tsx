'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type BulletHoleProps = {
  position: [number, number, number];
  normal: [number, number, number];
  onExpire: () => void;
};

const BulletHole = ({ position, normal, onExpire }: BulletHoleProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(1);
  const fadeDuration = 3;
  const startTime = useRef<number>(performance.now());

  useFrame(() => {
    const elapsed = (performance.now() - startTime.current) / 1000;
    const newOpacity = Math.max(1 - elapsed / fadeDuration, 0);
    setOpacity(newOpacity);
    if (ref.current) {
      (ref.current.material as THREE.MeshBasicMaterial).opacity = newOpacity;
    }
    if (elapsed >= fadeDuration) onExpire();
  });

  useEffect(() => {
    if (!ref.current) return;

    const mesh = ref.current;
    const surfaceNormal = new THREE.Vector3(...normal);
    const target = new THREE.Vector3().addVectors(mesh.position, surfaceNormal);
    mesh.lookAt(target); // Face the bullet hole toward the wall's normal

    // Slight offset to avoid clipping
    mesh.position.set(...position).add(surfaceNormal.multiplyScalar(0.01));
  }, [position, normal]);

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.05, 32]} />
      <meshBasicMaterial
        color='white'
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default BulletHole;
