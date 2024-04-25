'use client';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import styles from '@/styles/login/login.form';
import { IoIosArrowRoundForward, IoIosLock, IoMdMail } from 'react-icons/io';
import { FaWandMagicSparkles } from 'react-icons/fa6';

import Link from 'next/link';
import { Typography, Button, ButtonGroup } from '@mui/joy';
import { MdErrorOutline } from 'react-icons/md';

export default function LoginForm({ onSubmit, error }) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  let devLogin;

  // ! TODO: Remove this in production
  if (process.env.NODE_ENV === 'development') {
    devLogin = (
      <Button
        id="devLoginButton"
        endDecorator={<FaWandMagicSparkles size={30} />}
        size="lg"
        sx={{ alignSelf: 'end' }}
        onClick={() => {
          setFormData({
            email: process.env.DEV_USERNAME || 'dev@example.com',
            password: process.env.DEV_PASSWORD || 'pass',
          });
        }}
      >
        Dev Magic
      </Button>
    );
  }
  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      onSubmit={handleSubmit}
      id="loginForm"
    >
      <FormControl>
        <Input
          className="inputBox"
          name="email"
          type="email"
          placeholder="Email"
          variant="outlined"
          startDecorator={<IoMdMail />}
          required
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <Input
          className="inputBox"
          name="password"
          type="password"
          placeholder="Password"
          variant="outlined"
          startDecorator={<IoIosLock />}
          endDecorator={
            <Link href="/forgot" id="forgotPasswordLink">
              Forgot?
            </Link>
          }
          required
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>
      {error ? (
        <Typography color="danger" startDecorator={<MdErrorOutline />}>
          {error}
        </Typography>
      ) : (
        <></>
      )}
      <ButtonGroup spacing="0.5rem" sx={{ alignSelf: 'end' }}>
        {/* TODO: Remove in production */}
        {devLogin}

        <Button
          id="loginButton"
          endDecorator={<IoIosArrowRoundForward size={30} />}
          size="lg"
          sx={{ alignSelf: 'end' }}
          type="submit"
        >
          Login
        </Button>
      </ButtonGroup>
    </form>
  );
}
