'use client';
import { FaCalendarCheck } from 'react-icons/fa6';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@mui/joy';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignupButton({ event, userid, attendanceUpdater }) {
  const [userIsAttending, setUserIsAttending] = useState(false);

  const handleAddAttendance = async () => {
    let uri = '/api/events/registration';
    axios
      .post(uri, {
        event: event._id,
        user: userid,
      })
      .then((res) => {
        attendanceUpdater((prev) => prev + 1);
        setUserIsAttending(true);
      })
      .catch((err) => {
        console.log('error is ', err);
      });
  };
  const handleRemoveAttendance = async () => {
    let uri = `/api/events/registration?event=${event._id}&user=${userid}`;
    axios
      .delete(uri)
      .then((res) => {
        attendanceUpdater((prev) => prev - 1);
        setUserIsAttending(false);
      })
      .catch((err) => {
        console.log('error is ', err);
      });
  };

  const fetchUserIsAttending = async () => {
    let uri = `/api/events/registration?event=${event._id}&user=${userid}`;
    axios
      .get(uri, {
        validateStatus: function (status) {
          switch (status) {
            case 200:
            case 404:
              return true;

            default:
              return false;
          }
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
      <Tooltip title="Unattend" variant="solid" color="danger" placement="top">
        <IconButton
          aria-label="bookmark"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
          onClick={handleRemoveAttendance}
        >
          <FaCalendarCheck />
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip
        title="Attend this event"
        color="success"
        variant="solid"
        placement="top"
      >
        <IconButton
          aria-label="bookmark"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
          onClick={handleAddAttendance}
        >
          <BookmarkAdd />
        </IconButton>
      </Tooltip>
    );
  }
}
