import { FC, PropsWithChildren } from 'react';

const TestLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='border border-gray-400 rounded-md  p-4 m-4'>
      <h1>Test Layout</h1>
      {children}
    </div>
  );
};

export default TestLayout;
