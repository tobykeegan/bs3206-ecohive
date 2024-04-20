import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import styles from '../styles/impact/impact.scss';

/**
 * The card to display the users badges.
 * @author Jade Carino
 */
export default function BadgesCard({ badgeCards }) {
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
      <Typography
        startDecorator={<EmojiEventsIcon></EmojiEventsIcon>}
        level="h3"
        id="badges-heading"
      >
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
        {badgeCards}
      </div>
    </Card>
  );
}
