'use client';
import * as React from 'react';
import { Button, Link, Sheet, Typography } from '@mui/joy';
import { IoIosArrowRoundForward } from 'react-icons/io';
import LoginForm from './LoginForm';
import styles from '../styles/login/login.card.scss';
import logo from '../static/ecohivelogo.png';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/image';
import LoginOAuth from './LoginOAuth';
import { Ratio } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signIn } from 'next-auth/react';

export default function LoginCard() {
  const router = useRouter();
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData) => {
    const response = await signIn('credentials', {
      callbackUrl: '/',
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (!response.ok) {
      setError(response.error);
      return;
    }

    setError('');
    router.push(response.url);
  };

  return (
    <Sheet
      sx={{
        width: '100%',
        minWidth: 300,
        maxWidth: 500,
        height: '100vh',
        px: 4,
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      variant="plain"
      id="loginCardSheet"
    >
      <div id="titleDiv">
        <Typography id="ecohiveNameTitle">ECOHIVE</Typography>
      </div>
      <div style={{ width: '80%' }}>
        <Ratio aspectRatio={'1x1'}>
          <Image src={logo} alt="Ecohive Logo" />
        </Ratio>
      </div>
      <div style={{ alignSelf: 'start' }}>
        <Typography level="h1">Login</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          Please sign in to continue
        </Typography>
      </div>
      <LoginForm error={error} onSubmit={handleSubmit} />
      <LoginOAuth />
      <Typography id="signUpHeader" level="h4">
        Don&apos;t have an account?
        <Link id="signUpLink" level="h4" underline="none" href="/register">
          &nbsp;Sign up
        </Link>
      </Typography>
    </Sheet>
  );
}
