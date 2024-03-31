# The Events API

Author: Toby Keegan

## Getting started

The events API supports the following endpoints:

| Endpoint | Verb | Parameters | Description |
|----------|------|------------|-------------|
| `/events`  | `GET`        | None       | Get all events |
| | `POST`   | `req.body: JSON`   | Get events matching a Mongoose Query, provided in the `req.body`. This endpoint does the heavy lifting for most of the API - enabling you to filter by event sizes, owners, locations, and even tags. |
| `/events/:id` | `GET` | `id: string` | Get a single event by ID. This is the same as providing `{ _id : "<ObjectId>"}` in a POST request to `/events`|
| | `PUT`    | `id: string` `req.body: JSON`| Update an existing event. Uses `findOneAndUpdate()` under the covers, so provide the event `id` in the URI, and the fields in which you want changed in the body. |
| | `DELETE` | `id: string`   | Delete an event by ID |
| `/events/create` | `POST` | `req.body: JSON` | Create a new event. The event object should be provided in the `req.body`. |