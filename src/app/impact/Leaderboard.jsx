import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

import styles from '../styles/impact/impact.scss';

/**
 * The card for the leaderboard.
 * @author Jade Carino
 */
export default function Leaderboard() {
  return (
    <Card
      id="Leaderboard-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'white',
      }}
    >
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <Typography level="h3" id="leaderboard-heading">
          Leaderboard
        </Typography>
      </CardContent>
    </Card>
  );
}