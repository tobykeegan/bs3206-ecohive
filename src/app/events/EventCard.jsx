/* eslint-disable jsx-a11y/anchor-is-valid */
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
import defaultEventImg from '@/static/default_event.jpeg';
import { Badge, Stack } from 'react-bootstrap';
import styles from '../styles/events/styles.scss';
import getRandomColour from '@/utils/colours';
const getFormattedDate = (convertDate) => {
  let date = new Date(convertDate);
  if (date.toString() === 'Invalid Date') return 'N/A';

  let dateString = date.toLocaleDateString('en-FB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return dateString;
};

const getImageSrc = (event) => {
  return defaultEventImg;
};

export default function EventCard({ event }) {
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
