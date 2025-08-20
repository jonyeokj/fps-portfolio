'use client';

import { useEffect } from 'react';
import { useHelpStore } from '@/stores/helpStore';

export const useHelpHotkey = () => {
  const disableHelp = useHelpStore((s) => s.disableHelp);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        disableHelp();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [disableHelp]);
};
