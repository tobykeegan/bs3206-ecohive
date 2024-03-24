import Card from '@mui/joy/Card';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import badgePhoto from '../static/badge.png';

import styles from '../styles/impact/impact.scss';

/**
 * The card to display a single badge.
 * @author Jade Carino
 */
export default function Badge({ badgeName, badgeDesc }) {
  return (
    <Card
      id="Badge-Card"
      variant="plain"
      size="lg"
      sx={{
        maxWidth: '120px',
        maxHeight: '200px',
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <Image
        src={badgePhoto}
        width={100}
        height={100}
        alt="Picture of the badge"
      />
      <Tooltip title={badgeDesc} variant="outlined">
        <Typography level="body-md" id="badges-heading" textAlign="center">
          {badgeName}
        </Typography>
      </Tooltip>
    </Card>
  );
}
