'use client';

import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Wall from './Wall';
import BallManager from './BallManager';
import BulletHole from './BulletHole';
import CardGroup from './CardGroup';
import { useShoot } from '@/hooks/useShoot';
import { useScoreLookAt } from '@/hooks/useScoreLookAt';
import { EXPERIENCES, PROJECTS } from '@/constants';
import { useScoreUnlock } from '@/hooks/useScoreUnlock';
import Header from './Header';

const ExperienceWorld = () => {
  const { bulletHoles, expireHole } = useShoot();
  useScoreLookAt();
  useScoreUnlock(EXPERIENCES);
  useScoreUnlock(PROJECTS);

  return (
    <>
      <Physics gravity={[0, -9.8, 0]}>
        <Ground />
        <Wall
          position={[0, 5, 24]}
          rotation={[0, Math.PI / 2, 0]}
          color='white'
          height={13}
          depth={35}
        />
        <BallManager />
        <group position={[-5, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
          <group position={[0, 1.65, 0]}>
            <Header text='Experiences' />
          </group>
          <CardGroup items={EXPERIENCES} />
        </group>
        <group position={[5, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <group position={[0, 1.65, 0]}>
            <Header text='Projects' />
          </group>
          <CardGroup items={PROJECTS} />
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
