import { type ClassValue, clsx } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { BACKDROP_COLOR } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFilter = (value: string | number) => _.isNumber(value);

export const tmdbImageSrc = (src: string | undefined, imageSize: string) =>
  src ? src.replace("/original/", `/${imageSize}/`) : "";

/**
 * Convert a hex color code to an rgba color code.
 *
 * @param {string} hex - the hex color code to convert (default is BACKDROP_COLOR)
 * @param {number} alpha - the alpha value for the rgba color (default is 1)
 * @return {string} the rgba color code generated from the hex color code and alpha value
 */
export const hexToRgba = (hex = BACKDROP_COLOR, alpha = 1) => {
  const cleanHex = hex.replace("#", "");
  const normalizedAlpha = Math.max(0, Math.min(1, alpha));

  const hexToByte = parseInt(cleanHex, 16);

  const r = (hexToByte >> 16) & 0xff;
  const g = (hexToByte >> 8) & 0xff;
  const b = hexToByte & 0xff;

  return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha})`;
};

/**
 * Lightens a given color by a specified percentage.
 *
 * @param {string} inputColor - The color to be lightened, in hexadecimal format.
 * @param {number} [percentage=12] - The percentage by which the color should be lightened. Default is 12.
 * @return {string} The lightened color, in hexadecimal format.
 */
export const lightenColor = (inputColor: string, percentage = 12): string => {
  const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const rgbToHex = ([r, g, b]: [number, number, number]): string =>
    `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

  const [r, g, b] = hexToRgb(inputColor);
  const lightenR = (255 - r) * (percentage / 100) + r;
  const lightenG = (255 - g) * (percentage / 100) + g;
  const lightenB = (255 - b) * (percentage / 100) + b;

  return rgbToHex([lightenR, lightenG, lightenB]);
};
