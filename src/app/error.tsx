'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  return (
    <main className='flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]'>
      <h1 className='text-9xl font-extrabold tracking-widest text-white'>404</h1>
      <div className='absolute rotate-12 rounded bg-primary px-2 text-sm'>Page Not Found</div>
      <button className='mt-5'>
        <a className='group relative inline-block text-sm font-medium text-primary focus:outline-none focus:ring active:text-orange-500'>
          <span className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-primary transition-transform group-hover:translate-x-0 group-hover:translate-y-0' />
          <span
            className='relative block border border-current bg-[#1A2238] px-8 py-3'
            onClick={() => {
              router.push('/');
            }}
          >
            Go Home
          </span>
        </a>
      </button>
    </main>
  );
}
