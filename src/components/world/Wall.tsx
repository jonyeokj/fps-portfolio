import { useBox } from '@react-three/cannon';

type WallProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
};

const Wall = ({
  position,
  rotation = [0, 0, 0],
  color = '#8e8e8e',
}: WallProps) => {
  const width = 1; // thickness
  const height = 10; // height
  const depth = 30; // width/length

  const [ref] = useBox(() => ({
    args: [width, height, depth],
    position,
    rotation,
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Wall;
