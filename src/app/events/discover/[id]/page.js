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
import IS_FINISHED from '@/app/events/toby';
export default async function Page({ params }) {
  /**
   * Protect server route if unauthenticated & get session
   * @author Alec Painter
   */
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  const apiURL = `${URL}/api/events/${params.id}`;

  let res = await axios.get(apiURL);

  let event = res.data;
  let rendered;

  if (IS_FINISHED) {
    rendered = (
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
        </Card>

        <div id="Footer-Div">
          <Divider />
          <Footer />
        </div>
      </main>
    );
  } else {
    rendered = <h1>Event page template</h1>;
  }
  return rendered;
}
