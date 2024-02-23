import * as React from 'react';
import styles from '../styles/login/login.oauth.scss';
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
      <IconButton className="oauthButton">
        <FaFacebook color="#316FF6" />
      </IconButton>
      <IconButton className="oauthButton">
        <FcGoogle />
      </IconButton>
      <IconButton className="oauthButton">
        <FaApple />
      </IconButton>
    </div>
  );
}
