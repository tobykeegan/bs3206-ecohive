import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { URL } from '@/app/api/utils/globals';
import { GetImageURL } from '@/app/api/utils/images';
import Navbar from '@/app/ui/Navbar';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Button, ButtonGroup, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import EventPicture from '../../EventPicture';

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

  // Get some displayable info about the event creator
  let eventCreatorDetails;
  try {
    eventCreatorDetails = await axios.get(`${URL}/api/users/${event.creator}`);
    console.log('Event creator details: ', eventCreatorDetails.data);
  } catch (error) {
    eventCreatorDetails = { displayName: 'This event has no owner' };
  }

  return (
    <main>
      <Navbar />
      <Box
        my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={4}
        p={2}
      >
        <Stack spacing={2}>
          <Button startDecorator={<KeyboardArrowLeft />}>Go back</Button>
          <EventPicture id={event.image} width={300} height={200} />
          <h1>{event.name}</h1>
          <p>Creator: {thisIsMyEvent ? '(You)' : ''}</p>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.date}</p>
          <ButtonGroup>
            <Button>Sign up</Button>
            <Button>Share</Button>
            <Button color="danger" disabled={!thisIsMyEvent}>
              Delete
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </main>
  );
}
