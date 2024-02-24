import Navbar from '@/components/Navbar';
import Divider from '@mui/joy/Divider';

import FooterLinks from './ui/FooterLinks';
import WelcomeCard from './home/WelcomeCard';
import EventSearchCard from './home/EventSearchCard';
import AboutEcoHiveCard from './home/AboutEcoHiveCard';

import styles from './styles/home.scss';

/**
 * The Home page.
 * @author Jade Carino
 */
export default function Home() {
  return (
    <main
      style={{
        height: '100vh',
      }}
    >
      <Navbar />

      <div
        id="HomePage"
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
          <WelcomeCard />

          <Divider></Divider>

          <EventSearchCard />
        </div>

        <Divider></Divider>

        <AboutEcoHiveCard />

        <Divider></Divider>

      </div>

      <FooterLinks />

    </main>
  );
}
