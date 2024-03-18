import * as React from 'react';
import styles from '@/styles/login/login.oauth';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { IconButton } from '@mui/joy';

export default function RegisterOAuth() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '80%',
      }}
    >
      <IconButton aria-label="Facebook Login" className="oauthButton">
        <FaFacebook color="#316FF6" />
      </IconButton>
      <IconButton aria-label="Google Login" className="oauthButton">
        <FcGoogle />
      </IconButton>
      <IconButton aria-label="Apple Login" className="oauthButton">
        <FaApple />
      </IconButton>
    </div>
  );
}
