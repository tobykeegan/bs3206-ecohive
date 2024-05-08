import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { URL } from '@/app/api/utils/globals';
import { GetImageURL } from '@/app/api/utils/images';
import Navbar from '@/app/ui/Navbar';
import { getImageSrc } from '@/app/ui/utils';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Button, ButtonGroup, Stack } from '@mui/joy';
import Box from '@mui/joy/Box';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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
  } catch (error) {
    eventCreatorDetails = { displayName: 'This event has no owner' };
  }

  // get the image for the event
  let image;

  try {
    image = await axios.get(`${URL}/api/images?id=${event.image}`);
    console.log('Image: ', image);
  } catch (error) {}
  return (
    <main>
      <Navbar />
      <Box my={4} display="flex" alignItems="center" gap={4} p={2}>
        <form></form>
        <Stack spacing={2}>
          <ButtonGroup>
            <Button startDecorator={<KeyboardArrowLeft />}>Go back</Button>
            <Button color="primary" disabled={!thisIsMyEvent}>
              Edit
            </Button>
            <Button color="danger" disabled={!thisIsMyEvent}>
              Delete
            </Button>
          </ButtonGroup>
          <h1>{event.name}</h1>
          <p>
            Creator:{' '}
            {eventCreatorDetails.data.displayName ||
              eventCreatorDetails.data.name}{' '}
            {thisIsMyEvent ? '(You)' : ''}
          </p>
          <img
            src={GetImageURL(event.image)}
            alt="Event Image"
            // width={500}
            // height={500}
          />
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{event.date}</p>
        </Stack>
      </Box>
    </main>
  );
}
