import { ReactNode } from 'react';

export default function WagmiLayout({ children }: { children: ReactNode }) {
  return (
    <div className='p-[10px]'>
      <h1 className='mb-4'>Wagmi</h1>
      {children}
    </div>
  );
}
