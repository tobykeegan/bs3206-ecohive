'use client';
import * as React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal, ModalDialog } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Badge from './Badge';

import styles from '../styles/impact/impact.scss';

/**
 * A Badge evaluator that is hooked in throughout the web application
 * and grants users badges based on their use of the system.
 * @author Jade Carino
 */
export default function BadgeEvaluator({ badges, user }) {
  const newBadgesToGrant = badges?.map((badge) => {
    console.log(
      'Assessing user against badge criteria for badge ID ' + badge.id,
    );

    //  If the user already has badge, then continue to next function...
    if (!user.badges.includes(badge.id)) {
      // Call the deserialized function stored with the badge to see if user meets criteria...
      let func = new Function(
        'user',
        `return (${badge.criteria.serializedFunction})`,
      );
      let userMeetsCriteria = func(user);

      if (userMeetsCriteria) {
        console.log('This user has now achieved badge ' + badge.id);
        // grantUserBadge(badge.id)
        user.badges.push(badge.id);
        let badgeInfo = {
          id: badge.id,
          name: badge.name,
          desc: badge.description,
        };
        return badgeInfo;
      } else {
        console.log(
          'This user does not meet the criteria for the badge ' + badge.id,
        );
      }
    } else {
      console.log('This user already has badge ' + badge.id);
    }
  });

  const filteredNewBadgesToGrant = newBadgesToGrant.filter((badge) => badge);

  const badgeCards = filteredNewBadgesToGrant.map((badgeInfo) => {
    return (
      <Badge
        key={badgeInfo?.id}
        name={badgeInfo?.name}
        desc={badgeInfo?.desc}
      ></Badge>
    );
  });

  return (
    <div>
      Hello
      {badgeCards}
    </div>
  );
}

{
  /* <Button onClick={clickButton}>CLICK</Button> */
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

// REMOVE
async function clickButton() {
  try {
    let res = axios.post('/api/badges');
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
