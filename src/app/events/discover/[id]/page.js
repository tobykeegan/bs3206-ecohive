import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { URL } from '@/app/api/utils/globals';
import Navbar from '@/app/ui/Navbar';
import {
  CalendarMonth,
  Description,
  Groups,
  LocationOn,
  Person,
} from '@mui/icons-material';
import { Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EventPicture from '../../EventPicture';
import { Typography } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import { getFormattedDate } from '@/app/ui/utils';
import EditEvent from './EditEventButton';
import DeleteEvent from './DeleteEventButton';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import GoBack from './GoBack';
import InfoIcon from '@mui/icons-material/Info';
import styles from '@/styles/events/styles';
function getPrettyType(type) {
  switch (type) {
    case 'demonstration':
      return 'Demonstration';
    case 'meet-up':
      return 'Meet up';
    case 'clean-up':
      return 'Clean up';
    case 'education':
      return 'Education';
    default:
      return 'Unknown';
  }
}

export default async function Page({ params }) {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const apiURL = `${URL}/api/events/${params.id}`;

  let res = await axios.get(apiURL);

  let event = res.data;

  // Check if the event is owned by the current user
  let thisIsMyEvent = event.creator === session.user.id;

  if (thisIsMyEvent) {
    console.log('This is my event');
  }

  // Get some displayable info about the event creator
  let eventCreatorDetails;
  try {
    eventCreatorDetails = await axios.get(`${URL}/api/users/${event.creator}`);
    console.log('Event creator details: ', eventCreatorDetails.data);
  } catch (error) {
    eventCreatorDetails = { displayName: 'This event has no owner' };
  }

  const genInfo = (icon, name, content) => {
    return (
      <Box
        sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}
      >
        <Alert
          className="eventInfo"
          key={name}
          startDecorator={icon}
          variant="soft"
        >
          <div>
            <div>{name}</div>
            <Typography level="body-sm">{content}</Typography>
          </div>
        </Alert>
      </Box>
    );
  };

  const getAttendanceCount = () =>
    axios
      .get(`${URL}/api/events/registration/${event._id}`)
      .then((res) => {
        return res.data.signups;
      })
      .catch((err) => {
        console.log('Error getting signups: ', err);
      });

  return (
    <main>
      <Navbar />
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/events/discover">Events</Link>
        <Link href={`/events/discover/${params.id}`}>{event.name}</Link>
      </Breadcrumbs>
      <Box
        my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={4}
        p={2}
      >
        <Stack spacing={2}>
          <EventPicture id={event.image} width={300} height={200} />
          <h1>{event.name}</h1>
          {genInfo(<InfoIcon />, 'Type', getPrettyType(event.type))}
          {genInfo(<CalendarMonth />, 'Date', getFormattedDate(event.date))}
          {genInfo(<Description />, 'Description', event.description)}
          {genInfo(
            <Person />,
            'Creator',
            `${eventCreatorDetails.data.name}${thisIsMyEvent ? ' (You)' : ''}`,
          )}
          {genInfo(<LocationOn />, 'Location', event.location)}
          {genInfo(<Groups />, 'Current sign ups', getAttendanceCount())}
          <Stack direction="row" spacing={2}>
            <GoBack />
            <EditEvent disabled={!thisIsMyEvent} event={event} />
            <DeleteEvent disabled={!thisIsMyEvent} event={event} />
          </Stack>
        </Stack>
      </Box>
    </main>
  );
}
