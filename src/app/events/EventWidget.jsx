'use client';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import { getFormattedDate } from '../ui/utils';
import defaultEventImg from '@/static/default_event.jpeg';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EventPicture from './EventPicture';
import styles from '@/styles/events/styles';
import { Chip, Stack } from '@mui/joy';
import { useSession } from 'next-auth/react';
import {
  FaCalendarCheck,
  FaClipboardUser,
  FaLocationDot,
  FaLocationPin,
} from 'react-icons/fa6';
import SignupButton from './SignupButton';

export default function EventCard({ event }) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = async (e) => {
    router.push(`/events/discover/${event._id}`);
  };

  const userid = session.user.id;
  console.log('user id is ', session.user.id);

  return (
    <Card>
      <div>
        <Typography level="title-lg">{event.name}</Typography>
        <Typography level="body-sm">{getFormattedDate(event.date)}</Typography>
        <SignupButton event={event} userid={userid} />
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <EventPicture width={300} height={200} id={event.image} />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
            <Chip
              startDecorator={<FaClipboardUser />}
              variant="soft"
              label="attendance-chip"
              size="md"
            >
              {event.attendance.signups}
            </Chip>
            <Chip
              startDecorator={<FaLocationDot />}
              label="location-chip"
              size="md"
            >
              {event.location}
            </Chip>
          </Stack>
        </div>
        <Button
          id="event-details-btn"
          variant="solid"
          size="md"
          aria-label="See details about this event"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
          onClick={handleClick}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
}
