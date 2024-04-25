'use client';
import styles from '@/styles/settings/settings';
import { Badge, Button, Card, Link, Typography } from '@mui/joy';
import { Ratio } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosArrowRoundForward, IoMdMail } from 'react-icons/io';
import { GoPersonFill } from 'react-icons/go';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { VisuallyHiddenInput } from '@/app/ui/VisuallyHiddenInput';
import { UploadImage } from '../utils/images';
import axios from 'axios';
import UserProfilePicture from '@/components/UserProfilePicture';
import { MdErrorOutline } from 'react-icons/md';
import { URL } from '@/utils/globals';
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

  const [error, setError] = useState('');
  const inputFileRef = useRef(null);

  const profilePicChange = function (e) {
    const file = e.target.files?.[0];
    const maxFileSize = 2;
    if (file) {
      if (file.size > maxFileSize * 1024 * 1024) {
        const msg = `New image size exceeds the maximum limit of ${maxFileSize} MB.`;
        console.error(msg);
        setError(msg);
        return;
      }
    }
    setError('');

    UploadImage(e.target.files?.[0])
      .then(async (imageID) => {
        await axios.patch(`${URL}/api/users/image`, {
          imageID: imageID,
        });
        window.location.reload();
      })
      .catch((error) => {
        const msg = `Error uploading new profile picture: ${error.message}`;
        console.error(msg);
        setError(msg);
        return;
      });
  };

  const editPicture = function () {
    inputFileRef.current.click();
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
        </Badge>
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          ref={inputFileRef}
          onChange={profilePicChange}
          aria-label="profile picture upload"
        />
      </div>
      <Link
        level="body"
        underline="always"
        id="change-profile-pic-link"
        onClick={editPicture}
      >
        Change Profile Picture
      </Link>
      {error ? (
        <Typography color="danger" startDecorator={<MdErrorOutline />}>
          {error}
        </Typography>
      ) : (
        <></>
      )}
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
