const Controls = () => {
  return (
    <div className='absolute bottom-4 left-4 z-50'>
      <div className='flex flex-col rounded-lg border border-white bg-black/80 p-4 text-left text-white'>
        <div className='mb-2 text-xl font-semibold'>Controls</div>
        <ul className='space-y-1 text-xl text-gray-300'>
          <li className='flex items-center gap-3'>
            <kbd className='w-16 rounded border px-1 text-center'>MB1</kbd>
            <span>Shoot</span>
          </li>
          <li className='flex items-center gap-3'>
            <kbd className='w-16 rounded border px-1 text-center'>Esc</kbd>
            <span>Release Cursor</span>
          </li>
          <li className='flex items-center gap-3'>
            <kbd className='w-16 rounded border px-1 text-center'>U</kbd>
            <span>Unlock Everything</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Controls;
