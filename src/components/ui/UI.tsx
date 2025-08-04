'use client';

import { ReactNode } from 'react';

export const UI = ({ children }: { children: ReactNode }) => {
  return (
    <div className='absolute pointer-events-none inset-0 z-50 select-none'>
      <div className='pointer-events-auto' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
