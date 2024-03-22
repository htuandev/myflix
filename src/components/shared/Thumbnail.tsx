'use client';

import React from 'react';
import Image from 'next/image';
import { BASE64_THUMBNAIL, TMDB_IMAGE_SIZES } from '@/constants';
import { cn, tmdbImageSrc } from '@/lib/utils';

type Props = {
  src: string | undefined;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
};

const Thumbnail = ({ src, alt, className, style, size = 'sm' }: Props) => {
  const imageSize = TMDB_IMAGE_SIZES.thumbnail[size];

  return (
    <Image
      className={cn(
        ' pointer-events-none aspect-video select-none overflow-hidden',
        size === 'lg' ? 'rounded-lg' : 'rounded',
        className
      )}
      style={style}
      src={tmdbImageSrc(src, imageSize) || BASE64_THUMBNAIL}
      alt={alt || 'No image'}
      priority
      width={size === 'sm' ? 320 : size === 'md' ? 640 : 1280}
      height={size === 'sm' ? 180 : size === 'md' ? 360 : 720}
      placeholder='blur'
      blurDataURL={BASE64_THUMBNAIL}
      onError={(e) => (e.currentTarget.src = BASE64_THUMBNAIL)}
    />
  );
};

export default Thumbnail;
