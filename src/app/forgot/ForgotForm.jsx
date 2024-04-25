'use client';
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import styles from '@/styles/login/login.form';
import { IoIosArrowRoundForward, IoMdKey, IoMdMail } from 'react-icons/io';
import { Typography, Button, Modal, ModalDialog } from '@mui/joy';
import { MdErrorOutline } from 'react-icons/md';
import axios from 'axios';
import { URL } from '@/utils/globals';

export default function ForgotForm({ onSubmit, error, setError }) {
  const [open, setOpen] = React.useState(false);
  const [secQuestion, setSecQuestion] = React.useState('');
  const [formData, setFormData] = React.useState({
    email: '',
    secAnswer: '',
  });

  const secQuestionPopup = async function () {
    try {
      const response = await axios.get(
        `${URL}/api/users/security?email=${formData.email}`,
      );
      setSecQuestion(response.data.secQuestion + '?');
      setError('');
      setOpen(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
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
        onClick={secQuestionPopup}
      >
        Reset
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h2" textAlign="center">
            {secQuestion}
          </Typography>
          <FormControl>
            <Input
              className="inputBox"
              sx={{
                display: 'none',
              }}
              name="email"
              type="email"
              value={formData.email}
            />
          </FormControl>
          <FormControl>
            <Input
              className="inputBox"
              name="secAnswer"
              type="text"
              required
              placeholder="Answer"
              variant="outlined"
              startDecorator={<IoMdKey />}
              value={formData.secAnswer}
              onChange={handleChange}
            />
          </FormControl>
          <Button
            id="loginButton"
            endDecorator={<IoIosArrowRoundForward size={30} />}
            size="lg"
            sx={{ alignSelf: 'end' }}
            type="submit"
            onClick={handleSubmit}
          >
            Reset
          </Button>
        </ModalDialog>
      </Modal>
    </form>
  );
}
