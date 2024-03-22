import React from 'react';
import Link from 'next/link';
import { PersonSchema, Prettify } from '@/types';
import ProfileImage from './ProfileImage';

type Props = Prettify<
  Pick<PersonSchema, '_id' | 'name' | 'slug' | 'gender' | 'profileImage'> & {
    character?: string;
    style?: React.CSSProperties;
  }
>;

const CastCard = ({ _id, name, slug, gender, profileImage, character, style }: Props) => {
  return (
    <Link href={`/person/${slug}-${_id}`} className='flex w-full justify-center text-center'>
      <div className=' w-full'>
        <ProfileImage src={profileImage} gender={gender} alt={name} style={style} />
        <h3 className=' mt-2 text-sm font-medium break-words'>{name}</h3>
        {character && <p className=' text-xs'>{character}</p>}
      </div>
    </Link>
  );
};

export default CastCard;
