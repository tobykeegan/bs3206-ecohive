import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import styles from '@/styles/home';

// TODO: Implement
const getPersonalImpactOffset = () => {
  return null;
};

/**
 * The card for the Home page that welcomes the user.
 * @author Jade Carino
 */
export default function WelcomeCard({ session }) {
  return (
    <Card
      id="Welcome-Card"
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
        <Typography level="h3" id="welcome-message">
          Welcome back, {session.user.name.first}!
        </Typography>
        <AspectRatio sx={{ height: '24px' }} variant="plain"></AspectRatio>
        <Chip
          variant="outlined"
          color="success"
          size="lg"
          startDecorator={<WorkspacePremiumIcon />}
        >
          Level {session.user.score.level}
        </Chip>
        <Typography level="h3" id="points-earned">
          {session.user.score.points} Points Earned
        </Typography>
        <Typography level="body-sm" id="points-needed">
          {1000 - session.user.score.points} Points Until Level Up!
        </Typography>
        <Typography level="body-lg" id="personal-impact" mb={1}>
          Your personal impact has offset:{' '}
          {getPersonalImpactOffset() ||
            'the carbon emissions from one day of driving!'}
        </Typography>
      </CardContent>
    </Card>
  );
}
