import Link from 'next/link';
import { hexToRgba, lightenColor } from '@/lib/utils';
import { MovieSchema } from '@/types';
import Poster from './Poster';

const MovieCard = ({ _id, name, slug, poster, backdropColor }: MovieSchema) => {
  return (
    <Link
      href={`/album/${slug}-${_id}`}
      style={{ backgroundColor: lightenColor(backdropColor) }}
      className=' max-w-full overflow-hidden rounded-lg hover:text-foreground'
    >
      <div className=' group'>
        <div className=' relative overflow-hidden'>
          <Poster
            src={poster}
            size='md'
            className=' w-full rounded-none transition-all duration-300 group-hover:scale-110'
          />
          <div
            className=' invisible absolute inset-0 flex items-center justify-center group-hover:visible'
            style={{ backgroundColor: hexToRgba(backdropColor, 0.8) }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-20 w-20 text-primary'
            >
              <path
                fillRule='evenodd'
                d='M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <div className=' flex-center min-h-[60px] p-2'>
          <span className=' line-clamp-2 text-center font-medium'>{name}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
