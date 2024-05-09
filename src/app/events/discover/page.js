import Navbar from '@/app/ui/Navbar';
import EventWidget from '../EventWidget';
import { Container, Stack } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Box } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import axios from 'axios';
import { URL } from '@/utils/globals';
// import style from '../../styles/events/styles.scss';
import PageHeader from '../PageHeader';
import CollapsibleEventSearch from '../CollapsibleEventSearch';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import IS_FINISHED from '@/app/events/toby';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { errorMonitor } from 'events';
import { Button } from '@mui/joy';

export default async function Discover(req) {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const params = req.searchParams || {};

  let eventCards;
  // if 'attending' is in the query params, get all events the user is attending
  if (params.attending === 'true' || params.attending === 'yes') {
    try {
      const eventsForThisUser =
        await `${URL}/api/events/registration?user=${await session.user.id}`;
      console.log(eventsForThisUser);
      let res = await axios.get(eventsForThisUser);
      eventCards = res.data.map((event) => {
        return (
          <Col className="m-1" key={event._id}>
            <EventWidget key={event._id} event={event} />
          </Col>
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  try {
    let res = await axios.post(`${URL}/api/events`, params);
    eventCards = res.data.map((event) => {
      return (
        <Col className="m-1" key={event._id}>
          <EventWidget key={event._id} event={event} />
        </Col>
      );
    });
  } catch (err) {
    if (err.response.status != 404) {
      console.log(err);
    }
  }

  let grid = <Row>{eventCards}</Row>;
  let rendered;

  if (!eventCards) {
    rendered = (
      <div>
        <a href="/events/discover">Go Back</a>
        <h1>No events found</h1>
      </div>
    );
  } else {
    rendered = (
      <Box display="flex" alignItems="center" flexDirection="column">
        <h1>
          {params.attending === 'true' || params.attending === 'yes'
            ? 'Upcoming Events'
            : 'Discover Events'}
        </h1>
        <CollapsibleEventSearch />
        {eventCards.length != 0 ? grid : <h1>No events found</h1>}
      </Box>
    );
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
        {rendered}
      </Box>

      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
