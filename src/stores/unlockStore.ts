'use client';
import { create } from 'zustand';

type UnlockState = {
  unlocked: Record<string, boolean>;
  unlock: (id: string) => void;
  reset: () => void;
};

export const useUnlockStore = create<UnlockState>((set) => ({
  unlocked: {},
  unlock: (id) =>
    set((s) => ({
      unlocked: { ...s.unlocked, [id]: true },
    })),
  reset: () => set({ unlocked: {} }),
}));
