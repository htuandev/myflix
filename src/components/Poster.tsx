'use client';

import { SyntheticEvent, useRef } from 'react';
import Image from 'next/image';
import noImage from '@/assets/no-image.svg';
import { TMDB_IMAGE_SIZES, NO_IMAGE_BASE64 } from '@/constants';
import { cn, tmdbImageSrc } from '@/lib/utils';

type Props = {
  src: string | undefined;
  alt?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function Poster({ src, alt, className, size = 'sm' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const imageSize = TMDB_IMAGE_SIZES.poster[size];

  const noImagePadding = size === 'lg' ? '2rem' : size === 'md' ? '1rem' : '0.5rem';

  const onError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = noImage;
    e.currentTarget.style.padding = noImagePadding;
  };

  const onLoad = () => {
    if (ref.current) {
      ref.current.classList.add('loaded');
    }
  };

  const imgProps = { src: tmdbImageSrc(src, imageSize), alt, onError, onLoad };

  return (
    <div
      ref={ref}
      className={cn(
        ' load-img bg-slate-800 flex-center pointer-events-none select-none overflow-hidden rounded-full aspect-poster before:animate-skeleton',
        size === 'lg' ? 'rounded-lg' : 'rounded',
        className
      )}
    >
      <Image
        src={tmdbImageSrc(src, imageSize)}
        alt={alt || 'No image'}
        style={{
          padding: imgProps.src === noImage ? noImagePadding : undefined
        }}
        priority
        width={size === 'sm' ? 300 : size === 'md' ? 440 : 600}
        height={size === 'sm' ? 450 : size === 'md' ? 660 : 900}
        placeholder='blur'
        blurDataURL={NO_IMAGE_BASE64}
      />
    </div>
  );
}
