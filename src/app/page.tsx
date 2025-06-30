'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <div className='flex gap-4 items-center flex-col sm:flex-row  flex-wrap'>
          <Link
            href={'/user/zhangsan'}
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
            rel='noopener noreferrer'>
            /user/zhangsan
          </Link>

          <Link href='/account'>/account</Link>
          <div
            onClick={() => {
              router.push('/user');
            }}
            className='button'
            rel='noopener noreferrer'>
            /user
          </div>

          <div
            onClick={() => {
              router.push('/transaction');
            }}
            className='button'
            rel='noopener noreferrer'>
            发送交易
          </div>

          <div
            onClick={() => {
              router.push('/contract');
            }}
            className='button'
            rel='noopener noreferrer'>
            合约交互
          </div>

          <div
            onClick={() => {
              router.push('/rainbowkit');
            }}
            className='button'
            rel='noopener noreferrer'>
            rainbowkit
          </div>

          <button
            className='cursor-pointer px-8 py-2 rounded-xl border border-solid border-orange-700'
            onClick={() => router.push('/test?name=test')}>
            test
          </button>

          <div
            onClick={() => {
              router.push('/ant-web3');
            }}
            className='button'
            rel='noopener noreferrer'>
            ant-web3
          </div>

          <div
            onClick={() => {
              router.push('/wagmi');
            }}
            className='button'
            rel='noopener noreferrer'>
            wagmi
          </div>
        </div>
      </main>
    </div>
  );
}
