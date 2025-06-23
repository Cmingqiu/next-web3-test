import React from 'react';

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-[10px]'>
      <h1>account page</h1>
      <hr />
      <br />
      {children}
    </div>
  );
}
