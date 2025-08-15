// src/stores/unlockStore.ts
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UnlockState = {
  unlocked: Record<string, boolean>;
  unlock: (id: string) => void;
  reset: () => void;
};

export const useUnlockedCardsStore = create<UnlockState>()(
  persist(
    (set) => ({
      unlocked: {},
      unlock: (id) => set((s) => ({ unlocked: { ...s.unlocked, [id]: true } })),
      reset: () => set({ unlocked: {} }),
    }),
    { name: 'unlocked-cards' },
  ),
);
