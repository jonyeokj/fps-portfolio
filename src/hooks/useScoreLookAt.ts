'use client';

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/stores/gameStore';

export const useScoreLookAt = () => {
  const { camera } = useThree();
  const score = useGameStore((state) => state.score);
  const targetQuat = useRef<THREE.Quaternion | null>(null);

  useEffect(() => {
    if (score % 10 === 0 && score > 0) {
      const target = new THREE.Vector3(-5, 3, 0);

      // Compute desired quaternion
      const lookAtMatrix = new THREE.Matrix4();
      lookAtMatrix.lookAt(camera.position, target, camera.up);
      const quat = new THREE.Quaternion().setFromRotationMatrix(lookAtMatrix);

      targetQuat.current = quat;
    }
  }, [score, camera]);

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
