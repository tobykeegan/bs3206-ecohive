import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EventForm from './EventForm';
import { Container } from '@mui/joy';
import PageHeader from '@/app/events/PageHeader';
/**
 * TODO: Implement CreateEvent page
 * Page template for creating an event. This page is protected
 * by the server route and requires authentication to access.
 * @returns {JSX.Element} The create event page.
 * @author Toby Keegan
 */
export default async function CreateEvent() {
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
      <Container>
        <PageHeader pageName="Create a new event" />
        <EventForm />
      </Container>
      <Divider />
      <Footer />
    </main>
  );
}
