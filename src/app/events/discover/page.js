'use server';
import Navbar from '@/app/ui/Navbar';
import EventCard from '../EventCard';
import Event from '@/app/api/models/event.model';

export default async function Discover() {
  return (
    <main>
      <Navbar />
      <h1> Discover events feed page template </h1>

      <EventCard details={getEventInfo()} />
    </main>
  );
}
