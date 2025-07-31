'use client';

import React, { ReactNode } from 'react';

export const UI = ({ children }: { children: ReactNode }) => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen z-[100] flex'>
      {children}
    </div>
  );
};
