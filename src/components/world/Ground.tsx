import { usePlane } from '@react-three/cannon';

type GroundProps = {
  color?: string;
};

const Ground = ({ color = 'white' }: GroundProps) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Ground;
