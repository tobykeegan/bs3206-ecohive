import Navbar from '@/components/Navbar';
import Divider from '@mui/joy/Divider';
import { redirect } from 'next/navigation';

import Footer from './ui/Footer';
import WelcomeCard from './home/WelcomeCard';
import EventSearchCard from './home/EventSearchCard';
import AboutEcoHiveCard from './home/AboutEcoHiveCard';

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import styles from '@/styles/home';

/**
 * The Home page.
 * @author Jade Carino
 */
export default async function Home() {
  /**
   * Protect route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main
      style={{
        height: '100vh',
      }}
    >
      <Navbar />

      <div
        id="Home-Page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          id="Welcome-Row"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            justifyContent: 'center',
            gap: 0,
            padding: 0,
          }}
        >
          <WelcomeCard session={session} />

          <Divider />

          <EventSearchCard />
        </div>

        <Divider />

        <AboutEcoHiveCard />
      </div>

      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
