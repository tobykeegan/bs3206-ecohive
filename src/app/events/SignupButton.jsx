'use client';
import { FaCalendarCheck } from 'react-icons/fa6';
import IconButton from '@mui/joy/IconButton';
import { Tooltip } from '@mui/joy';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import axios from 'axios';
import { useState } from 'react';
import { rewardUserPoints } from '@/app/utils/impact';

/**
 * Button to sign up for an event. Allows users to sign up for an event or remove their attendance.
 * @param {Object} event - The event to sign up for
 * @param {string} userid - The user id of the current user
 * @param {function} attendanceUpdater - A function to update the number of signups for the event
 * @returns {JSX.Element} - A button to sign up for an event
 * @author Toby Keegan
 */
export default function SignupButton({ event, userid, attendanceUpdater }) {
  const [userIsAttending, setUserIsAttending] = useState(false);

  /**
   * Handles adding attendance for the event.
   * @returns {Promise<void>} A promise that resolves when the attendance is added successfully.
   * @author Toby Keegan
   */
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
        rewardUserPoints(userid, 250);
      })
      .catch((err) => {
        console.log('error is ', err);
      });
  };

  /**
   * Handles removing attendance for the event.
   * @returns {Promise<void>} A promise that resolves when the attendance is removed successfully.
   * @author Toby Keegan
   */
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

  /**
   * Fetches the user's attendance status for the event.
   * @returns {Promise<void>} A promise that resolves when the user's attendance status is fetched.
   * @author Toby Keegan
   */
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
