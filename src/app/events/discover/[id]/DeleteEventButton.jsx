'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function DeleteEvent({ event, disabled }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleDelete = async () => {
    // delete the event
    console.log('Deleting event ', event._id);
    try {
      await axios.delete(`/api/events/${event._id}`);
      // redirect to the events page
      router.push('/events/discover');
    } catch (error) {
      console.log('Error deleting event: ', error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="soft"
        color="danger"
        disabled={disabled}
        startDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Cancel Event
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to cancel this event?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Yes, cancel this event
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
