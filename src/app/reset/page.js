import ResetCard from './ResetCard';
import style from '@/styles/login/login';

/**
 * @author Alec Painter
 */
export default function Reset() {
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
          <ResetCard />
        </div>
      </div>
    </main>
  );
}
