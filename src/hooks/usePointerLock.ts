import { useEffect, useRef, useState } from 'react';

export const usePointerLock = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [canLock, setCanLock] = useState(true);
  const elementRef = useRef<HTMLElement | null>(null);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Tracks pointer lock state and disables locking briefly after unlock
  useEffect(() => {
    const handleChange = () => {
      const locked = document.pointerLockElement === elementRef.current;
      setIsLocked(locked);

      // If pointer lock was just released, start a cooldown before allowing lock again
      if (!locked) {
        setCanLock(false);
        if (lockTimeoutRef.current) {
          clearTimeout(lockTimeoutRef.current);
        }
        lockTimeoutRef.current = setTimeout(() => {
          setCanLock(true);
        }, 1000);
      }
    };

    document.addEventListener('pointerlockchange', handleChange);

    // Clean up the listener and any pending timeout when the component unmounts
    return () => {
      document.removeEventListener('pointerlockchange', handleChange);
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  return {
    isLocked,
    canLock,
    elementRef,
  };
};
