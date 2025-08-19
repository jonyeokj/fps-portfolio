'use client';

import { useEffect } from 'react';
import { useUnlockStore } from '@/stores/unlockStore';

export const useUnlockHotkey = () => {
  const unlockAll = useUnlockStore((s) => s.unlockAll);
  const setHotkeyPressed = useUnlockStore((s) => s.setHotkeyPressed);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyU') {
        setHotkeyPressed(true);
        unlockAll();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [unlockAll]);
};
