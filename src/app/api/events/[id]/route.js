import { NextResponse } from 'next/server';
import Event from '@/models/event';

import handleGet from './GET';

export async function GET(request, { params }) {
  return handleGet(request, { params });
}
