'use client';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { Badge, Stack } from 'react-bootstrap';
import styles from '../styles/events/styles.scss';
import { useRouter } from 'next/navigation';

import { getFormattedDate, getImageSrc } from '@/app/ui/utils';

export default function EventWidget({ event }) {
  const openEvent = () => {};

  const router = useRouter();
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 300,
      }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: 'center', gap: 1 }}
      >
        <Typography fontWeight="lg">{event.name}</Typography>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <Image
            onClick={() => router.push(`/events/discover/${event._id}`)}
            src={getImageSrc(event.photoUrl)}
            width={500}
            height={500}
            alt="Picture of the event"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: 'center', mx: -1 }}
      >
        <Stack gap={3} direction="horizontal">
          <Badge className="eventChip" id="location-chip" pill>
            <PlaceIcon />
            {event.location}
          </Badge>
          <Badge className="eventChip" id="date-chip" pill>
            <CalendarMonthOutlinedIcon />
            {getFormattedDate(event.date)}
          </Badge>
        </Stack>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          fontSize="10px"
          sx={{ color: 'text.tertiary', my: 0.5 }}
        ></Link>
        <Typography fontSize="sm">
          <Link
            component="button"
            color="neutral"
            fontWeight="lg"
            textColor="text.primary"
          ></Link>{' '}
          {event.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
