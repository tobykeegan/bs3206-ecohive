import * as React from 'react';
import { Button, CssVarsProvider, Link, Sheet, Typography } from '@mui/joy';
import { IoIosArrowRoundForward } from 'react-icons/io';
import LoginForm from './LoginForm';
import styles from '../styles/login/login.card.scss';
import logo from '../static/ecohivelogo.png';
import AspectRatio from '@mui/joy/AspectRatio';
import Image from 'next/image';
import LoginOAuth from './LoginOAuth';

export default function LoginCard() {
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
      <AspectRatio sx={{ width: '80%' }} ratio="1">
        <Image src={logo} alt="Ecohive Logo" />
      </AspectRatio>
      <div style={{ alignSelf: 'start' }}>
        <Typography level="h1">Login</Typography>
        <Typography id="loginSecondaryHeader" level="body-lg">
          Please sign in to continue
        </Typography>
      </div>
      <LoginForm />
      <Button
        id="loginButton"
        endDecorator={<IoIosArrowRoundForward />}
        size="lg"
        sx={{ alignSelf: 'end' }}
      >
        Login
      </Button>
      <LoginOAuth />
      <Typography id="signUpHeader" level="h4">
        Don't have an account?
        <Link id="signUpLink" level="h4" underline="none">
          &nbsp;Sign up
        </Link>
      </Typography>
    </Sheet>
  );
}
