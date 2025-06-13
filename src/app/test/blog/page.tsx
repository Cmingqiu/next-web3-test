// 'use client';

// import { useSearchParams } from 'next/navigation';

function promise(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolved');
    }, 3000);
  });
}

export default async function Blog() {
  // const searchParams = useSearchParams();
  // console.log('Blog searchParams: ', searchParams.getAll('id'));

  const data = await promise();
  return (
    <div>
      <h1 className='text-3xl font-semibold'>Blog</h1>

      <div>{data}</div>
    </div>
  );
}
