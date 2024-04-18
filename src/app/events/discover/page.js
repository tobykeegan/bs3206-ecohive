import Navbar from '@/app/ui/Navbar';
import EventWidget from '../EventWidget';
import { Stack } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import axios from 'axios';
import { URL } from '@/utils/globals';
import style from '../../styles/events/styles.scss';
import PageHeader from '../PageHeader';
import CollapsibleEventSearch from '../CollapsibleEventSearch';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Discover() {
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
    let res = await axios.get(`${URL}/api/events`);
    eventCards = res.data.map((event) => {
      return <EventWidget key={event._id} event={event} />;
    });
  } catch (err) {
    console.log(err);
  }

  // now generate the grid of event cards
  const grid = (
    <Row xs={1} md={2} className="g-4">
      {eventCards}
    </Row>
  );
  return (
    <main>
      <Navbar />
      <PageHeader pageName="discover events near you" />
      <CollapsibleEventSearch />
      <Divider />
      {grid}
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
