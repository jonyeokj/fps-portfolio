'use client';

import { useGameStore } from '@/stores/gameStore';

const Score = () => {
  const score = useGameStore((state) => state.score);
  const resetScore = useGameStore((state) => state.resetScore);

  return (
    <div className='absolute top-4 left-4 z-50 flex items-center gap-2 text-xl'>
      <div className='min-w-[80px] text-white bg-black/80 rounded-lg px-4 py-2 text-center'>
        Score: {score}
      </div>
      <button
        onClick={resetScore}
        className='px-4 py-2 rounded-lg bg-black/50 text-white hover:bg-zinc-600'
      >
        Reset
      </button>
    </div>
  );
};

export default Score;
