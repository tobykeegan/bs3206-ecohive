import Link from '@mui/joy/Link';

import styles from '../styles/home.scss';

/**
 * Links at the bottom of the Home page for user navigation.
 * @author Jade Carino
 */
export default function HomeLinks() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 8,
        paddingBottom: 8,
        height: '34px',
        marginTop: 'auto',
      }}
    >
      <Link
        className="home-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Privacy Policy
      </Link>
      <Link
        className="home-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Terms of Use
      </Link>
      <Link
        className="home-link"
        level="body-xs"
        underline="always"
        href="/settings"
        color="global.$interaction"
      >
        Settings
      </Link>
      <Link
        className="home-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Contact
      </Link>
    </div>
  );
}
