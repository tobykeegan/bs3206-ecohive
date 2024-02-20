import Navbar from '@/app/ui/Navbar';
import Event from '../_components/Event';

/**
 * Returns event information from the API.
 * @param eventId     The Object ID of the event you want
 * @author Toby Keegan
 */
const getEventInfo = () => {
  let event = {
    name: 'Event name',
    type: 'Event type',
    location: 'Event Location',
    date: '01/01/1970',
    description:
      'This is an event description.\
      It has a considerable amount of information about the event.',
    attendance: {
      capacity: 3000,
      signups: 1300,
    },
    photo: '',
    points: 100,
    tags: [
      {
        name: 'Winchester',
        colour: 'purple',
      },
      {
        name: 'Trees',
        colour: 'green',
      },
    ],
  };
  return event;
};
export default function Discover() {
  return (
    <main>
      <Navbar />
      <h1> Discover events feed page template </h1>

      <Event details={getEventInfo()} />
    </main>
  );
}
