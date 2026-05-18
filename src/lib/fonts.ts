import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google';

export const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
  weight: ['400'],
});
