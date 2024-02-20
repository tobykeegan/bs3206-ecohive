'use client';
import * as React from 'react';
import { Link, Sheet, Typography } from '@mui/joy';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RegisterForm from './RegisterForm';
import styles from '../styles/login/login.card.scss';
import RegisterOAuth from './RegisterOAuth';

export default function RegisterCard() {
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(
        `http://${window.location.hostname}:3001/api/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setError('');
      // Using href for redirect to simulate a user click
      window.location.href = '/login';
    } catch (error) {
      setError(error.message);
    }
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
      <Link
        sx={{
          alignSelf: 'start',
        }}
        id="signUpLink"
        underline="none"
        href="/login"
      >
        <IoIosArrowRoundBack size={50} />
      </Link>
      <div style={{ alignSelf: 'start' }}>
        <Typography level="h1">Create Account</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          Please fill the inputs below
        </Typography>
      </div>
      <RegisterForm error={error} onSubmit={handleSubmit} />
      <RegisterOAuth />
      <Typography id="signUpHeader" level="h4">
        Already have an account?
        <Link id="signUpLink" level="h4" underline="none" href="/login">
          &nbsp;Sign in
        </Link>
      </Typography>
    </Sheet>
  );
}
