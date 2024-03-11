import Navbar from '../ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import AccountCard from './AccountCard';
import AccessibilityCard from './AccessibilityCard';

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
    <main>
      <Navbar />
      {/* TODO: Profile picture */}
      {/* TODO: Account info */}
      {/* TODO: Change password */}
      <div id="setting-main">
        <AccountCard />
        <AccessibilityCard />
      </div>
      {/* TODO: Accessibility */}
      {/* TODO: Danger section */}
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
