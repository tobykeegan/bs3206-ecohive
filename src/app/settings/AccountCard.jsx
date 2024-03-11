'use client';
import styles from '@/styles/home';
import {
  Badge,
  Button,
  Card,
  Input,
  Link,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import carlos from '../static/carlos.png';
import Image from 'next/image';
import AspectRatio from '@mui/joy/AspectRatio';
import { Ratio } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import {
  IoIosArrowForward,
  IoIosArrowRoundForward,
  IoMdMail,
} from 'react-icons/io';
import FormControl from '@mui/joy/FormControl';
import { GoPersonFill } from 'react-icons/go';
import React from 'react';

/**
 * Account setting card
 * @author Alec Painter
 */
export default function AccountCard() {
  const [open, setOpen] = React.useState(false);

  const editPicture = function () {
    // TODO:
    console.log('Implement change profile picture!');
  };

  const passResetPopup = function () {
    // TODO:
    setOpen(true);
    console.log('Send password reset email');
  };

  return (
    <Card className="centre-column-card">
      <div id="edit-profile-pic" onClick={editPicture}>
        <Badge
          badgeInset={'14%'}
          color="neutral"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<FaPencilAlt size={30} style={{ margin: 7 }} />}
        >
          <Ratio aspectRatio={'1x1'} style={{ width: 190 }}>
            <Image
              src={carlos}
              width={500}
              height={500}
              alt="User profile picture"
              style={{
                borderRadius: '50%',
                border: '2px solid #cdd7e1',
              }}
            />
          </Ratio>
        </Badge>
      </div>
      <Link
        className="interactable"
        level="body"
        underline="always"
        color="global.$interaction"
      >
        Change Profile Picture
      </Link>
      <br />
      <h1 style={{ alignSelf: 'start' }}>Account</h1>
      <FormControl style={{ width: '90%' }}>
        <Input
          variant="outlined"
          startDecorator={<GoPersonFill />}
          value="Carlos Johnson"
          disabled
        />
      </FormControl>
      <FormControl style={{ width: '90%' }}>
        <Input
          variant="outlined"
          startDecorator={<IoMdMail />}
          value="carlos@eco-crimes.com"
          disabled
        />
      </FormControl>
      <Button
        className="Button"
        endDecorator={<IoIosArrowRoundForward size={30} />}
        size="lg"
        sx={{ width: '90%' }}
        onClick={passResetPopup}
      >
        Change Password
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h2">Password Reset Email Sent!</Typography>
          <Typography>
            We have sent you an email! Please check your emails for instructions
            on resetting your password.
          </Typography>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
