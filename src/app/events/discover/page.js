import Navbar from '@/app/ui/Navbar';
import EventCard from '../EventCard';
import Container from 'react-bootstrap/Container';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import axios from 'axios';
import { URL } from '@/utils/globals';
import style from '../../styles/events/styles.scss';
import PageHeader from '../PageHeader';
import CollapsibleEventSearch from '../CollapsibleEventSearch';

export default async function Discover() {
  let eventCards;
  try {
    let res = await axios.get(`${URL}/api/events/discover`);
    eventCards = res.data.map((event) => {
      return <EventCard key={event._id} event={event} />;
    });
  } catch (err) {
    console.log(err);
  }

  return (
    <main>
      <Navbar />
      <PageHeader pageName="discover events near you" />
      <CollapsibleEventSearch />
      <Divider />
      <div id="eventsContainer">{eventCards}</div>
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
