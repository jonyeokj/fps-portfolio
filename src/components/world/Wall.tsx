'use client';

import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';

type WallProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  text?: string;
};

const Wall = ({
  position,
  rotation = [0, 0, 0],
  color = '#8e8e8e',
  text,
}: WallProps) => {
  const width = 1; // thickness
  const height = 10; // height
  const depth = 30; // width/length

  const [ref] = useBox(() => ({
    args: [width, height, depth],
    position,
    rotation,
  }));

  const isLeftOrBack =
    (position[0] < 0 && rotation[1] === 0) || // left wall
    (position[2] > 0 && rotation[1] !== 0); // back wall

  const textPosition: [number, number, number] = isLeftOrBack
    ? [1, 0, 0]
    : [-1, 0, 0];

  const textRotation: [number, number, number] = isLeftOrBack
    ? [0, Math.PI / 2, 0]
    : [0, -Math.PI / 2, 0];

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {text && (
        <Text
          position={textPosition}
          rotation={textRotation}
          fontSize={1}
          color='white'
          anchorX='center'
          anchorY='middle'
        >
          {text}
        </Text>
      )}
    </group>
  );
};

export default Wall;
