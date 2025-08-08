'use client';

import { useCallback, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

type BulletHole = {
  id: string;
  position: [number, number, number];
  normal: [number, number, number];
};

export const useShoot = () => {
  const { camera, scene, gl } = useThree();
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);

  // Raycast from camera center and add a bullet hole to the first non-ball object hit
  const shoot = useCallback(() => {
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
  }, [camera, scene]);

  // Set up global click listener for shooting
  useEffect(() => {
    const canvas = gl.domElement;
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (document.pointerLockElement !== canvas) return;
      shoot();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    return () => canvas.removeEventListener('mousedown', onMouseDown);
  }, [gl, shoot]);

  const expireHole = (id: string) =>
    setBulletHoles((prev) => prev.filter((b) => b.id !== id));

  return { bulletHoles, expireHole };
};
