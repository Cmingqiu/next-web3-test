'use client';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const User: FC = ({}) => {
  const pathname = usePathname();
  return (
    <div>
      <h1>User</h1>
      <h2>pathname: {pathname}</h2>
    </div>
  );
};

export default User;
