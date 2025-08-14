'use client';

import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, Environment } from '@react-three/drei';
import ExperienceWorld from '@/components/world/ExperienceWorld';
import { UI } from '@/components/ui/UI';
import Score from '@/components/ui/Score';
import { Crosshair } from '@/components/ui/Crosshair';
import { PointerLockOverlay } from '@/components/ui/PointerLockOverlay';
import { usePointerStore } from '@/stores/pointerStore';

const Page = () => {
  const isLocked = usePointerStore((s) => s.isLocked);
  const canLock = usePointerStore((s) => s.canLock);
  const setLocked = usePointerStore((s) => s.setLocked);

  return (
    <main className='h-screen w-screen bg-black'>
      {!isLocked && <PointerLockOverlay disabled={!canLock} />}
      <UI>
        {isLocked && <Crosshair />}
        <Score />
      </UI>

      <Canvas
        camera={{ fov: 75, position: [0, 2, 0], rotation: [0, Math.PI, 0] }}
        shadows
      >
        <Sky sunPosition={[10, 40, -10]} turbidity={6} rayleigh={1.5} />
        <Environment preset='city' environmentIntensity={0.7} />
        <ambientLight intensity={0.08} />
        <hemisphereLight args={['#ffffff', '#b0b0b0', 0.1]} />
        <directionalLight
          position={[10, 40, -10]}
          intensity={1.3}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-10}
          shadow-camera-near={0.5}
          shadow-camera-far={150}
          shadow-normalBias={0.04}
        />
        <ExperienceWorld />
        <PointerLockControls
          selector='canvas'
          onLock={() => setLocked(true)}
          onUnlock={() => setLocked(false)}
        />
      </Canvas>
    </main>
  );
};

export default Page;
