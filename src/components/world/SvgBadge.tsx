'use client';

import { useTexture } from '@react-three/drei';

type SvgBadgeProps = {
  src: string;
  width: number;
  height?: number;
  position: [number, number, number];
  opacity?: number;
};

const SvgBadge = ({
  src,
  width,
  height,
  position,
  opacity = 1,
}: SvgBadgeProps) => {
  const tex = useTexture(src);

  const h = height ?? width;

  return (
    <mesh position={[position[0], position[1], position[2]]}>
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