'use client';
import { Badge, Button, Stack, Input, Select, Option } from '@mui/joy';
import React, { useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getTodaysDate } from '@/app/utils/date';
import style from '@/styles/events/create';
import { NextResponse } from 'next/server';
import axios from 'axios';
import { HTTP } from '@/app/ui/utils';
/**
 * Event Creation Card
 * @author Toby Keegan
 */
export default function EventForm({ session }) {
  const router = useRouter();

  const handleEventSubmission = async (formJson) => {
    const formData = new FormData();
    for (const key in formJson) {
      formData.append(key, formJson[key]);
    }

    console.log('Form Data: ', formData);
    const response = await axios.post('/api/events/new', {
      body: formData,
    });
    console.log('Response: ', response);

    if (response.status === HTTP.CREATED) {
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

  const todaysDate = getTodaysDate(new Date());
  console.log(todaysDate);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.creator = session.user.id;
        alert(JSON.stringify(formJson));
        handleEventSubmission(JSON.stringify(formJson));
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
        <Input name="date-field" type="date" required />
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
        <Button id="submit-button" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
