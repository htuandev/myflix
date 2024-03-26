'use client';

import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import { TMDB_IMAGE_SIZES } from '@/constants';
import { tmdbImageSrc } from '@/lib/utils';

type Props = {
  source: string;
  thumbnail?: string;
};

const VideoPlayer = ({ source, thumbnail }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current!;

    let hls: Hls | null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
    }

    const Plyr = require('plyr');

    const player = new Plyr(video, {
      controls: [
        'play-large', // The large play button in the center
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'current-time', // The current time of playback
        'duration', // The full duration of the media
        'mute', // Toggle mute
        'volume', // Volume control
        'pip', // Only supported on Safari 10+ (on MacOS Sierra+ and iOS 10+) and Chrome 70+
        'airplay', // Airplay (currently Safari only)
        'fullscreen' // Toggle fullscreen
      ],
      seekTime: 15
    });

    player.play();

    return () => hls?.destroy();
  });

  return <video ref={videoRef} poster={tmdbImageSrc(thumbnail, TMDB_IMAGE_SIZES.thumbnail.lg)} />;
};

export default VideoPlayer;
