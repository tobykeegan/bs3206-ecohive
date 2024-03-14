import * as React from 'react';
import styles from '@/styles/login/login.oauth';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { IconButton } from '@mui/joy';

export default function LoginOAuth() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '80%',
      }}
    >
      <IconButton className="oauthButton" aria-label="Facebook Login">
        <FaFacebook color="#316FF6" />
      </IconButton>
      <IconButton className="oauthButton" aria-label="Google Login">
        <FcGoogle />
      </IconButton>
      <IconButton className="oauthButton" aria-label="Apple Login">
        <FaApple />
      </IconButton>
    </div>
  );
}
