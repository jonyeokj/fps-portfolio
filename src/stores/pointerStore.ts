import { create } from 'zustand';

const COOLDOWN_MS = 1000;

type PointerStore = {
  isLocked: boolean;
  canLock: boolean;
  cameraGuiding: boolean;
  setLocked: (locked: boolean) => void;
  setCameraGuiding: (guiding: boolean) => void;
};

export const usePointerStore = create<PointerStore>((set) => ({
  isLocked: false,
  canLock: true,
  cameraGuiding: false,

  // Set the pointer lock state and handle cooldown
  setLocked: (locked: boolean) => {
    if (locked) {
      set({ isLocked: true, canLock: true });
    } else {
      set({ isLocked: false, canLock: false });
      setTimeout(() => set({ canLock: true }), COOLDOWN_MS);
    }
  },
  setCameraGuiding: (guiding: boolean) => set({ cameraGuiding: guiding }),
}));
