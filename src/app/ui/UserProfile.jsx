'use client';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import UserProfilePicture from '@/components/UserProfilePicture';
import style from '@/styles/user.profile.card';

// TODO: Implement
const getLocation = () => {
  return null;
};

export default function UserProfile({ session }) {
  return (
    <Card id="userProfile" variant="soft" size="lg" orientation="horizontal">
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <UserProfilePicture
          width={500}
          height={500}
          alt="User profile picture"
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {session.user.name.first}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {getLocation() || 'Winchester, UK'}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}
