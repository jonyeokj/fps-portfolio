'use client';
import { create } from 'zustand';
import { EXPERIENCES, PROJECTS } from '@/constants';


type UnlockState = {
  unlocked: Record<string, boolean>;
  unlock: (id: string) => void;
  reset: () => void;
};

const initializeUnlocks = () => {
  const allItems = [...EXPERIENCES, ...PROJECTS];
  return allItems.reduce<Record<string, boolean>>((acc, item) => {
    acc[item.id] = item.threshold == null; // unlock if no threshold
    return acc;
  }, {});
};

export const useUnlockStore = create<UnlockState>((set) => ({
  unlocked: initializeUnlocks(),
  unlock: (id) =>
    set((s) => ({
      unlocked: { ...s.unlocked, [id]: true },
    })),
  reset: () => set({ unlocked: initializeUnlocks() }),
}));
