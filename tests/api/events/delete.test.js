import { expect, test } from '@playwright/test';
import { mongo } from '@/utils/globals';
import { connect } from '@/services/mongoose';
import Event from '@/models/event';
import { before } from 'node:test';
import { randomString, generateEvent } from '../../utils';
import { HTTP } from '@/utils/globals';
require('dotenv').config();

test.describe('DELETE /event/:id', () => {
  // Before each test, connect to the database
  test.beforeAll(async () => {
    await connect();
  });

  test('should delete an event', async ({ request }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();
    // Create a new event
    const event = generateEvent(user.id);
    // Save the event to the database
    await event.save();
    const thisId = event._id.toString();
    // check if the event is saved
    let foundEvent = await Event.findById(thisId);
    await expect(foundEvent).not.toBeNull();

    // Store the event ID for later
    const response = await request.delete(`/api/events/${thisId}`);
    const body = await response.json();
    await expect(response.status()).toBe(HTTP.OK);
    await expect(body).toHaveProperty('message');
    await expect(body.message).toEqual('Event deleted successfully');
    await expect(body).toHaveProperty('id');
    await expect(body.id).toEqual(thisId);
  });
  // test you cannot delete an event that does not exist
  test('should not delete an event that does not exist', async ({
    request,
  }) => {
    const response = await request.delete(
      `/api/events/123456789012345678901234`,
    );
    const body = await response.json();
    await expect(response.status()).toBe(HTTP.NOT_FOUND);
    await expect(body).toHaveProperty('message');
    await expect(body.message).toEqual(
      'No event found with ID: 123456789012345678901234',
    );
  });
});
