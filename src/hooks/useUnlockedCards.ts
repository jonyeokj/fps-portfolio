'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { useUnlockedCardsStore } from '@/stores/unlockStore';

export const useUnlockedCards = (opts: {
  ids: string[];
  thresholds: Record<string, number>;
}) => {
  const { ids, thresholds } = opts;
  const score = useGameStore((s) => s.score);
  const unlockedMap = useUnlockedCardsStore((s) => s.unlocked);
  const unlock = useUnlockedCardsStore((s) => s.unlock);

  useEffect(() => {
    for (const id of ids) {
      const need = thresholds[id];
      if (need == null) continue;
      if (!unlockedMap[id] && score >= need) {
        unlock(id);
      }
    }
  }, [score, ids.join('|'), thresholds, unlockedMap, unlock]);
};
