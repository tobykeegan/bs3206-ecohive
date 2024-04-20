import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import Image from '@/models/image';

await connect();

/**
 * Returns an imageURL for an image stored in the database
 * @author Alec Painter
 * @param {string} imageId
 * @returns {string} imageUrl
 */
export async function GetImageURL(imageId) {
  try {
    const image = await Image.findById(imageId);
    if (!image) {
      return null;
    }
    const headers = new Headers();
    headers.set('Content-Type', image.type);

    const imageData = Buffer.from(image.data, 'binary').toString('base64');
    const imageURL = `data:${image.type};base64,${imageData}`;
    return imageURL;
  } catch (err) {
    logger.error(`Failed to parse image into URL: ${err}`);
    return null;
  }
}
