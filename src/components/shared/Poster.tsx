'use client';

import Image from 'next/image';
import { TMDB_IMAGE_SIZES, BASE64_POSTER } from '@/constants';
import { cn, tmdbImageSrc } from '@/lib/utils';

type Props = {
  src: string | undefined;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
};

const Poster = ({ src, alt, className, style, size = 'sm' }: Props) => {
  const imageSize = TMDB_IMAGE_SIZES.poster[size];

  return (
    <Image
      className={cn(
        ' pointer-events-none select-none overflow-hidden aspect-poster',
        size === 'lg' ? 'rounded-lg' : 'rounded',
        className
      )}
      style={style}
      src={tmdbImageSrc(src, imageSize)}
      alt={alt || 'No image'}
      priority
      width={size === 'sm' ? 300 : size === 'md' ? 440 : 600}
      height={size === 'sm' ? 450 : size === 'md' ? 660 : 900}
      placeholder='blur'
      blurDataURL={BASE64_POSTER}
      onError={(e) => (e.currentTarget.src = BASE64_POSTER)}
    />
  );
};

export default Poster;
