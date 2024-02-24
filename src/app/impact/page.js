import Navbar from '@/components/Navbar';
import Points from './Points';
import Leaderboard from './Leaderboard';
import Badges from './Badges';

import styles from '../styles/impact/impact.scss';

/**
 * The Impact page.
 * @author Jade Carino
 */
export default function Impact() {
  return (
    <main
      style={{
        height: '100vh',
      }}
    >
      <Navbar />
      <div
        id="Impact-Page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          width: '100%',
        }}
      >
        <div
          id="Points-Column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            justifyContent: 'center',
            gap: 0,
            padding: 0,
          }}
        >
          <Points />
          <Leaderboard />
        </div>

        <div
          id="Badges-Column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            justifyContent: 'start',
            gap: 0,
            padding: 0,
          }}
        >
          <Badges />
        </div>
      </div>
    </main>
  );
}
