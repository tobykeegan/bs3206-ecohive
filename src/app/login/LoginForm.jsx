'use client';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import styles from '../styles/login/login.form.scss';
import { IoIosArrowRoundForward, IoIosLock, IoMdMail } from 'react-icons/io';
import Link from 'next/link';
import { Typography, Button } from '@mui/joy';
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
            // TODO: Add forgot password
            <Link href={''} id="forgotPasswordLink">
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
      <Button
        id="loginButton"
        endDecorator={<IoIosArrowRoundForward size={30} />}
        size="lg"
        sx={{ alignSelf: 'end' }}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}
