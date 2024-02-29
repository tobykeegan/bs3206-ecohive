'use server';
import Navbar from '@/app/ui/Navbar';
import EventCard from '../EventCard';
import Event from '@/app/api/models/event.model';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Discover() {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main>
      <Navbar />
      <h1> Discover events feed page template </h1>

      {/* <EventCard/> */}
      <Divider />
      <Footer />
    </main>
  );
}
