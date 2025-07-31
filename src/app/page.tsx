'use client';

import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import ExperienceWorld from '@/components/world/ExperienceWorld';
import { UI } from '@/components/ui/UI';
import Score from '@/components/ui/Score';
import { Crosshair } from '@/components/ui/Crosshair';

const Page = () => {
  return (
    <main className='h-screen w-screen bg-black'>
      <UI>
        <Crosshair />
        <Score />
      </UI>
      <Canvas camera={{ fov: 75, position: [0, 2, 5] }}>
        <ambientLight intensity={0.4} />
        <hemisphereLight args={['#ffffff', '#444444', 0.3]} />
        <directionalLight position={[5, 10, 2]} intensity={1} castShadow />
        <ExperienceWorld />
        <PointerLockControls />
      </Canvas>
    </main>
  );
};

export default Page;
