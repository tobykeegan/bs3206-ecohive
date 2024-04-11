'use client';
import styles from '@/styles/settings/settings';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Account setting card
 * @author Alec Painter
 */
export default function AccountCard() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  const editPicture = function () {
    // TODO:
    console.log('Implement change profile picture!');
  };

  const passReset = function () {
    router.push('/reset');
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
      <Link level="body" underline="always" id="change-profile-pic-link">
        Change Profile Picture
      </Link>
      <br />
      <h1 style={{ alignSelf: 'start' }}>Account</h1>
      <Card size="sm" sx={{ width: '90%' }}>
        <Typography startDecorator={<GoPersonFill />} className="grey-text">
          {session.user.name.first + ' ' + session.user.name.last}
        </Typography>
      </Card>
      <Card size="sm" sx={{ width: '90%' }}>
        <Typography startDecorator={<IoMdMail />} className="grey-text">
          {session.user.email}
        </Typography>
      </Card>
      <Button
        className="interactable-button"
        endDecorator={<IoIosArrowRoundForward size={30} />}
        size="lg"
        sx={{ width: '90%' }}
        onClick={passReset}
      >
        Change Password
      </Button>
    </Card>
  );
}
