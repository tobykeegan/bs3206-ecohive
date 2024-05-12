'use client';
import { HTTP } from '@/app/ui/utils';
import { UploadImage } from '@/app/utils/images';
import { ButtonGroup, FormControl, FormLabel } from '@mui/joy';
import { Button, Input, Option, Select, Stack } from '@mui/joy';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { rewardUserPoints } from '@/app/utils/impact';

import styles from '@/styles/events/styles';

/**
 * Convert a JavaScript Date object to a value interpeted by an input field
 * @returns {string} - The date in the format 'YYYY-MM-DD'
 * @author Toby Keegan
 */
Date.prototype.toInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};
Date.prototype.toInputValue = function () {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

/**
 * Event Creation Form. This form is used to create a new event.
 * @param {Object} session - The session object.
 * @author Toby Keegan
 */
export default function EventForm({ session }) {
  const router = useRouter();

  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData.entries());
    form.creator = session.user.id;
    console.log('form is ', form);

    let newEventId;

    UploadImage(form.image)
      .then(async (imageID) => {
        console.log('Image uploaded: ', imageID);
        form.image = imageID;

        // create the event object
        const thisEvent = {
          name: form.name,
          type: form.type,
          location: form.location,
          description: form.description,
          date: form.date,
          capacity: form.capacity,
          image: form.image,
          creator: form.creator,
        };

        console.log('Creating event: ', thisEvent);
        axios
          .post('/api/events/new', thisEvent)
          .then((res) => {
            console.log('res is: ');
            console.log(res.data);
            if (res.status === HTTP.CREATED) {
              newEventId = res.data._id;
              console.log('Event: ', newEventId);
              console.log('Creator: ', form.creator);
              // create an attendance record for the user that created the event
              axios
                .post('/api/events/registration', {
                  event: newEventId,
                  user: form.creator,
                })
                .then((res) => {
                  console.log('attendance registration res was: ', res);
                  // if the attendance record was created successfully, redirect to the event page
                  if (res.status === HTTP.CREATED) {
                    console.log('Attendance record created for creator');
                    router.push(`/events/discover/${newEventId}`);
                  }
                  rewardUserPoints(session.id, 500);
                })
                .catch((error) => {
                  // if the attendance record was not created successfully, delete the event
                  console.error(
                    'Error creating attendance record, will back out event creation: ',
                    error,
                  );
                  axios
                    .delete(`/api/events/${newEventId}`)
                    .then((res) => {
                      if (res.status === HTTP.OK) {
                        console.log('Event deleted');
                      }
                    })
                    .catch((err) => {
                      // if the event was not deleted successfully, this is an unrecoverable error
                      console.error('Error deleting event: ', err);
                    });
                });
            }
          })
          .catch((error) => {
            console.error('Error creating event: ', error);
          });
      })
      .catch(async (error) => {
        console.error('Error uploading event image: ', error);
        await axios.delete(`/api/images/${form.image}`);
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            id="name-field"
            name="name"
            autoFocus
            placeholder="Choose a name for your event"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            id="description-field"
            name="description"
            placeholder="Provide a description for your event"
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Event Type</FormLabel>
          <Select
            id="type-field"
            name="type"
            defaultValue="demonstration"
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
            placeholder="Where is this event taking place? "
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date</FormLabel>

          <Input
            id="date-field"
            name="date"
            type="date"
            defaultValue={new Date().toInputValue()}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Capacity</FormLabel>
          <Input
            id="capacity-field"
            name="capacity"
            type="number"
            placeholder="Does this event have a maximum for capacity?"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Image</FormLabel>
          <input id="image-field" name="image" type="file" accept="image/*" />
        </FormControl>
        <ButtonGroup buttonFlex={1} spacing={2} aria-label="Form buttons">
          <Button
            className="is-ecohive-secondary"
            variant="soft"
            onClick={() => router.back()}
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
  );
}
