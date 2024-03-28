import { getServerSession } from 'next-auth';
import { URL } from '@/app/api/utils/globals';
import axios from 'axios';
import { redirect } from 'next/navigation';
import EventWidget from '../../EventWidget';
import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/material/Divider';
import Footer from '@/app/ui/Footer';
import Typography from '@mui/material/Typography';
export default async function Page({ params }) {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const apiURL = `${URL}/api/events?id=${params.id}`;
  console.log('API URL', apiURL);
  let res = await axios.get(apiURL);

  let event = res.data;
  return (
    <main>
      <Navbar />
      <Typography level="h1">{event.name}</Typography>
      <EventWidget event={event} />
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
