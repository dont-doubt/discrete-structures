import { Inter } from 'next/font/google';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

/*
 ? THIN = '100';
 ? EXTRALIGHT = '200';
 ? LIGHT = '300';
 ? REGULAR = '400';
 ? MEDIUM = '500';
 ? SEMIBOLD = '600';
 ? BOLD = '700';
 ? EXTRABOLD = '800';
 ? BLACK = '900';
 */

export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: 'normal',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter'
})

function getFonts(): NextFontWithVariable[] {
  return [inter];
}

export default getFonts().map(font => font.variable).join(" ");
