import { expect, test } from '@playwright/test';
import { mongo, HTTP, URL } from '@/utils/globals';
import { connect } from '@/services/mongoose';
import Event from '@/models/event';
import Attendance from '@/models/attendance';
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

    const numEvents = Math.floor(Math.random() * 10) + 1;

    // Generate a random number of events owned by this user
    let req = await request.get('/api/whoami');

    let user = await req.json();
    for (let i = 0; i < numEvents; i++) {
      const event = generateEvent(user.id);
      event.description = TRACKED;
      await event.save();
      // attend this event manually, as only the API does this
      // automatically
      const attendanceRecord = new Attendance({
        event: event._id,
        user: user.id,
      });
      await attendanceRecord.save();
    }

    // check the document count matches the number of events created
    expect(await Event.countDocuments({ description: TRACKED })).toBe(
      numEvents,
    );
  });

  test.afterAll(async () => {
    // collect the IDs of every event that was created for this test
    const trackedEvents = await Event.find({ description: TRACKED });

    // for each event, delete the attendance records
    trackedEvents.forEach(async (event) => {
      await Attendance.deleteMany({ event: event._id });
    });

    // now finally delete all those events
    await Event.deleteMany({ description: TRACKED });
  });
  test.describe('Read Operations', () => {
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
        expect(event).toHaveProperty('creator');
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
      const response = await request.get(
        '/api/events/12a9db7cc7de36df18301234',
      );
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
      const trackedEvents = await Event.countDocuments({
        description: TRACKED,
      });

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
  });

  test.describe('Write Operations', () => {
    test('POST /events/new creates a new event', async ({ request }) => {
      let req = await request.get('/api/whoami');
      let user = await req.json();
      // Create a new event
      const event = generateEvent(user.id, true);
      // Save the event to the database
      const response = await request.post('/api/events/new', {
        data: JSON.stringify(event),
      });
      const body = await response.json();
      expect(response.status()).toBe(HTTP.CREATED);
      expect(body).toHaveProperty('name');
      expect(body.name).toBe(event.name);

      // Tidy up and delete the event
      await Event.deleteOne({ _id: body._id });

      // Check the event was deleted
      const deletedEvent = await Event.find({ _id: body._id });
      expect(deletedEvent).toBeInstanceOf(Array);
      expect(deletedEvent.length).toBe(0);
    });
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

  test.describe('Delete Operations', () => {
    // test that all attendance records are deleted when an event is deleted
    test('should delete all attendance records when an event is deleted', async ({
      request,
    }) => {
      let req = await request.get('/api/whoami');
      let user = await req.json();

      // Create a new event
      const event = generateEvent(user.id);
      // Save the event to the database
      await event.save();

      const eventId = event._id.toString();

      for (let i = 0; i < 30; i++) {
        try {
          await new Attendance({
            event: eventId,
            user: user.id,
          }).save();
        } catch (err) {
          if (err.code !== 11000) {
            console.log(err);
          }
        }
      }

      // now delete the event
      const response = await request.delete(`/api/events/${eventId}`);
      const body = await response.json();

      await expect(response.status()).toBe(HTTP.OK);
      await expect(body).toHaveProperty('message');
      await expect(body.message).toEqual('Event deleted successfully');

      // now check there are no attendance records left
      const recordAfterDelete = await Attendance.findOne({ event: eventId });
      console.log(recordAfterDelete);
      await expect(recordAfterDelete).toBeNull();
    });
    test('DELETE /events/:id deletes an event', async ({ request }) => {
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

    test('DELETE /events/:id returns 404 if no event is found', async ({
      request,
    }) => {
      // Make a request to the API to delete an event that we know doesn't exist
      const response = await request.delete(
        '/api/events/12a9db7cc7de36df18301234',
      );
      const body = await response.json();
      expect(response.status()).toBe(HTTP.NOT_FOUND);
      expect(body).toHaveProperty('message');
      expect(body.message).toBe(
        'No event found with ID: 12a9db7cc7de36df18301234',
      );
    });
  });
});
