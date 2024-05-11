import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonalImpactOffsets from '../impact/PersonalImpactOffsets';

import styles from '@/styles/home';

/**
 * The card for the Home page that welcomes the user and
 * has a quick view of their points, level and personal impact.
 * @author Jade Carino
 */
export default function WelcomeCard({ session, points, level }) {
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
        <Chip
          variant="outlined"
          color="success"
          size="lg"
          startDecorator={<WorkspacePremiumIcon />}
        >
          Level {level}
        </Chip>
        <Typography level="h3" id="points-earned">
          {points} Points Earned
        </Typography>
        <Typography level="body-sm" id="points-needed">
          {1000 - points} Points Until Level Up!
        </Typography>
        <Typography level="body-lg" id="personal-impact" mb={1}>
          Your personal impact has offset:{' '}
          {getPersonalImpactOffset(level, points)}
        </Typography>
      </CardContent>
    </Card>
  );
}

const getPersonalImpactOffset = (level, points) => {
  let totalPoints = level * 1000 + points;
  const personalImpactOffset = new PersonalImpactOffsets(totalPoints);
  return personalImpactOffset.get();
};
