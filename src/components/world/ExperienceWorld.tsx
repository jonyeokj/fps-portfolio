'use client';

import { Physics } from '@react-three/cannon';
import Ground from './Ground';
// import Roof from './Roof';
import Wall from './Wall';
import BallManager from './BallManager';

const ExperienceWorld = () => {
  return (
    <Physics gravity={[0, -9.8, 0]}>
      <Ground />
      <Wall position={[-15, 5, 0]} color='grey' />
      <Wall position={[15, 5, 0]} color='grey' />
      <Wall
        position={[0, 5, -15]}
        rotation={[0, Math.PI / 2, 0]}
        color='grey'
      />
      <Wall position={[0, 5, 15]} rotation={[0, Math.PI / 2, 0]} />
      {/* <Roof /> */}
      <BallManager />
    </Physics>
  );
};

export default ExperienceWorld;
