import { getServerSession } from 'next-auth';
import { URL } from '@/app/api/utils/globals';
import axios from 'axios';
import { redirect } from 'next/navigation';
import EventWidget from '../../EventWidget';
import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/material/Divider';
import Footer from '@/app/ui/Footer';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/image';
import { getImageSrc } from '@/app/ui/utils';
import { getFormattedDate } from '@/app/ui/utils';
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
      <h1> Go back </h1>
      <Card variant="outlined" sx={{ maxWidth: 400 }}>
        <Typography level="h1">{event.name}</Typography>
        <Typography level="h2" fontSize="xl" sx={{ mb: 0.5 }}>
          {event.location} | {getFormattedDate(event.date)}
        </Typography>
        <Typography>{event.description}</Typography>
      </Card>

      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <Image
              src={getImageSrc(event.photoUrl)}
              alt="Event Image"
              layout="fill"
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">Yosemite National Park</Typography>
          <Typography level="body-sm">California</Typography>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              6.3k views
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              1 hour ago
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>

      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
