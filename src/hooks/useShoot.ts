'use client';

import { useCallback, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePointerStore } from '@/stores/pointerStore';

type BulletHole = {
  id: string;
  position: [number, number, number];
  normal: [number, number, number];
};

export const useShoot = () => {
  const { camera, scene, gl } = useThree();
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  const isLocked = usePointerStore((s) => s.isLocked);

  // Helper function to check if an object or its parents are marked as non-shootable
  const isNonShootable = (obj: THREE.Object3D | null): boolean => {
    let cur: THREE.Object3D | null = obj;
    while (cur) {
      if (cur.userData && cur.userData.nonShootable) return true;
      cur = cur.parent ?? null;
    }
    return false;
  };

  // Raycast from camera center and add a bullet hole to the first non-ball object hit
  const shoot = useCallback(() => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    const hit = intersects.find((h) => !isNonShootable(h.object));

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
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (!isLocked) return;
      shoot();
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [gl, shoot, isLocked]);

  const expireHole = (id: string) =>
    setBulletHoles((prev) => prev.filter((b) => b.id !== id));

  return { bulletHoles, expireHole };
};
