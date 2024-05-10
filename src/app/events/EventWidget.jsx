'use client';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { getFormattedDate } from '../ui/utils';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EventPicture from './EventPicture';
import { Chip, Stack, Tooltip } from '@mui/joy';
import { useState, useEffect } from 'react';
import styles from '@/styles/events/styles';
import { FaClipboardUser, FaLocationDot } from 'react-icons/fa6';

import SignupButton from './SignupButton';

/**
 * Event card component. Displays a card with event information
 * @param {Object} event - The event to display
 * @param {string} userid - The user id of the current user
 * @returns {JSX.Element} - A card with event information and buttons to view more details or sign up
 * @author Toby Keegan
 */
export default function EventCard({ event, userid }) {
  // create some state for signups
  const [signups, setSignups] = useState(0);

  useEffect(() => {
    // get the number of signups for this event
    axios
      .get(`/api/events/registration/${event._id}`)
      .then((res) => {
        setSignups(res.data.signups);
      })
      .catch((err) => {
        console.log('Error getting signups: ', err);
      });
  });

  const router = useRouter();
  const handleClick = async (e) => {
    router.push(`/events/discover/${event._id}`);
  };

  return (
    <Card>
      <div>
        <Typography level="title-lg">{event.name}</Typography>
        <Typography level="body-sm">{getFormattedDate(event.date)}</Typography>
        <SignupButton
          event={event}
          userid={userid}
          attendanceUpdater={setSignups}
        />
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <EventPicture width={300} height={200} id={event.image} />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1}>
            <Tooltip title="Attendees" placement="top" variant="soft">
              <Chip
                startDecorator={<FaClipboardUser />}
                variant="soft"
                label="attendance-chip"
                size="md"
              >
                {signups}
              </Chip>
            </Tooltip>
            <Tooltip title="Location" placement="top" variant="soft">
              <Chip
                startDecorator={<FaLocationDot />}
                label="location-chip"
                size="md"
              >
                {event.location}
              </Chip>
            </Tooltip>
          </Stack>
        </div>
        <Button
          className="is-ecohive-interaction"
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
