'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Test() {
  const sp = useSearchParams();
  console.log('test useSearchParams: ', sp.get('name'));

  return (
    <div>
      <h1>Test</h1>
      <Link
        href={{
          pathname: '/test/blog',
          query: { id: Math.round(Math.random() * 10) }
        }}
        className='button'>
        blog
      </Link>

      <Link
        href={{
          pathname: '/test/slug',
          query: { id: 10 }
        }}
        className='button'>
        Slug Dynamic
      </Link>

      <Link
        href={{
          pathname: '/test/notFound',
          query: { id: 10 }
        }}
        className='button'>
        Slug Dynamic
      </Link>
    </div>
  );
}
