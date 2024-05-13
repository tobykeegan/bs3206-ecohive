import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import styles from '../styles/impact/impact.scss';

/**
 * A component for the Impact page that displays the user's
 * currently achieved badges.
 * @returns {JSX.Element} The EcoHive badges component.
 * @author Jade Carino
 */
export default function BadgesCard({ badgeCards }) {
  return (
    <Card
      id="Badges-Card"
      data-testid="Badges-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <Typography level="h3" id="badges-heading" data-testid="badges-heading">
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
