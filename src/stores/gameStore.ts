import { create } from 'zustand';

type GameState = {
  score: number;
  incrementScore: () => void;
  resetScore: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  resetScore: () => set({ score: 0 }),
}));
