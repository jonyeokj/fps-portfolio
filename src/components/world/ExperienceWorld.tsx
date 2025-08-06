'use client';

import { Physics } from '@react-three/cannon';
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
        <Ground />
        <Wall position={[-15, 5, 0]} color='grey' text='Left' />
        <Wall position={[15, 5, 0]} color='grey' text='Right' />
        <Wall
          position={[0, 5, -15]}
          rotation={[0, Math.PI / 2, 0]}
          color='grey'
          text='Front'
        />
        <Wall
          position={[0, 5, 15]}
          rotation={[0, Math.PI / 2, 0]}
          text='Back'
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
