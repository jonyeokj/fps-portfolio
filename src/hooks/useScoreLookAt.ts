'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUnlockStore } from '@/stores/unlockStore';
import { EXPERIENCES, PROJECTS } from '@/constants';

export const useScoreLookAt = () => {
  const { camera } = useThree();
  const unlockedMap = useUnlockStore((s) => s.unlocked);
  const targetQuat = useRef<THREE.Quaternion | null>(null);
  const prevUnlockedRef = useRef<Map<string, boolean>>(new Map());

  const experienceIds = EXPERIENCES.map((e) => e.id);
  const projectIds = PROJECTS.map((p) => p.id);

  // Compute desired quaternion
  const computeQuat = useCallback(
    (target: THREE.Vector3) => {
      const lookAtMatrix = new THREE.Matrix4();
      lookAtMatrix.lookAt(camera.position, target, camera.up);
      return new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);
    },
    [camera]
  );

  useEffect(() => {
    // Prevent lookAt on initialization
    if (prevUnlockedRef.current.size === 0) {
      for (const [id, isUnlocked] of Object.entries(unlockedMap)) {
        prevUnlockedRef.current.set(id, isUnlocked);
      }
      return;
    }

    // Compare previous and current unlocks
    for (const [id, isUnlocked] of Object.entries(unlockedMap)) {
      const prev = prevUnlockedRef.current.get(id) ?? false;

      if (!prev && isUnlocked) {
        let target: THREE.Vector3 | null = null;

        if (experienceIds.includes(id)) {
          target = new THREE.Vector3(-5, 3, 0);
        } else if (projectIds.includes(id)) {
          target = new THREE.Vector3(5, 3, 0);
        }

        if (target) {
          targetQuat.current = computeQuat(target);
        }
      }

      prevUnlockedRef.current.set(id, isUnlocked);
    }
  }, [unlockedMap, experienceIds, projectIds, computeQuat]);

  useFrame(() => {
    if (targetQuat.current) {
      // Smoothly rotate towards the target quaternion
      camera.quaternion.slerp(targetQuat.current, 0.05);

      if (camera.quaternion.angleTo(targetQuat.current) < 0.01) {
        targetQuat.current = null;
      }
    }
  });
};
