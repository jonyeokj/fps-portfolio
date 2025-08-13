'use client';

import { Canvas } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
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

      <Canvas camera={{ fov: 75, position: [0, 2, 0] }} shadows>
        <ambientLight intensity={0.5} />
        <hemisphereLight args={['#ffffff', '#444444', 0.3]} />
        <directionalLight position={[5, 10, 2]} intensity={1} castShadow />
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
