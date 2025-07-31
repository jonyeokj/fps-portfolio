import { useBox } from '@react-three/cannon';

const Roof = () => {
  const [ref] = useBox(() => ({
    args: [30, 1, 30],
    position: [0, 10.5, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[30, 1, 30]} />
      <meshStandardMaterial color='#cccccc' />
    </mesh>
  );
};
export default Roof;
