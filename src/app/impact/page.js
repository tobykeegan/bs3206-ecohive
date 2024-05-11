import Navbar from '@/components/Navbar';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Points from './Points';
import LeaderboardCard from './LeaderboardCard';
import Badge from './Badge';
import BadgesCard from './BadgesCard';
import BadgeEvaluator from './BadgeEvaluator';
import Divider from '@mui/joy/Divider';
import NewBadges from './NewBadges';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { URL } from '@/utils/globals';
import axios from 'axios';
import { Link } from '@mui/joy';

import styles from '../styles/impact/impact.scss';
/**
 * The Impact page, to provide gamification and
 * reward EcoHive users for their their eco-friendly activities.
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

  let allBadges;
  try {
    let res = await axios.get(`${URL}/api/badges`);
    allBadges = res.data.badges;
  } catch (err) {
    console.log(err);
  }

  let points, level;
  try {
    let res = await axios.get(
      `${URL}/api/users/score?email=${session.user.email}`,
    );
    points = res.data.score.points;
    level = res.data.score.level;
  } catch (err) {
    console.log(err);
  }

  let usersBadges;
  let badgeCards;
  try {
    let res = await axios.get(
      `${URL}/api/users/badges?email=${session.user.email}`,
    );
    usersBadges = res.data.badges;

    badgeCards = usersBadges?.map((badgeId) => {
      return allBadges?.map((badge) => {
        if (badge.id == badgeId) {
          return (
            <Badge
              key={badge?.id}
              name={badge?.name}
              desc={badge?.description}
            />
          );
        }
      });
    });
  } catch (err) {
    console.log(err);
  }

  let userStats = await getUserStats(session.user.id);

  let topUsers;
  try {
    let res = await axios.get(`${URL}/api/users?limit=5`);
    topUsers = res.data.topUsers;
  } catch (err) {
    console.log(err);
  }

  /****************************************************
   * Call the Badge Evaluator to see if the user has  *
   * earned any new badges for their recent activity. *
   * @author Jade Carino
   */
  const badgeEvaluator = new BadgeEvaluator(allBadges, usersBadges, userStats);
  const newBadgesEarned = badgeEvaluator.evaluateNewBadges();

  for (let index in newBadgesEarned) {
    let newBadge = newBadgesEarned[parseInt(index)];
    // Add to the user in the database
    try {
      const res = await axios.patch(
        `${URL}/api/users/badges`,
        JSON.stringify({ email: session.user.email, badgeId: newBadge.id }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  let newBadges;
  if (newBadgesEarned != undefined && newBadgesEarned.length > 0) {
    newBadges = badgeEvaluator.renderNewBadgeComponents(newBadgesEarned);
  }

  async function getUserStats(userid) {
    let attendance, creation;
    await axios
      .get(`${URL}/api/events/registration?user=${userid}`)
      .then((res) => {
        attendance = res.data.length;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${URL}/api/events?creator=${userid}`)
      .then((res) => {
        creation = res.data.length;
      })
      .catch((err) => [console.log(err)]);

    let userStats = { attendance: attendance, creation: creation };
    return userStats;
  }

  return (
    <main
      style={{
        height: '100vh',
      }}
    >
      <Navbar />
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/impact">My Impact</Link>
      </Breadcrumbs>
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
          <Points points={points} level={level} />

          <Divider id="Divider" />

          <LeaderboardCard topUsers={topUsers} />
        </div>

        <Divider id="Divider" />

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
          <BadgesCard badgeCards={badgeCards} />

          {/* If the user has been granted new badges, a modal will pop up displaying them */}
          <NewBadges newBadges={newBadges} />
        </div>
      </div>
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
