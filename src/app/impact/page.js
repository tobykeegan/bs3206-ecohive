import Navbar from '@/components/Navbar';
import Points from './Points';
import Leaderboard from './Leaderboard';
import Badges from './Badges';
import Badge from './Badge';
import BadgeEvaluator from './BadgeEvaluator';
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

  let badgeCards = [];
  (session.user.badges).map((badgeId => {
    let badge = allBadges[badgeId];
    badgeCards.push(<Badge key={badge.id} badgeName={badge.name} badgeDesc={badge.desc} />);
  }));

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
          <Badges badges={badgeCards} />
        </div>
      </div>
    </main>
  );
}

// TODO - Get all badges from the API from /api/badges instead of using static.

// const allBadges = getAllBadges();

// function getAllBadges() {
  // api call here...
// }
const allBadges = [
  {
    id: 0,
    name: 'Green Initiator',
    desc: 'For attending your first EcoHive event',
    photo: '../static/badge.png',
  },
  {
    id: 1,
    name: 'Sustainability Star',
    desc: 'For attending three EcoHive events',
    photo: '../static/badge.png',
  },
  {
    id: 2,
    name: 'Climate Crusader',
    desc: 'For attending five EcoHive events',
    photo: '../static/badge.png',
  },
  {
    id: 3,
    name: 'Eco Pioneer',
    desc: 'For organising your first event for EcoHive',
    photo: '../static/badge.png',
  },
  {
    id: 4,
    name: 'Eco Trailblazer',
    desc: 'For organising your first three events for EcoHive',
    photo: '../static/badge.png',
  },
  {
    id: 5,
    name: 'Eco Ambassador',
    desc: 'For organising your first five events for EcoHive',
    photo: '../static/badge.png',
  },
  {
    id: 6,
    name: 'Sustainability Activist',
    desc: 'For your attendance at a demonstration or activism event',
    photo: '../static/badge.png',
  },
  {
    id: 7,
    name: 'Education Enthusiast',
    desc: 'For your attendance at an educational event',
    photo: '../static/badge.png',
  },
  {
    id: 8,
    name: 'Clean Up Advocate',
    desc: 'For your attendance at a clean-up event',
    photo: '../static/badge.png',
  },
  {
    id: 9,
    name: 'Community Champion',
    desc: 'For your attendance at an EcoHive meet-up',
    photo: '../static/badge.png',
  },
];


// To manually create a badge in the DB
// const handleSubmit = async () => {
//   try {
//     const response = await axios.post('/api/badges', JSON.stringify(formData));
//     setError('');
//   } catch (error) {
//     setError(error.response.data.message);
//   }
// };
