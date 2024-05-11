import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';
import { connect } from '../../services/mongoose.service';

import handleGet from './GET';
import handlePost from './POST';
import handleDelete from './DELETE';
await connect();

// Handles the GET request for retrieving an event by ID.
export async function GET(request) {
  return handleGet(request);
}

// Handles the PUT request for retrieving an event by ID.
export async function POST(request) {
  return handlePost(request);
}

// Handles the DELETE request for deleting an event by ID.
export async function DELETE(request) {
  return handleDelete(request);
}
