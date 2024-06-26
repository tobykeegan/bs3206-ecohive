import axios from 'axios';
/**
 * Uploads an image to the database
 * @author Alec Painter
 * @param {file} file
 */
export async function UploadImage(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      console.log('No file provided for upload');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const image = reader.result.split(',')[1];
      try {
        const imageID = await uploadImageReq(image, file.type);
        resolve(imageID);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsDataURL(file);
  });
}

/**
 * [Internal] Post request to upload a new image
 * @author Alec Painter
 * @param {string} image
 * @param {string} type
 * @returns {string} image id / error
 */
async function uploadImageReq(image, type) {
  try {
    const response = await axios.post(
      `/api/images`,
      {
        image: {
          type: type,
          data: image,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.id;
  } catch (err) {
    throw new Error(`Failed to upload image to database: ${err.message}`);
  }
}
