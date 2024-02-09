import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import styles from '../styles/login/login.form.scss';
import { IoIosLock, IoMdMail } from 'react-icons/io';

export default function LoginForm() {
  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <FormControl>
        <Input
          className="inputBox"
          // html input attribute
          name="username"
          type="email"
          placeholder="Email"
          variant="outlined"
          startDecorator={<IoMdMail />}
        />
      </FormControl>
      <FormControl>
        <Input
          className="inputBox"
          // html input attribute
          name="password"
          type="password"
          placeholder="Password"
          variant="outlined"
          startDecorator={<IoIosLock />}
        />
      </FormControl>
    </form>
  );
}
