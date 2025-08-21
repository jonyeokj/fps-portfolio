'use client';

import { useHelpStore } from '@/stores/helpStore';

const Help = () => {
  const showHelp = useHelpStore((s) => s.showHelp);

  return (
    <div
      className={`absolute bottom-4 right-4 z-50 text-lg transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        showHelp ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex flex-col w-lg text-white bg-black/80 rounded-lg p-4 border border-white text-left gap-2'>
        <div>Welcome to my FPS Portfolio!</div>
        <div>
          Connect with me on{' '}
          <a
            href='https://www.linkedin.com/in/jonyeokj/'
            target='_blank'
            className='text-blue-400 hover:text-blue-600 hover:underline transition-colors duration-200'
          >
            LinkedIn
          </a>{' '}
          or{' '}
          <a
            href='https://github.com/jonyeokj'
            target='_blank'
            className='text-blue-400 hover:text-blue-600 hover:underline transition-colors duration-200'
          >
            GitHub
          </a>
          .
        </div>
        <div className='mb-1'>
          Shoot the targets to explore my experiences and projects.
        </div>

        <div className='text-center text-base text-gray-300'>
          <div>
            [Press <code>U</code> to unlock everything instantly.]
          </div>
          <div>
            [Press <code>Space</code> to close this panel.]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
