'use client';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { usePointerStore } from '@/stores/pointerStore';

const INTERACTIVE_LAYER = 1;
const DEFAULT_LAYER = 0;

// Prevents onHit interactions on unlock by changing raycast layers
export const usePointerRaycastGate = () => {
  const isLocked = usePointerStore((s) => s.isLocked);
  const { raycaster } = useThree();

  useEffect(() => {
    // First disable both layers to reset
    raycaster.layers.disable(DEFAULT_LAYER);
    raycaster.layers.disable(INTERACTIVE_LAYER);

    if (isLocked) {
      raycaster.layers.enable(DEFAULT_LAYER);
    } else {
      raycaster.layers.enable(INTERACTIVE_LAYER);
    }
  }, [isLocked, raycaster]);
};
