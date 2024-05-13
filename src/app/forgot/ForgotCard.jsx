'use client';
import * as React from 'react';
import { Sheet, Typography } from '@mui/joy';
import ForgotForm from './ForgotForm';
import styles from '@/styles/login/login.card';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

/**
 * Forgot password card element
 * @author Alec Painter
 * @returns {JSX.Element}
 */
export default function ForgotCard() {
  const router = useRouter();
  const [error, setError] = React.useState('');

  const handleSubmit = async (formData) => {
    const response = await signIn('security-question-login', {
      callbackUrl: '/reset',
      redirect: false,
      email: formData.email,
      secAnswer: formData.secAnswer,
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="plain"
      id="loginCardSheet"
    >
      <div style={{ alignSelf: 'start', margin: '5% 0' }}>
        <Typography level="h1">Forgot Password</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          Please enter your recovery details to reset your password
        </Typography>
      </div>
      <ForgotForm error={error} onSubmit={handleSubmit} setError={setError} />
    </Sheet>
  );
}
