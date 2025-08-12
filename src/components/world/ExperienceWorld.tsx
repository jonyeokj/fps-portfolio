'use client';

import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import Ground from './Ground';
import Wall from './Wall';
import BallManager from './BallManager';
import BulletHole from './BulletHole';
import { useShoot } from '@/hooks/useShoot';
import { useScoreLookAt } from '@/hooks/useScoreLookAt';

const ExperienceWorld = () => {
  const { bulletHoles, expireHole } = useShoot();
  useScoreLookAt();

  return (
    <>
      <Physics gravity={[0, -9.8, 0]}>
        <Sky sunPosition={[0, 1, 0]} />
        <Ground />
        <Wall
          position={[0, 5, -20]}
          rotation={[0, Math.PI / 2, 0]}
          color='white'
        />
        <BallManager />
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
