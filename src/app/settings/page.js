import Navbar from '../ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';
export default function Settings() {
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
