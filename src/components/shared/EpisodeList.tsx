'use client';

import React from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentType } from '@/constants';
import { chunkArray } from '@/lib/utils';
import { IEpisodeList } from '@/types';
import Thumbnail from './Thumbnail';

type Props = {
  episodes: IEpisodeList;
  type: ContentType[];
  movieName: string;
  movieSlug: string;
  currentEpisodeId: string;
  style?: React.CSSProperties;
};

const EpisodeList = ({ episodes, type, movieName, movieSlug, currentEpisodeId, style }: Props) => {
  const itemsPerPage = 24;
  const pages = Math.ceil(episodes.length / itemsPerPage);

  const options = Array(pages)
    .fill(0)
    .map((_i, index) => {
      const page = index;
      const start = 1 + page * itemsPerPage;
      const end = page + 1 === pages ? episodes.length : (page + 1) * itemsPerPage;

      return {
        value: page.toString(),
        label: start === end ? `Ep ${end}` : `Ep ${start} - ${end}`
      };
    });

  const chunkedEpisodes = chunkArray(episodes, itemsPerPage);
  const currentEpisodeIdIndex = chunkedEpisodes.findIndex((ep) => ep.map((e) => e._id).includes(currentEpisodeId));
  const defaultValue = currentEpisodeIdIndex === -1 ? 0 : currentEpisodeIdIndex;
  const [page, setPage] = React.useState(defaultValue);

  return (
    episodes.length > 0 &&
    type.includes(ContentType.Series) && (
      <div className='my-8 '>
        <div className='flex-center mb-4 justify-between gap-4'>
          <h2 className='text-2xl font-medium'>Chọn tập</h2>
          {options.length > 1 && (
            <Select defaultValue={defaultValue.toString()} onValueChange={(value) => setPage(Number(value))}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Episodes' />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className='grid grid-cols-2 gap-4 xl:gap-6 md:grid-cols-3 lg:grid-cols-4'>
          {chunkedEpisodes[page].map((episode) => (
            <Link key={episode._id} href={`/play/${movieSlug}-${episode.slug}-${episode._id}`}>
              <Thumbnail src={episode.thumbnail} style={style} size='md' />
              <p className='mt-2 font-medium'>{movieName} - {episode.name}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default EpisodeList;
