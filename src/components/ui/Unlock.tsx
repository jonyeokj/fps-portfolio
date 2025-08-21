'use client';

import { useUnlockStore } from '@/stores/unlockStore';
import { useEffect, useRef, useState } from 'react';

const Unlock = () => {
  const hotkeyPressed = useUnlockStore((s) => s.hotkeyPressed);
  const unlocked = useUnlockStore((s) => s.unlocked);
  const [visible, setVisible] = useState(false);

  const allUnlocked = Object.values(unlocked).every(Boolean);
  const prevAllUnlockedRef = useRef(allUnlocked);

  useEffect(() => {
    if (hotkeyPressed && !prevAllUnlockedRef.current) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }

    prevAllUnlockedRef.current = allUnlocked;
  }, [hotkeyPressed, allUnlocked]);

  return (
    <div
      className={`pointer-events-none z-50 flex items-center justify-center transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className='absolute rounded-lg top-1/12 bg-black/80 text-white px-6 py-4 shadow-xl'>
        <div className='text-2xl'>haha loser</div>
      </div>
    </div>
  );
};

export default Unlock;
