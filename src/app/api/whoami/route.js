import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    message: session?.user ?? 'Not session available / Not logged in',
  });
}
