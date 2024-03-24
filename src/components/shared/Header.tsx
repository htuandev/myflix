import React from 'react';
import { fetchMovieCategories } from '@/services';
import { Menu } from './Menu';

const Header = async () => {
  const categories = await fetchMovieCategories();

  const years = categories.years.map(({ _id, name }) => ({
    title: name,
    href: `/year/${_id}`
  }));

  const genres = categories.genres.map(({ _id, name, slug }) => ({
    title: name,
    href: `/the-loai/${slug}-${_id}`
  }));

  const countries = categories.countries.map(({ _id, name, slug }) => ({
    title: name,
    href: `/quoc-gia/${slug}-${_id}`
  }));

  const networks = categories.networks.map(({ _id, name, slug }) => ({
    title: name,
    href: `/network/${slug}-${_id}`
  }));

  return (
    <div className=' bg-card text-center'>
      <div className=' container py-3'>
        <Menu genres={genres} countries={countries} networks={networks} years={years} />
      </div>
    </div>
  );
};

export default Header;
