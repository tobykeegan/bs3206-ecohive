'use client';
import * as React from 'react';
import { Sheet, Typography } from '@mui/joy';
import ResetForm from './ResetForm';
import styles from '@/styles/login/login.card';
import { Ratio } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import UserProfilePicture from '@/components/UserProfilePicture';
export default function ResetCard() {
  const router = useRouter();
  const [error, setError] = React.useState('');

  const { data: session } = useSession();
  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.patch('/api/users/password', JSON.stringify(formData));
      setError('');
      signOut();
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variant="plain"
      id="loginCardSheet"
    >
      <div>
        <Ratio aspectRatio={'1x1'} style={{ width: 190 }}>
          <UserProfilePicture
            width={500}
            height={500}
            alt="User profile picture"
            style={{
              borderRadius: '50%',
              border: '2px solid #cdd7e1',
            }}
          />
        </Ratio>
      </div>
      <div style={{ alignSelf: 'start', margin: '5% 0' }}>
        <Typography level="h1">Reset Password</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          Your new password must not be your previous password
        </Typography>
      </div>
      <ResetForm error={error} onSubmit={handleSubmit} />
    </Sheet>
  );
}
