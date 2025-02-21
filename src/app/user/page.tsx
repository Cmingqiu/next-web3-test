import { FC } from 'react';

const UserPage: FC<{ name: string }> = ({ name }) => {
  console.log(name);
  return (
    <div>
      <h1>UserPage</h1>
    </div>
  );
};

export default UserPage;
