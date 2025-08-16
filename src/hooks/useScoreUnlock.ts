'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useUnlockStore } from '@/stores/unlockStore';

export const useScoreUnlock = (opts: {
  ids: string[];
  thresholds: Record<string, number>;
}) => {
  const { ids, thresholds } = opts;
  const score = useGameStore((s) => s.score);
  const unlockedMap = useUnlockStore((s) => s.unlocked);
  const unlock = useUnlockStore((s) => s.unlock);

  useEffect(() => {
    for (const id of ids) {
      const need = thresholds[id];
      if (need == null) continue;
      if (!unlockedMap[id] && score >= need) {
        unlock(id);
      }
    }
  }, [score, thresholds, unlockedMap, unlock, ids]);
};
