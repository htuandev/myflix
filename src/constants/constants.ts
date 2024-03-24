export const PAGE_SIZE = 24;

export const METADATA_TITLE = 'Myflix - Xem phim online';
export const CURRENT_YEAR = new Date().getFullYear();

export const TMDB_IMAGE_SIZES = {
  poster: {
    sm: 'w300_and_h450_bestv2',
    md: 'w440_and_h660_bestv2',
    lg: 'w600_and_h900_bestv2'
  },
  face: {
    sm: 'w235_and_h235_face',
    md: 'w375_and_h375_face',
    lg: 'w470_and_h470_face'
  },
  thumbnail: {
    sm: 'w320_and_h180_bestv2',
    md: 'w640_and_h360_bestv2',
    lg: 'w1280_and_h720_bestv2'
  }
};

export const BACKDROP_COLOR = '#202020';

/**
 * Regular expression for validating id.
 *
 * IDs are 12 alphanumeric characters long.
 * This regex ensures that only valid IDs are accepted.
 *
 * [a-zA-Z0-9] - Any character that can be a capital letter, lowercase letter, or digit.
 *
 * {12} - Exactly 12 characters long.
 *
 */
export const idRegex = /^[a-zA-Z0-9]{12}$/;

export const htuandev = process.env.HTUANDEV || 'https://htuan.dev';
