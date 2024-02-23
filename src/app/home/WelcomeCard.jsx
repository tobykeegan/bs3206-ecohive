import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import UserProfile from '../ui/UserProfile';

import styles from '../styles/home.scss';

// TODO: Implement
const getName = () => {
  return null;
};

// TODO: Implement
const getPersonalImpactOffset = () => {
  return null;
};

/**
 * The card for the Home page that welcomes the user.
 * @author Jade Carino
 */
export default function WelcomeCard() {
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
          Welcome back, {getName() || 'Carlos'}
        </Typography>
        <UserProfile />
        <Typography level="body-lg" id="personal-impact" mb={1}>
          Your personal impact has offset:{' '}
          {getPersonalImpactOffset() ||
            'the carbon emissions from one day of driving!'}
        </Typography>
      </CardContent>
    </Card>
  );
}
