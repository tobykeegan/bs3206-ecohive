import { expect, test } from '@playwright/test';
import { mongo, HTTP, URL } from '@/utils/globals';
import { connect } from '@/services/mongoose';
import Event from '@/models/event';
import { generateEvent, randomString } from '@/test/utils';
require('dotenv').config();

/**
 * Tests for getting events using the /api/events endpoint.
 * The tests cover the following scenarios:
 * - Retrieving a list of all events
 * - Retrieving a single event by specifying an ID
 * - Retrieving a single event by specifying a search criteria
 * - Retrieving multiple events by specifying a search criteria
 * - Retrieving all events if a blank body is provided
 * - Returning a 404 if no events are found
 * @author Toby Keegan
 */

test.describe('Events API operations', () => {
  /**
   * Before each test, connect to the database and generate some events.
   * A mix of events owned by the user ID of this test run, and events
   * owned by nobody are created. The IDs of the events are stored in
   * trackedEventIds so they can be deleted after the tests.
   */
  test.describe.configure({ retries: 3, mode: 'serial' });
  const TRACKED = randomString(16);
  test.beforeAll(async ({ request }) => {
    await connect();
    // Generate a random number of events with no owner
    const numEvents = Math.floor(Math.random() * 10) + 1;
    const numOwnedEvents = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < numEvents; i++) {
      const event = generateEvent();
      event.name = `Events API Test Event #${i + 1}`;
      event.description = TRACKED;
      await event.save();
    }
    // Generate a random number of events owned by this user
    let req = await request.get('/api/whoami');

    let user = await req.json();
    for (let i = 0; i < numOwnedEvents; i++) {
      const event = generateEvent(user.id);
      event.description = TRACKED;
      await event.save();
    }
    const numTotalEvents = numEvents + numOwnedEvents;
    // check the document count matches the number of events created
    expect(await Event.countDocuments({ description: TRACKED })).toBe(
      numTotalEvents,
    );
  });

  test.beforeEach(async ({ request }) => {});
  test.afterAll(async () => {
    // Delete all the events that were created for this test
    await Event.deleteMany({ description: TRACKED });
  });

  test('GET /events returns a list of event type objects', async ({
    request,
  }) => {
    const response = await request.get('/api/events');
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

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
  test('POST /events returns all events if a blank body is provided', async ({
    request,
  }) => {
    const eventCount = await Event.countDocuments();
    // add an empty json object to the request body
    const response = await request.post('/api/events', {
      data: {},
    });

    const body = await response.json();

    expect(response.status()).toBe(HTTP.OK);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(eventCount);
    // expect the length of the array to be the same as the number of events
  });
  test('GET /events/:id returns a single event', async ({ request }) => {
    // Grab any event from the database - we don't care which one
    const event = await Event.findOne();

    // check event is not null
    expect(event).not.toBeNull();

    // Make a request to the API to get the event by ID
    const response = await request.get(`/api/events/${event._id}`);
    const body = await response.json();

    expect(response.status()).toBe(HTTP.OK);

    // Check that the response body is the same as the event we grabbed
    expect(JSON.stringify(body)).toEqual(JSON.stringify(event));
  });

  test('GET /events/:id returns 404 if no event is found', async ({
    request,
  }) => {
    // Make a request to the API to get an event that we know doesn't exist
    const response = await request.get('/api/events/12a9db7cc7de36df18301234');
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('No event found matching:');
  });

  // Test that all the events matching this description are returned
  test('POST /events returns multiple events by specifying a search criteria', async ({
    request,
  }) => {
    // Count the number of tracked events in the database
    const trackedEvents = await Event.countDocuments({ description: TRACKED });

    // now query the API for our tracked events
    const response = await request.post('/api/events', {
      data: JSON.stringify({ description: TRACKED }),
    });

    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(trackedEvents);
    body.forEach((event) => {
      expect(event).toHaveProperty('description');
      expect(event.description).toEqual(TRACKED);
    });
  });
  // Test that an event can be updated
  test('PUT /events/:id updates an event', async ({ request }) => {
    // Get a single event from the database
    const event = await Event.findOne();

    // check event is not null
    expect(event).not.toBeNull();

    // update the event
    const response = await request.put(`/api/events/${event._id}`, {
      data: { name: `Updated Event Name for ${TRACKED}` },
    });
    const body = await response.json();
    expect(response.status()).toBe(HTTP.CREATED);
    expect(body).toHaveProperty('name');
    expect(body.name).toBe(`Updated Event Name for ${TRACKED}`);
  });
});
