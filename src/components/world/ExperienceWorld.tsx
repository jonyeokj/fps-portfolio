'use client';

import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Wall from './Wall';
import BallManager from './BallManager';
import BulletHole from './BulletHole';
import { useShoot } from '@/hooks/useShoot';
import { useScoreLookAt } from '@/hooks/useScoreLookAt';
import { EXPERIENCES } from '@/constants';
import CardGroup from './CardGroup';

const ExperienceWorld = () => {
  const { bulletHoles, expireHole } = useShoot();
  useScoreLookAt();

  return (
    <>
      <Physics gravity={[0, -9.8, 0]}>
        <Ground />
        <Wall
          position={[0, 5, -40]}
          rotation={[0, Math.PI / 2, 0]}
          color='white'
          height={27}
          depth={61}
        />
        <BallManager />
        <group position={[5, 3, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <CardGroup items={EXPERIENCES} />
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
