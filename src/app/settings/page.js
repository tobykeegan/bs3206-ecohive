import Navbar from '../ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';

export default async function Settings() {
  /**
   * Protect route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main>
      <Navbar />
      <h1> Settings page template </h1>
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
