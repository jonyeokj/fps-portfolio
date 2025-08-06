import { useEffect, useState } from 'react';

export const usePointerLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [canLock, setCanLock] = useState(true);

  // Tracks pointer lock state and disables locking briefly after unlock
  useEffect(() => {
    const handleChange = () => {
      const locked = !!document.pointerLockElement;
      setIsLocked(locked);

      // If pointer lock was just released, start a cooldown before allowing lock again
      if (!locked) {
        setCanLock(false);
        setTimeout(() => setCanLock(true), 1000);
      }
    };

    document.addEventListener('pointerlockchange', handleChange);
    return () =>
      document.removeEventListener('pointerlockchange', handleChange);
  }, []);

  return { isLocked, canLock };
};
