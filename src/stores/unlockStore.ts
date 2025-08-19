'use client';
import { create } from 'zustand';
import { EXPERIENCES, PROJECTS } from '@/constants';

type UnlockState = {
  unlocked: Record<string, boolean>;
  unlock: (id: string) => void;
  unlockAll: () => void;
  hotkeyPressed: boolean;
  setHotkeyPressed: (val: boolean) => void;
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
  unlockAll: () =>
    set((s) => ({
      unlocked: Object.fromEntries(
        Object.keys(s.unlocked).map((id) => [id, true]),
      ),
    })),
  hotkeyPressed: false,
  setHotkeyPressed: (val) => set({ hotkeyPressed: val }),
  reset: () => set({ unlocked: initializeUnlocks() }),
}));
