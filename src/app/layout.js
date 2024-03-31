import { Inter } from 'next/font/google';
import styles from '@/styles/global';
import Navbar from '@/components/Navbar';
import globals from './global.vars';
import { getServerSession } from 'next-auth';
import SessionProvider from './ui/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  title: globals.metadata.title,
  description: globals.metadata.tagline,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <section className="min-100vh">{children}</section>
        </SessionProvider>
      </body>
    </html>
  );
}
