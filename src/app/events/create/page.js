import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import EventForm from './EventForm';
import { Container, Typography } from '@mui/joy';
import PageHeader from '@/app/events/PageHeader';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import { Stack } from '@mui/material';
/**
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
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main>
      <Navbar />
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/events/discover">Events</Link>
        <Link href={`/events/discover/create`}>Create an event</Link>
      </Breadcrumbs>

      <Stack spacing={2} direction="column" paddingX={3}>
        <Typography level="h1">Create an Event</Typography>
        <Typography level="body1">
          Fill out the form below to create an event.
        </Typography>
        <EventForm session={session} />
      </Stack>

      <Divider />
      <Footer />
    </main>
  );
}
