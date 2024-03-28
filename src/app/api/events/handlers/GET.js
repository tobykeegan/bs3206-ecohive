import Event from '@/models/event';
import { NextResponse } from 'next/server';

async function getEvents(request) {
  // create an empty object to store the search parameters
  let searchObject = {};

  // create a new URL object from the request URL
  let url = new URL(request.url);

  // iterate over the search parameters
  for (let [key, value] of url.searchParams) {
    // if the key is 'id', then we want to search for an event with that ID.
    // this is just to make it more readable for the user
    if (key === 'id') {
      searchObject._id = value;
    } else {
      // otherwise, add the key and value to the search object
      searchObject[key] = value;
    }
  }
  console.log(searchObject);
  // search for the event(s) in the database
  let eventsList = await Event.find(searchObject);

  switch (eventsList.length) {
    // No events were found, so return 404
    case 0:
      return NextResponse.json(
        {
          message: 'No events found matching:',
          search: searchObject,
        },
        {
          status: 404,
        },
      );

    // A single event matched, so return it
    case 1:
      return NextResponse.json(eventsList[0]);

    // More than one event matched, so return them all
    default:
      // if the search object has an _id key, then we should only have one event
      if (searchObject._id) {
        return NextResponse.json(
          {
            message: 'Hmm. Somehow we found more than one event with that ID.',
            search: searchObject,
          },
          {
            status: 500,
          },
        );
      } else {
        return NextResponse.json(eventsList);
      }
  }
}

/**
 * GET request to /api/events. Accepts query parameters to search for events.
 * For example, /api/events?id=12345 will search for an event with the ID of 12345.
 * If no events are found, a 404 response is returned.
 *
 * @author Toby Keegan
 */

export async function get_handler(request) {
  /**
   * First, check the headers for a query-type parameter.
   */
  const headers = new Headers(request.headers);
  const queryType = headers.get('query-type');
  console.log('QueryType: ' + queryType);
  switch (queryType) {
    /**
     * GET requests can return all events, or any matching that can be
     * achieved through URL parameters. This is all handled by the getEvents
     * function.
     */
    case '*':
    case 'all':
    case 'url':
      return getEvents(request);

    case 'filter':
      return NextResponse.json(
        {
          message:
            'Filtering requires a POST request with a body. Try using a POST request instead.',
        },
        {
          status: 405, // Method Not Allowed
        },
      );

    // If the query-type is not recognised, return a bad request status
    default:
      return NextResponse.json(
        {
          'message': 'Invalid query-type provided.',
          'provided': queryType,
          'valid-query-types': ['*', 'all', 'url'],
        },
        {
          status: 400, // Bad Request
        },
      );
  }
}
