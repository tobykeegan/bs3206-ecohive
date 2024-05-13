import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Slider from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonalImpactOffsets from './PersonalImpactOffsets';

import styles from '../styles/impact/impact.scss';

/**
 * The card for user's points and level, and to display their personal impact.
 * @returns {JSX.Element} A points card.
 * @author Jade Carino
 */
export default function Points({ points, level }) {
  return (
    <Card
      id="Points-Card"
      data-testid="Points-Card"
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
          id="Level-Chip"
          data-testid="Level-Chip"
          variant="outlined"
          color="success"
          size="lg"
          startDecorator={<WorkspacePremiumIcon />}
        >
          Level {level}
        </Chip>
        <Typography level="h3" id="points-earned" data-testid="points-earned">
          {points} Points Earned
        </Typography>
        <Slider
          color="success"
          defaultValue={points}
          max={1000}
          disabled={true}
        />
        <Typography
          level="body-sm"
          id="points-needed"
          data-testid="points-needed"
        >
          {1000 - points} Points Until Level Up!
        </Typography>
        <Typography
          level="body-lg"
          id="personal-impact"
          data-testid="personal-impact"
          mb={1}
        >
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
