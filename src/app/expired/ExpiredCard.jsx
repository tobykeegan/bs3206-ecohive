'use client';
import * as React from 'react';
import { Button, Link, Sheet, Typography } from '@mui/joy';
import styles from '@/styles/login/login.card';
import { FaClockRotateLeft } from 'react-icons/fa6';

export default function ExpiredCard() {
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
        textAlign: 'center',
      }}
      variant="plain"
      id="loginCardSheet"
    >
      <div
        style={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <FaClockRotateLeft size={'7em'} />
      </div>
      <div
        style={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        <Typography level="h1">Your session has expired</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          It appears your session has expired, all you need to do is login again
        </Typography>
        <br />
        <Button
          onClick={() => {
            window.location.replace('/login');
          }}
          size="lg"
          id="loginButton"
        >
          Return to Login
        </Button>
      </div>
    </Sheet>
  );
}
