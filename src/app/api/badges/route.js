import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import Badge from '@/models/badge';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Fetches all badges so they can be rendered.
 * @author Jade Carino
 */
export async function GET() {
  logger.debug(`Fetching all badges.`);

  let badges = await Badge.find();

  return NextResponse.json({ badges: badges }, { status: HTTP.OK });
}
