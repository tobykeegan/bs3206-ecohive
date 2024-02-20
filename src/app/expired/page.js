import ExpiredCard from './ExpiredCard';
import style from '../styles/login/login.scss';

/**
 * @author Alec Painter
 */
export default function Expired() {
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
          <ExpiredCard />
        </div>
      </div>
    </main>
  );
}
