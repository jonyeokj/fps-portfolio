'use client';

import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Physics } from '@react-three/cannon';
import Ground from './Ground';
import Wall from './Wall';
import BallManager from './BallManager';
import BulletHole from './BulletHole';

const ExperienceWorld = () => {
  const { camera, scene } = useThree();
  const [bulletHoles, setBulletHoles] = useState<
    {
      id: string;
      position: [number, number, number];
      normal: [number, number, number];
    }[]
  >([]);

  // Sets up a global click listener that triggers a raycast from the camera on click.
  // If an object is hit, adds a bullet hole decal at the intersection point.
  useEffect(() => {
    const handleClick = () => {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      const hit = intersects[0];
      if (hit && hit.point && hit.face) {
        const id = crypto.randomUUID();

        // Convert face normal to world space
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(
          hit.object.matrixWorld,
        );
        const worldNormal = hit.face.normal
          .clone()
          .applyMatrix3(normalMatrix)
          .normalize();

        setBulletHoles((prev) => [
          ...prev,
          {
            id,
            position: [hit.point.x, hit.point.y, hit.point.z],
            normal: [worldNormal.x, worldNormal.y, worldNormal.z],
          },
        ]);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [camera, scene]);

  return (
    <>
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
        <BallManager />
      </Physics>

      {bulletHoles.map((hole) => (
        <BulletHole
          key={hole.id}
          position={hole.position}
          normal={hole.normal}
          onExpire={() =>
            setBulletHoles((prev) => prev.filter((b) => b.id !== hole.id))
          }
        />
      ))}
    </>
  );
};

export default ExperienceWorld;
