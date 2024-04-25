'use client';
import styles from '@/styles/settings/settings';
import { Button, Card, Modal, ModalDialog, Typography } from '@mui/joy';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import React from 'react';
import { FaBackspace } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';
/**
 * Danger zone settings card
 * @author Alec Painter
 */
export default function DangerCard() {
  const [open, setOpen] = React.useState(false);

  const deleteAccount = async function () {
    try {
      const response = await axios.delete(`/api/users`);
      console.log(response);
      signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const confDeletePopup = function () {
    setOpen(true);
  };

  return (
    <Card className="centre-column-card">
      <h1 style={{ alignSelf: 'start' }}>Danger Zone</h1>
      <Button
        className="Button"
        color="danger"
        size="lg"
        endDecorator={<IoIosArrowRoundForward size={30} />}
        startDecorator={<MdOutlineLocalFireDepartment size={30} />}
        sx={{ width: '90%' }}
        onClick={confDeletePopup}
      >
        Delete Account
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h2" textAlign="center">
            Do you wish to <strong>delete your account</strong>?
          </Typography>
          <div className="modal-div">
            <Button
              className="modal-button"
              color="danger"
              size="md"
              endDecorator={<IoIosArrowRoundForward size={30} />}
              startDecorator={<MdOutlineLocalFireDepartment size={30} />}
              onClick={deleteAccount}
            >
              Delete Account
            </Button>
            <Button
              className="modal-button"
              color="neutral"
              size="md"
              startDecorator={<FaBackspace size={30} />}
              onClick={() => setOpen(false)}
            >
              Go Back
            </Button>
          </div>
        </ModalDialog>
      </Modal>
    </Card>
  );
}
