'use client';
import { Badge, Button, Stack, Input, Select, Option } from '@mui/joy';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
/**
 * Event Creation Card
 * @author Toby Keegan
 */
export default function EventForm() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  const handleEventSubmission = async (formJson) => {
    const formData = new FormData();
    for (const key in formJson) {
      formData.append(key, formJson[key]);
    }

    const response = await fetch('/api/events/create', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      router.push('/events');
    } else {
      alert('Failed to create event');
    }
  };

  /**
   *
   * @param {string} id The id of the input field
   * @param {string} text The text to display
   * @returns {JSX.Element} A label for the input field
   * @author Toby Keegan
   */
  const genLabel = (id, text) => {
    return (
      <label htmlFor={id} id={`${id}-label`}>
        {text}
      </label>
    );
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());

        handleEventSubmission(formJson);
        alert(JSON.stringify(formJson));
      }}
    >
      <Stack spacing={1}>
        {genLabel('name-field', 'Event Title')}
        <Input
          id="name-field"
          name="eventTitle"
          placeholder="Give your event a catchy name!"
          required
        />
        {genLabel('type-field', 'Event Type')}
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
        {genLabel('location-field', 'Location')}
        <Input
          id="location-field"
          name="eventLocation"
          placeholder="Where is the event taking place?"
          required
        />
        {genLabel('description', 'Description')}
        <Input
          id="description-field"
          name="eventDescription"
          placeholder="Write something interesting about your event."
          required
        />
        {genLabel('date-field', 'Date')}
        <Input name="date-field" type="date" placeholder="Date" required />
        {genLabel('capacity-field', 'Event Capacity')}
        <Input
          id="capacity-field"
          name="eventCapacity"
          type="number"
          placeholder="Is there a maximum capacity?"
        />
        {genLabel('image-field', 'Event Image')}
        <Input
          id="image-field"
          name="eventImage"
          type="file"
          accept="image/*"
          placeholder="Choose an image for your event."
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
