import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
const react = require('react');
const reactDOM = require('react-dom');

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

  let eventImage;
  return (
    <main>
      <Navbar />
      {eventImage && (
        <section>
          File details:
          <ul>
            <li>Name: {eventImage.name}</li>
            <li>Type: {eventImage.type}</li>
            <li>Size: {eventImage.size} bytes</li>
          </ul>
        </section>
      )}
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
