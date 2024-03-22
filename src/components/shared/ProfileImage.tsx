'use client';

import Image from 'next/image';
import { TMDB_IMAGE_SIZES, Gender, BASE64_FEMALE, BASE64_MALE } from '@/constants';
import { cn, tmdbImageSrc } from '@/lib/utils';

type Props = {
  src: string | undefined;
  gender: Gender;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg';
};

const ProfileImage = ({ src, gender, alt, className, style, size = 'sm' }: Props) => {
  const imageSize = TMDB_IMAGE_SIZES.face[size];

  const defaultUrl = gender === Gender.Female ? BASE64_FEMALE : BASE64_MALE;

  return (
    <Image
      className={cn(' pointer-events-none aspect-square select-none overflow-hidden rounded-full', className)}
      style={style}
      src={tmdbImageSrc(src, imageSize) || defaultUrl}
      alt={alt || 'No image'}
      priority
      width={size === 'sm' ? 235 : size === 'md' ? 375 : 470}
      height={size === 'sm' ? 235 : size === 'md' ? 375 : 470}
      placeholder='blur'
      blurDataURL={defaultUrl}
      onError={(e) => (e.currentTarget.src = defaultUrl)}
    />
  );
};

export default ProfileImage;
