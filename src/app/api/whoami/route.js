import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

/**
 * Sample get session endpoint used for testing
 * @author Alec Painter
 * @returns {NextResponse}
 */
export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json(session?.user ?? { error: 'Not logged in' });
}
