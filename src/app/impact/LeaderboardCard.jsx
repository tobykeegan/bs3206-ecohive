import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Leaderboard from './Leaderboard';
import Typography from '@mui/joy/Typography';

import styles from '../styles/impact/impact.scss';

/**
 * A leaderboard showing the five users with the highest
 * level and most points.
 * @returns {JSX.Element} The leaderboard.
 * @author Jade Carino
 */
export default function LeaderboardCard({ topUsers }) {
  return (
    <Card
      id="Leaderboard-Card"
      data-testid="Leaderboard-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'white',
        marginTop: '0px',
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
        <Typography
          level="h3"
          id="leaderboard-heading"
          data-testid="leaderboard-heading"
        >
          Leaderboard
        </Typography>
        <Leaderboard topUsers={topUsers} />
      </CardContent>
    </Card>
  );
}
