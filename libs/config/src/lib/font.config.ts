import { Open_Sans } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const fonts = { inter };
