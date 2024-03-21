'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Pagination as NextUIPagination } from '@nextui-org/react';

type Props = {
  page: string;
  totalPages: number;
};

const Pagination = ({ page, totalPages }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    totalPages > 1 && (
      <NextUIPagination
        initialPage={page ? parseInt(page) : 1}
        total={totalPages}
        isCompact
        showControls
        showShadow
        radius='full'
        className='mt-4 overflow-x-auto'
        onChange={(page) => {
          router.push(`${pathname}?page=${page}`);
        }}
      />
    )
  );
};

export default Pagination;
