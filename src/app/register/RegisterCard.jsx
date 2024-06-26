'use client';
import * as React from 'react';
import { Link, Sheet, Typography } from '@mui/joy';
import { IoIosArrowRoundBack } from 'react-icons/io';
import RegisterForm from './RegisterForm';
import styles from '@/styles/login/login.card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/**
 * Register account card element
 * @author Alec Painter
 * @returns {JSX.Element}
 */
export default function RegisterCard() {
  const router = useRouter();
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(`/api/users`, JSON.stringify(formData));
      setError('');
      router.push('/login');
    } catch (error) {
      setError(error.response.data.message);
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
        aria-label="Go Back"
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
      <Typography id="signUpHeader" level="body-lg">
        Already have an account?&nbsp;
        <Link
          id="signUpLink"
          level="body-lg"
          underline="always"
          href="/login"
          aria-label="Sign into existing account"
        >
          Sign in
        </Link>
      </Typography>
    </Sheet>
  );
}
