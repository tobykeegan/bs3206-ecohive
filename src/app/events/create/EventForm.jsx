'use client';
import { HTTP } from '@/app/ui/utils';
import { getTodaysDate } from '@/app/utils/date';
import { UploadImage } from '@/app/utils/images';
import { Button, Input, Option, Select, Stack, Textarea } from '@mui/joy';
import axios from 'axios';
import { useRouter } from 'next/navigation';

/**
 * Event Creation Card
 * @author Toby Keegan
 */
export default function EventForm({ session }) {
  const router = useRouter();

  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  /**
   *
   * @param {string} id The id of the input field
   * @param {string} text The text to display
   * @returns {JSX.Element} A label for the input field
   * @author Toby Keegan
   */
  const label = (id, text) => {
    return (
      <label htmlFor={id} id={`${id}-label`}>
        {text}
      </label>
    );
  };

  const todaysDate = getTodaysDate(new Date());

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = Object.fromEntries(formData.entries());
    form.creator = session.user.id;
    console.log('form is ', form);

    if (form.eventImage) {
      console.log('Uploading image', form.eventImage.name);

      UploadImage(form.eventImage)
        .then(async (imageID) => {
          console.log('Image uploaded: ', imageID);
          form.eventImage = imageID;

          // create the event object
          const thisEvent = {
            name: form.eventTitle,
            type: form.eventType,
            location: form.eventLocation,
            description: form.eventDescription,
            date: form.date,
            attendance: {
              capacity: form.eventCapacity,
              signups: 1, // creator is signed up by default
            },
            image: form.eventImage,
            creator: form.creator,
          };

          console.log('Creating event: ', thisEvent);
          axios
            .post('/api/events/new', thisEvent)
            .then((response) => {
              console.log('response is: ');
              console.log(response.data);
              if (response.status === HTTP.CREATED) {
                router.push(`/events/discover/${response.data._id}`);
              }
            })
            .catch((error) => {
              console.error('Error creating event: ', error);
            });
        })
        .catch(async (error) => {
          console.error('Error uploading event image: ', error);
          await axios.delete(`/api/images/${form.eventImage}`);
        });
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={1}>
        {label('name-field', 'Event Title')}
        <Input
          id="name-field"
          name="eventTitle"
          placeholder="Give your event a catchy name!"
          required
        />

        {label('type-field', 'Event Type')}
        <Select
          id="type-field"
          placeholder="What type of event is this?"
          name="eventType"
          required
        >
          <Option value="demonstration">Demonstration</Option>
          <Option value="meet-up">Meet up</Option>
          <Option value="clean-up">Clean up</Option>
          <Option value="education">Education</Option>
        </Select>
        {label('location-field', 'Location')}
        <Input
          id="location-field"
          name="eventLocation"
          placeholder="Where is the event taking place?"
          required
        />
        {label('description-field', 'Description')}
        <Textarea
          id="description-field"
          name="eventDescription"
          placeholder="Write something interesting about your event."
          required
        />
        {label('date-field', 'Date')}
        <Input id="date-field" name="eventDate" type="date" required />
        {label('capacity-field', 'Event Capacity')}
        <Input
          id="capacity-field"
          name="eventCapacity"
          type="number"
          placeholder="Is there a maximum capacity?"
        />
        {label('image-field', 'Event Image')}
        <input
          id="image-field"
          name="eventImage"
          type="file"
          accept="image/*"
          placeholder="Choose an image for your event."
        />

        <Button id="submit-button" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
