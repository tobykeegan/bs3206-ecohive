import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Badge from './Badge';

import styles from '../styles/impact/impact.scss';

/**
 * The card to display the users badges.
 * @author Jade Carino
 */
export default function Badges({ badges }) {
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
        {badges}
      </div>
    </Card>
  );
}
