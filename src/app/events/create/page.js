import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import ImageUploader from '@/app/ui/ImageUploader';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
const react = require('react');
const reactDOM = require('react-dom');

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
      <ImageUploader fileData={eventImage} />
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
