import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Slider from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import styles from '../styles/impact/impact.scss';

/**
 * The card for user's points and personal impact.
 * @author Jade Carino
 */
export default function Points({ points, level }) {
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
        <Slider
          color="success"
          defaultValue={points}
          max={1000}
          disabled={true}
        />
        <Typography level="body-sm" id="points-needed">
          {1000 - points} Points Until Level Up!
        </Typography>
        <Typography level="body-lg" id="personal-impact" mb={1}>
          Your personal impact has offset: {getPersonalImpactOffset()}
        </Typography>
      </CardContent>
    </Card>
  );
}

// TODO: Implement
const getPersonalImpactOffset = () => {
  return 'the carbon emissions from one day of driving!';
};
