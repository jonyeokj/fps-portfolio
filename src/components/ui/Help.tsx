'use client';

import { useHelpStore } from '@/stores/helpStore';

const Help = () => {
  const showHelp = useHelpStore((s) => s.showHelp);

  return (
    <div className='absolute bottom-4 right-4 z-50 items-center text-lg shadow-xl'>
      <div
        className={[
          'flex flex-col w-lg text-white bg-black/80 rounded-lg p-4 border-[1px] border-[white] text-left gap-2',
          'transition-all duration-200 ease-out',
          'motion-reduce:transition-none',
          showHelp
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1 pointer-events-none',
        ].join(' ')}
      >
        <div>Welcome to my FPS Portfolio!</div>
        <div>
          I&apos;m Jonathan Yeo, and this project was built using React and
          three.js, inspired by my love for FPS games.
        </div>
        <div>
          Connect with me on{' '}
          <a
            href='https://www.linkedin.com/in/jonyeokj/'
            target='_blank'
            className='text-blue-400 hover:text-blue-600 hover:underline transition-colors duration-200'
          >
            LinkedIn
          </a>
          .
        </div>
        <div className='mb-1'>
          Shoot the targets to explore my experiences and projects.
        </div>

        <div className='text-center text-sm text-gray-300'>
          <div>Press `U` to unlock everything instantly.</div>
          <div>[Press Space to dismiss]</div>
        </div>
      </div>
    </div>
  );
};

export default Help;
