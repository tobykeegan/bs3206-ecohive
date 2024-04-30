import Navbar from '@/app/ui/Navbar';
import EventWidget from '../EventWidget';
import { Container, Stack } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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

export default async function EventHistory() {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  console.log('Getting events from URL: ', URL, '/api/events');
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  let eventCards;
  try {
    let query = {
      creator: session.user.id,
      date: {
        $lt: new Date(),
      },
    };
    let res = await axios.post(`${URL}/api/events`, {
      body: query,
    });
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

  let grid = (
    <Row xs={1} md={2} lg={3}>
      {eventCards}
    </Row>
  );
  let rendered;
  if (IS_FINISHED) {
    rendered = (
      <Container fluid>
        {(eventCards && grid) || <h3>No past events</h3>}
      </Container>
    );
  } else {
    rendered = <h1>Page content is not yet available</h1>;
  }

  return (
    <main>
      <Navbar />
      <PageHeader pageName="See your past events" />
      <Divider />
      {rendered}
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
