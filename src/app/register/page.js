import { Sheet } from '@mui/joy';
import style from '@/styles/login/login';
import RegisterCard from './RegisterCard';

/**
 * @author Alec Painter
 */
export default function Register() {
  return (
    <main
      style={{
        height: '100vh',
      }}
    >
      <div id="loginBackground">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <RegisterCard />
        </div>
      </div>
    </main>
  );
}
