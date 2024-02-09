import { Sheet } from '@mui/joy';
import LoginForm from './LoginForm';
import LoginCard from './LoginCard';
import style from '../styles/login/login.scss';

export default function Login() {
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
          <LoginCard />
        </div>
      </div>
    </main>
  );
}
