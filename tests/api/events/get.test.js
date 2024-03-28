import { expect, test } from '@playwright/test';
import { mongo } from '@/utils/globals';
import { connect } from '@/services/mongoose';
import Event from '@/models/event';
import { before } from 'node:test';

require('dotenv').config();
const HTTP_OK = 200;

test.describe('GET /events', () => {
  test('should return a list of event type objects', async ({ request }) => {
    const response = await request.get('/api/events');

    const body = await response.json();

    expect(response.status()).toBe(HTTP_OK);

    // Check that the response body is an array
    expect(body).toBeInstanceOf(Array);

    // Check that each element of the array is a vaguely correct Event object
    body.forEach((event) => {
      expect(event).toBeInstanceOf(Object);
      expect(event).toHaveProperty('name');
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('location');
      expect(event).toHaveProperty('description');
    });
  });

  test('allows a single event specifying an ID', async ({ request }) => {
    await connect();

    // Get a single event from the database
    const event = await Event.findOne();
    const response = await request.get(`/api/events/${event._id}`);
    const body = await response.json();
    expect(response.status()).toBe(HTTP_OK);

    expect(JSON.stringify(body)).toEqual(JSON.stringify(event));
  });
  test('should return a 404 if no event is found', async ({ request }) => {
    const response = await request.get('/api/events/12a9db7cc7de36df18301234');
    const body = await response.json();
    expect(response.status()).toBe(404);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('No event found matching:');
  });
});

// TODO: try and work out a way to test the POST request
