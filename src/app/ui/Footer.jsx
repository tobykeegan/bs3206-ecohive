import Link from '@mui/joy/Link';

import styles from '@/styles/home';

/**
 * A footer component to allow easy and quick
 * navigation around the application from any page.
 * @returns {JSX.Element} The sticky footer.
 * @author Jade Carino
 */
export default function Footer() {
  return (
    <div
      id="Footer"
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
        className="footer-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Privacy Policy
      </Link>
      <Link
        className="footer-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Terms of Use
      </Link>
      <Link
        className="footer-link"
        level="body-xs"
        underline="always"
        href="/settings"
        color="global.$interaction"
      >
        Settings
      </Link>
      <Link
        className="footer-link"
        level="body-xs"
        underline="always"
        color="global.$interaction"
      >
        Contact
      </Link>
    </div>
  );
}
