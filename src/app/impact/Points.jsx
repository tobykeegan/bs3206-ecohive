import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Slider from '@mui/joy/Slider';

import styles from '../styles/impact/impact.scss';

/**
 * The card for user's points and personal impact.
 * @author Jade Carino
 */
export default function Points({ points }) {
  return (
    <Card
      id="Points-Card"
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
        <Typography level="h3" id="points-earned">
          {points} Points Earned
        </Typography>
        <Slider color="success" defaultValue={points} max={100} />
        <Typography level="body-lg" id="personal-impact" mb={1}>
          Your personal impact has offset:{'\n'}
          {getPersonalImpactOffset() ||
            'the carbon emissions from one day of driving!'}
        </Typography>
      </CardContent>
    </Card>
  );
}

// TODO: Implement
const getPersonalImpactOffset = () => {
  return null;
};
