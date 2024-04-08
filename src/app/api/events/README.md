# The Events API

Author: Toby Keegan

## Getting started

The events API supports the following endpoints:

| Endpoint | Verb | Parameters | Returns | Description |
|----------|------|------------|-------------|-----------|
| `/api/events`  | `GET`        | None       | An array of Event Objects | Get all events |
| | `POST`   | `req.body: JSON`   | An array of Event Objects | Get events matching a Mongoose Query, provided in the `req.body`. This endpoint does the heavy lifting for most of the API - enabling you to filter by event sizes, owners, locations, and even tags. |
| `/api/events/:id` | `GET` | `id: string` | Event Object | Get a single event by ID. This is the same as providing `{ _id : "<ObjectId>"}` in a POST request to `/events`|
| | `PUT`    | `id: string` `req.body: JSON` | The newly updated Event Object | Update an existing event. Uses `findOneAndUpdate()` under the covers, so provide the event `id` in the URI, and the fields in which you want changed in the body. |
| | `DELETE` | `id: string`   | `200 OK` | Delete an event by ID |
| `/events/create` | `POST` | `req.body: JSON` | `201 CREATED` with the body containing the Event Object | Create a new event. The event object should be provided in the `req.body`. |