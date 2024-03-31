import { NextResponse } from 'next/server';
import Event from '@/models/event';

import handleGet from './GET';
import handleDelete from './DELETE';

// Handles the GET request for retrieving an event by ID.
export async function GET(request, { params }) {
  return handleGet(params.id);
}

// Handles the DELETE request for deleting an event by ID.
export async function DELETE(request, { params }) {
  return handleDelete(params.id);
}
