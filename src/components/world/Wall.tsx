'use client';

import { useBox } from '@react-three/cannon';

type WallProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  width?: number;
  height?: number;
  depth?: number;
};

const Wall = ({
  position,
  rotation = [0, 0, 0],
  color = '#8e8e8e',
  width = 1,
  height = 10,
  depth = 20,
}: WallProps) => {
  const [ref] = useBox(() => ({
    args: [width, height, depth],
    position,
    rotation,
  }));

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Wall;
