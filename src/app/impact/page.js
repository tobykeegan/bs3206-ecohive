import Navbar from '@/components/Navbar';
import Points from './Points';
import Leaderboard from './Leaderboard';
import Badges from './Badges';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

import styles from '../styles/impact/impact.scss';

/**
 * The Impact page.
 * @author Jade Carino
 */
export default async function Impact() {
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
            justifyContent: 'start',
            gap: 0,
            padding: 0,
          }}
        >
          <Points points={session.user.score.points} />
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
          <Badges badgeIds={session.user.badges} />
        </div>
      </div>
    </main>
  );
}
