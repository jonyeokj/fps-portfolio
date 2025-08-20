import { create } from 'zustand';

type HelpState = {
  showHelp: boolean;
  enableHelp: () => void;
  disableHelp: () => void;
};

export const useHelpStore = create<HelpState>((set) => ({
  showHelp: true,
  enableHelp: () => set(() => ({ showHelp: true })),
  disableHelp: () => set(() => ({ showHelp: false })),
}));
