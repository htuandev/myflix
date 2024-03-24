import React from 'react';
import { htuandev } from '@/constants';

const Footer = () => {
  return (
    <footer className=' bg-card p-3 text-center'>
      © {new Date().getFullYear()} · Built by
      <a className='ml-1 text-primary' href={htuandev} target='_blank' rel='noreferrer'>
        @htuandev
      </a>
    </footer>
  );
};

export default Footer;
