'use client';

import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Wall from './Wall';
import BallManager from './BallManager';
import BulletHole from './BulletHole';
import CardGroup from './CardGroup';
import Header from './Header';
import { usePointerRaycastGate } from '@/hooks/usePointerRaycastGate';
import { useShoot } from '@/hooks/useShoot';
import { useScoreLookAt } from '@/hooks/useScoreLookAt';
import { useScoreUnlock } from '@/hooks/useScoreUnlock';
import { useUnlockHotkey } from '@/hooks/useUnlockHotkey';
import { EXPERIENCES, PROJECTS } from '@/constants';
import { useHelpStore } from '@/stores/helpStore';

const ExperienceWorld = () => {
  const { bulletHoles, expireHole } = useShoot();
  usePointerRaycastGate();
  useScoreLookAt();
  useScoreUnlock(EXPERIENCES);
  useScoreUnlock(PROJECTS);
  useUnlockHotkey();

  const enableHelp = useHelpStore((s) => s.enableHelp);

  return (
    <>
      <Physics gravity={[0, -9.8, 0]}>
        <Ground />

        {/* Front */}
        <Wall
          position={[0, 5, 24]}
          rotation={[0, Math.PI / 2, 0]}
          color='white'
          height={13}
          depth={35}
        />
        <BallManager />

        {/* Left */}
        <group position={[5, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <group position={[0, 1.65, 0]}>
            <Header text='Projects' />
          </group>
          <CardGroup items={PROJECTS} />
        </group>

        {/* Right  */}
        <group position={[-5, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
          <group position={[0, 1.65, 0]}>
            <Header text='Experiences' />
          </group>
          <CardGroup items={EXPERIENCES} />
        </group>

        {/* Back  */}
        <group position={[0, 2.8, -5]}>
          <Header
            text='Info'
            width={1}
            nonShootable={false}
            onHit={enableHelp}
          />
        </group>
      </Physics>

      {bulletHoles.map((hole) => (
        <BulletHole
          key={hole.id}
          position={hole.position}
          normal={hole.normal}
          onExpire={() => expireHole(hole.id)}
        />
      ))}
    </>
  );
};

export default ExperienceWorld;
