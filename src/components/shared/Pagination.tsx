'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Pagination as NextUIPagination } from '@nextui-org/react';
import { cn } from '@/lib/utils';

type Props = {
  page: string;
  totalPages: number;
  className?: string;
};

const Pagination = ({ page, totalPages, className }: Props) => {
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
        className={cn('mt-4 overflow-x-auto flex-center', className)}
        onChange={(page) => {
          router.push(`${pathname}?page=${page}`);
        }}
      />
    )
  );
};

export default Pagination;
