'use client';
import { FaCalendarCheck } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import IconButton from '@mui/joy/IconButton';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignupButton({ event, userid }) {
  const [userIsAttending, setUserIsAttending] = useState(false);

  const fetchUserIsAttending = async () => {
    let uri = `/api/events/registration?event=${event._id}&user=${userid}`;
    console.log('uri is ', uri);
    axios
      .get(uri, {
        validateStatus: function (status) {
          return status != 404 || status != 200;
        },
      })
      .then((res) => {
        setUserIsAttending(res.status === 200);
      })
      .catch((err) => {
        console.log('error is ', err);
      });
  };

  if (userid) {
    fetchUserIsAttending();
  }
  if (userIsAttending) {
    return (
      <IconButton
        aria-label="bookmark"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
      >
        <FaCalendarCheck />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        aria-label="bookmark"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
      >
        <BookmarkAdd />
      </IconButton>
    );
  }
}
