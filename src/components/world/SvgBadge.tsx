'use client';

import { useTexture } from '@react-three/drei';

type SvgBadgeProps = {
  src: string;
  width: number;
  height?: number;
  position: [number, number, number];
  opacity?: number;
  renderOrder?: number;
};

const SvgBadge = ({
  src,
  width,
  height,
  position,
  opacity = 1,
  renderOrder = 0,
}: SvgBadgeProps) => {
  const tex = useTexture(src);

  const h = height ?? width;

  return (
    <mesh position={[position[0], position[1], position[2]]} renderOrder={renderOrder}>
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