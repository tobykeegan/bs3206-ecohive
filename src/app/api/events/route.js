import { connect } from '@/services/mongoose';
import getEvent from './GET';
import postEvent from './POST';
await connect();

/**
 * Top level routing for events API endpoints
 * @author Toby Keegan
 */
export async function GET(request) {
  return getEvent(request);
}

export async function POST(request) {
  return postEvent(request);
}
