import { create } from 'zustand';

type GameState = {
  score: number;
  gameStarted: boolean;
  incrementScore: () => void;
  resetScore: () => void;
  startGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  gameStarted: false,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  resetScore: () => set({ score: 0 }),
  startGame: () => set({ gameStarted: true }),
}));
