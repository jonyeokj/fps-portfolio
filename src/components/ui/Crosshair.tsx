'use client';

const Crosshair = () => {
  return (
    <div className='pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      {/* Top line */}
      <div className='absolute top-[-6px] left-1/2 w-0.5 h-[4px] bg-black -translate-x-1/2' />
      {/* Bottom line */}
      <div className='absolute bottom-[-6px] left-1/2 w-0.5 h-[4px] bg-black -translate-x-1/2' />
      {/* Left line */}
      <div className='absolute left-[-6px] top-1/2 h-0.5 w-[4px] bg-black -translate-y-1/2' />
      {/* Right line */}
      <div className='absolute right-[-6px] top-1/2 h-0.5 w-[4px] bg-black -translate-y-1/2' />
    </div>
  );
};

export default Crosshair;
