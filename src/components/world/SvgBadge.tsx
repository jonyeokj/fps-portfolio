'use client';

import * as THREE from 'three';
import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';

type SvgBadgeProps = {
  src: string;
  width: number;
  height?: number;
  position: [number, number, number];
  opacity?: number;
  zBias?: number;
};

const SvgBadge = ({
  src,
  width,
  height,
  position,
  opacity = 1,
  zBias = 0,
}: SvgBadgeProps) => {
  const tex = useTexture(src);

  useMemo(() => {
    if (!tex) return;
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = 'srgb';
    tex.needsUpdate = true;
  }, [tex]);

  const h = height ?? width;

  return (
    <mesh position={[position[0], position[1], position[2] + zBias]}>
      <planeGeometry args={[width, h]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={opacity}
        toneMapped={false}
      />
    </mesh>
  );
}

export default SvgBadge;