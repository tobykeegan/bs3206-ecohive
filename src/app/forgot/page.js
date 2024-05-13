import ForgotCard from './ForgotCard';
import style from '@/styles/login/login';

/**
 * Forgot password authentication page
 * @author Alec Painter
 */
export default function Forgot() {
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
          <ForgotCard />
        </div>
      </div>
    </main>
  );
}
