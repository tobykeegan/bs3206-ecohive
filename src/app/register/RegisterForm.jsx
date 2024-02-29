'use client';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import styles from '@/styles/login/login.form';
import { IoIosArrowRoundForward, IoIosLock, IoMdMail } from 'react-icons/io';
import { GoPersonFill } from 'react-icons/go';
import { LinearProgress, Stack, Typography, Button } from '@mui/joy';
import { MdErrorOutline } from 'react-icons/md';

export default function RegisterForm({ onSubmit, error }) {
  const [formData, setFormData] = React.useState({
    fullName: '',
    displayName: '',
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
      id="registerForm"
    >
      <FormControl>
        <Input
          className="inputBox"
          // html input attribute
          name="fullName"
          type="text"
          placeholder="Full Name"
          variant="outlined"
          startDecorator={<GoPersonFill />}
          required
          value={formData.fullName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <Input
          className="inputBox"
          // html input attribute
          name="displayName"
          type="text"
          placeholder="Display Name"
          variant="outlined"
          startDecorator={<GoPersonFill />}
          value={formData.displayName}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <Input
          className="inputBox"
          // html input attribute
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
        <PasswordMeterInput
          className="inputBox"
          name="password"
          placeholder="Password"
          variant="outlined"
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
        Sign up
      </Button>
    </form>
  );
}

function PasswordMeterInput({ ...props }) {
  const [value, setValue] = React.useState('');
  const minLength = 12;

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <Stack
      spacing={0.5}
      sx={{
        '--hue': Math.min(value.length * 10, 120),
      }}
    >
      <Input
        className={props.className}
        name={props.name}
        placeholder={props.placeholder}
        type="password"
        variant={props.variant}
        startDecorator={<IoIosLock />}
        required
        value={value}
        onChange={handleChange}
      />
      <LinearProgress
        determinate
        size="sm"
        value={Math.min((value.length * 100) / minLength, 100)}
        sx={{
          bgcolor: 'background.level3',
          color: 'hsl(var(--hue) 80% 40%)',
        }}
      />
      <Typography
        level="body-xs"
        sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
      >
        {value.length < 3 && 'Very weak'}
        {value.length >= 3 && value.length < 6 && 'Weak'}
        {value.length >= 6 && value.length < 10 && 'Strong'}
        {value.length >= 10 && 'Very strong'}
      </Typography>
    </Stack>
  );
}
