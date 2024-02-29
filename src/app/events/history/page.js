import Navbar from '@/app/ui/Navbar';
import Divider from '@mui/joy/Divider';
import Footer from '@/app/ui/Footer';

export default function History() {
  return (
    <main>
      <Navbar />
      <h1> Events history page template </h1>
      <div id="Footer-Div">
        <Divider />
        <Footer />
      </div>
    </main>
  );
}
