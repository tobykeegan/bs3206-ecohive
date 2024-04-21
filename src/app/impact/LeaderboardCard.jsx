import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Leaderboard from './Leaderboard';
import Typography from '@mui/joy/Typography';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import styles from '../styles/impact/impact.scss';

/**
 * The card for the leaderboard.
 * @author Jade Carino
 */
export default function LeaderboardCard({ topUsers }) {
  return (
    <Card
      id="Leaderboard-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '100vw',
        backgroundColor: 'white',
        marginTop: '0px'
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
          startDecorator={<LeaderboardIcon></LeaderboardIcon>}
          level="h3"
          id="leaderboard-heading"
        >
          Leaderboard
        </Typography>
        <Leaderboard topUsers={topUsers} />
      </CardContent>
    </Card>
  );
}
