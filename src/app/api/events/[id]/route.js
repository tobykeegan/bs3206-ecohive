/**
 * Main entry point for events management API
 * @author Toby Keegan
 */

import handleGet from './GET';
import handlePut from './PUT';
import handleDelete from './DELETE';

// Handles the GET request for retrieving an event by ID.
export async function GET(request, { params }) {
  return handleGet(params.id);
}

// Handles the PUT request for retrieving an event by ID.
export async function PUT(request, { params }) {
  return handlePut(params.id, request);
}

// Handles the DELETE request for deleting an event by ID.
export async function DELETE(request, { params }) {
  return handleDelete(params.id);
}
