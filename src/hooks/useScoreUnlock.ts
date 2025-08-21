'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useUnlockStore } from '@/stores/unlockStore';
import { Experience } from '@/constants';

export const useScoreUnlock = (items: Experience[]) => {
  const score = useGameStore((s) => s.score);
  const unlockedMap = useUnlockStore((s) => s.unlocked);
  const unlock = useUnlockStore((s) => s.unlock);

  useEffect(() => {
    for (const { id, threshold } of items) {
      if (threshold == null) continue;
      if (!unlockedMap[id] && score >= threshold) {
        unlock(id);
      }
    }
  }, [score, items, unlockedMap, unlock]);
};
