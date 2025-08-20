const ResponsiveDisclaimer = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-screen text-wrap text-center gap-1'>
      <div>This website is not supported by phones or tablets.</div>
      <div className='mb-4'>Please run it on a computer instead.</div>
      <div className='text-gray-300'>
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
    </div>
  );
};

export default ResponsiveDisclaimer;
