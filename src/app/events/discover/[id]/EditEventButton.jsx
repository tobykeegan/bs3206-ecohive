'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import EditNoteIcon from '@mui/icons-material/EditNote';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Alert, Stack, Tooltip } from '@mui/joy';
import { FormControl } from '@mui/joy';
import { FormLabel } from '@mui/joy';
import { Input, Select, Option } from '@mui/joy';
import { getFormattedDate } from '@/app/ui/utils';
import InfoIcon from '@mui/icons-material/Info';
import styles from '@/styles/events/styles';

Date.prototype.toInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

export default function EditEvent({ event, disabled }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const thisEventId = event._id;

  return (
    <React.Fragment>
      <Button
        className="editButton"
        variant="soft"
        disabled={disabled}
        startDecorator={<EditNoteIcon />}
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Edit your event</DialogTitle>
          <DialogContent>
            <Alert
              className="is-ecohive-primary"
              variant="outlined"
              startDecorator={<InfoIcon />}
            >
              Some fields are not editable yet. If you need to make changes to:
              the date, image, or capacity, please delete and recreate your
              event.
            </Alert>
          </DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target);
              const form = Object.fromEntries(formData.entries());
              // Edit the event
              console.log('Editing event ', thisEventId);

              axios
                .put(`/api/events/${thisEventId}`, {
                  ...form,
                })
                .then((res) => {
                  // check the response
                  if (res.status === 201) {
                    console.log('Event edited successfully');
                    console.log('New event is: ', res.data);
                  } else {
                    console.log('Error editing event: ', res);
                  }
                })
                .catch((error) => {
                  console.log('Error editing event: ', error);
                })
                .finally(() => {
                  console.log('Done processing');
                  router.push(`/events/discover/${thisEventId}`);
                  setOpen(false);
                });
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name-field"
                  name="name"
                  autoFocus
                  required
                  defaultValue={event.name}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  id="description-field"
                  name="description"
                  required
                  defaultValue={event.description}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Event Type</FormLabel>
                <Select
                  id="type-field"
                  name="type"
                  defaultValue={event.type}
                  required
                >
                  <Option value="demonstration">Demonstration</Option>
                  <Option value="meet-up">Meet up</Option>
                  <Option value="clean-up">Clean up</Option>
                  <Option value="education">Education</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  id="location-field"
                  name="location"
                  required
                  defaultValue={event.location}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date</FormLabel>

                <Input
                  id="date-field"
                  name="date"
                  type="date"
                  defaultValue={new Date(event.date).toInputValue()}
                  required
                />
              </FormControl>
              <ButtonGroup buttonFlex={1} spacing={2} aria-label="Form buttons">
                <Button
                  className="is-ecohive-secondary"
                  variant="soft"
                  onClick={() => setOpen(false)}
                >
                  Go back
                </Button>
                <Button
                  className="is-ecohive-interaction"
                  variant="soft"
                  type="submit"
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
