import { NextResponse } from 'next/server';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';
import { get_handler } from './handlers/GET';
import { post_handler } from './handlers/POST';
await connect();

/**
 * Top level routing for events API endpoints
 * @author Toby Keegan
 */
export async function GET(request) {
  return get_handler(request);
}

export async function POST(request) {
  return post_handler(request);
}
