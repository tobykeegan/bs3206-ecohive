import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import styles from '../styles/impact/impact.scss';

/**
 * The card to display the users badges.
 * @author Jade Carino
 */
export default function Badges() {
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
    </Card>
  );
}
