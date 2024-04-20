import Navbar from '@/components/Navbar';
import Points from './Points';
import LeaderboardCard from './LeaderboardCard';
import Badge from './Badge';
import BadgesCard from './BadgesCard';
import BadgeEvaluator from './BadgeEvaluator';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { URL } from '@/utils/globals';
import axios from 'axios';

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

  let allBadges;
  try {
    let res = await axios.get(`${URL}/api/badges`);
    allBadges = res.data.badges;
  } catch (err) {
    console.log(err);
  }

  let points;
  try {
    let res = await axios.get(
      `${URL}/api/users/score/points?email=${session.user.email}`,
    );
    points = res.data.points;
  } catch (err) {
    console.log(err);
  }

  let level;
  try {
    let res = await axios.get(
      `${URL}/api/users/score/level?email=${session.user.email}`,
    );
    level = res.data.level;
  } catch (err) {
    console.log(err);
  }

  let badgeCards;
  try {
    let res = await axios.get(
      `${URL}/api/users/badges?email=${session.user.email}`,
    );

    badgeCards = res.data.badges?.map((badgeId) => {
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

  // Badge evaluator logic
  // const newBadgesToGrant = allBadges?.map((badge) => {

  //   console.log('Assessing user against badge criteria for badge ID ' + badge.id);

  //   //  If the user already has badge, then continue to next function...
  //   if (!(session.user.badges).includes(badge.id)) {
  //     // Call the deserialized function stored with the badge to see if user meets criteria...
  //     let func = new Function("user", `return (${badge.criteria.serializedFunction})`);
  //     let userMeetsCriteria = func(session.user);

  //     if (userMeetsCriteria) {
  //       console.log("This user has now achieved badge " + badge.id)
  //       grantUserBadge(badge.id)
  //       session.user.badges.push(badge.id)
  //       let badgeInfo = {id: badge.id, name: badge.name, desc: badge.description};
  //       return badgeInfo;
  //   } else {
  //     console.log("This user does not meet the criteria for the badge " + badge.id)
  //   }
  //   } else {
  //     console.log("This user already has badge " + badge.id)
  //   }
  // });

  // const filteredNewBadgesToGrant = newBadgesToGrant.filter((badge) => badge);

  // const newBadgeCards = filteredNewBadgesToGrant.map((badgeInfo) => {
  //   return <Badge key={badgeInfo?.id} name={badgeInfo?.name} desc={badgeInfo?.desc}></Badge>;
  // })

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
          <Points points={points} level={level} />
          <LeaderboardCard />
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
          <BadgesCard badgeCards={badgeCards} />
          {/* <BadgesCard badgeCards={newBadgeCards} /> */}
          {/* <BadgeEvaluator badges={allBadges} user={session.user} /> */}
        </div>
      </div>
    </main>
  );
}

async function grantUserBadge(badgeId) {
  try {
    const res = await axios.patch(
      '/api/users/badges',
      JSON.stringify({ badgeId: badgeId }),
    );
  } catch (err) {
    console.log(err);
  }
}
