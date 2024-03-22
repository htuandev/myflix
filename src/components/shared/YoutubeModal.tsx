'use client';

import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { PlayCircle } from 'lucide-react';
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import { Button } from '../ui/button';

type Props = {
  trailer: string;
};

const YoutubeModal = ({ trailer }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    trailer && (
      <>
        <ModalVideo channel='youtube' isOpen={isOpen} videoId={trailer} onClose={() => setOpen(false)} />
        <Button variant='ghost' onClick={() => setOpen(true)}>
          <PlayCircle className='mr-2 h-4 w-4' /> Trailer
        </Button>
      </>
    )
  );
};

export default YoutubeModal;
