import Navbar from '@/app/ui/Navbar';
import EventWidget from '../EventWidget';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Box } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import axios from 'axios';
import { URL } from '@/utils/globals';
import CollapsibleEventSearch from '../CollapsibleEventSearch';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import style from '../../styles/events/styles.scss';

/**
 * Discover page for events. This page is protected
 * by the server route and requires authentication to access.
 * @returns {JSX.Element} The discover events page.
 * @author Toby Keegan
 */
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
      const eventsForThisUser = `${URL}/api/events/registration?user=${session.user.id}`;
      console.log(eventsForThisUser);
      let res = await axios.get(eventsForThisUser);
      console.log('res is: ', res.data);
      eventCards = res.data.map((event) => {
        return (
          // the event might be null, if it was deleted but an attendance record

          event && (
            <Col className="m-1" key={event._id}>
              <EventWidget
                key={event._id}
                event={event}
                userid={session.user.id}
              />
            </Col>
          )
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
          <EventWidget key={event._id} event={event} userid={session.user.id} />
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

  if (params.creator) {
    console.log('Getting events owned by this ID');
  }

  let pageTitle;
  if (params.attending === 'true' || params.attending === 'yes') {
    pageTitle = 'Upcoming Events';
  } else if (params.creator) {
    pageTitle = 'Your Events';
  } else {
    pageTitle = 'Discover Events';
  }

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
        <h1>{pageTitle}</h1>
        <CollapsibleEventSearch />
        {eventCards.length != 0 ? grid : <h1>No events found</h1>}
      </Box>
    );
  }

  return (
    <main>
      <Navbar />
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/events/discover">Events</Link>
      </Breadcrumbs>
      <Box
        // my={4}
        display="flex"
        alignItems="center"
        flexDirection="column"
        // gap={4}
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
