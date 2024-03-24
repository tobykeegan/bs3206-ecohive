import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Badge from './Badge';

import styles from '../styles/impact/impact.scss';

/**
 * The card to display the users badges.
 * @author Jade Carino
 */
export default function Badges({ badgeIds }) {
  return (
    <Card
      id="Badges-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <Typography level="h3" id="badges-heading">
        Badges
      </Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {getUsersBadges(badgeIds).map((badge) => (
          <Badge key={badge.id} badgeName={badge.name} badgeDesc={badge.desc} />
        ))}
      </div>
    </Card>
  );
}

const getUsersBadges = (badgeIds) => {
  let usersBadges = [];
  for (let badgeId in badgeIds) {
    usersBadges.push(allBadges[badgeId]);
  }
  return usersBadges;
};

// TODO - add different badge photos and pass path through.
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
