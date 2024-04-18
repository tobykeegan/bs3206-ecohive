import Navbar from '../ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import AccountCard from './AccountCard';
import DangerCard from './DangerCard';
import styles from '@/styles/settings/settings';

/**
 * Settings page
 * @author Alec Painter
 */
export default async function Settings() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <main id="setting-main">
      <Navbar />
      <div id="setting-content">
        <AccountCard />
        <div />
        <DangerCard />
      </div>
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
