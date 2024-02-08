import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Skeleton } from '@mui/joy';
import Image from 'next/image';
import carlos from '../static/carlos.png';
import style from '../styles/user.profile.card.scss';

// TODO: Implement
const getUsername = () => {
  let apiResponse = null;
  return apiResponse || "Carlos";
};

// TODO: Implement
const getLocation = () => {
  let apiResponse = null;
  return apiResponse || "Oil Rig \"K14\", North Sea";
};

// TODO: Implement
const getProfileImg = () => {
  let apiResponse = null;
  return apiResponse || carlos;
}

export default function UserProfile() {
  return (
    <Card id="userProfile" variant="soft" size="lg" orientation="horizontal">
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <Image
          src={getProfileImg()}
          width={500}
          height={500}
          alt="Picture of Carlos"
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {getUsername()}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {getLocation()}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
