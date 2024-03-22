import Link from 'next/link';
import { ContentType, Status } from '@/constants';
import { convertRuntime } from '@/lib/utils';
import { CategorySchema, MovieSchema } from '@/types';

const MovieFacts = (movie: MovieSchema) => {
  const Separator = () => <li className='mx-2 text-base font-normal'>•</li>;

  const { knownAs, runtime, status, type, totalEpisodes, episodes, genres, networks } = movie;

  const facts = [
    knownAs[0] && <li key='knownAs'>{knownAs[0]}</li>,
    runtime && <li key='runtime'>{convertRuntime(runtime)}</li>,
    status !== Status.Trailer && (
      <li key='status'>
        {type.includes(ContentType.Single)
          ? type.includes(ContentType.Vietnamese)
            ? 'Vietnamese Ver.'
            : 'Vietnamese Sub'
          : status === Status.Full
            ? `Full ${totalEpisodes} eps`
            : `Updated to ${episodes}/${totalEpisodes} eps`}
      </li>
    )
  ].filter(Boolean);

  const factsWithSeparator = facts.reduce((acc, fact, index) => {
    index > 0 && acc.push(<Separator key={index} />);
    acc.push(fact);
    return acc;
  }, [] as React.ReactNode[]);

  return (
    <>
      <ul className='flex flex-wrap items-center'>{factsWithSeparator.map((fact) => fact)}</ul>
      <ul className='mt-4 flex flex-wrap gap-2'>
        {(networks as unknown as CategorySchema[]).map(({ _id, name, slug }) => (
          <Link href={`/network/${slug}-${_id}`} key={_id} className=' rounded border-2 border-slate-600 px-2'>
            {name}
          </Link>
        ))}
        {(genres as unknown as CategorySchema[]).map(({ _id, name, slug }) => (
          <Link href={`/the-loai/${slug}-${_id}`} key={_id} className=' rounded border-2 border-slate-600 px-2'>
            {name}
          </Link>
        ))}
      </ul>
    </>
  );
};

export default MovieFacts;
