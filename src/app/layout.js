import { Inter } from 'next/font/google';
import styles from '@/styles/global';
import Navbar from '@/components/Navbar';
import globals from './global.vars';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  title: globals.metadata.title,
  description: globals.metadata.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <section>{children}</section>
      </body>
    </html>
  );
}
