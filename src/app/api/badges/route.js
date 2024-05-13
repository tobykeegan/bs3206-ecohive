import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import Badge from '@/models/badge';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * GET request to /api/badges. Retrieves all badges from the database
 * so they can be rendered on the Impact page.
 *
 * @returns {NextResponse} - A next response containing an array of all badges.
 *
 * @author Jade Carino
 */
export async function GET() {
  logger.debug(`Fetching all badges.`);

  let badges = await Badge.find();

  return NextResponse.json({ badges: badges }, { status: HTTP.OK });
}
