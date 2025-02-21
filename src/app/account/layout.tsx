import React from 'react';

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>account page</h1>
      <br />
      <hr />
      {children}
    </div>
  );
}
