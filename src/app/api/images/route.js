import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Image from '@/models/image';
import { GetImageURL } from '@/utils/images';

await connect();

/**
 * Upload an image to the database
 * @author Alec Painter
 */
export async function POST(req) {
  const reqBody = await req.json();
  let { image } = reqBody;
  const imageBuffer = Buffer.from(image.data, 'base64');
  try {
    const createResp = await Image.create({
      type: image.type,
      data: imageBuffer,
    });

    return NextResponse.json({ id: createResp.id }, { status: HTTP.CREATED });
  } catch (err) {
    logger.error(err);
    const errors = err.errors;
    return NextResponse.json(
      { message: errors[Object.keys(errors)[0]].message },
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}

/**
 * Get an image uri from the database via the ID
 * @author Alec Painter
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const imageID = queryParams.get('id');

  const imageURL = await GetImageURL(imageID);
  return new NextResponse(imageURL);
}
