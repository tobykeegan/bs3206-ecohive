'use client';
import axios from 'axios';
import loading from '@/static/loading.gif';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultEventImage from '@/static/default_event.jpeg';

/**
 *
 * @returns A NextJS Image component with the picture specified
 * by the id prop. If the id is not set, a default image is used.
 * @author Toby Keegan
 */
export default function EventPicture(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the image from the server
  useEffect(() => {
    const fetchImage = () => {
      // If the image is not set, don't try to fetch it
      if (!props.id) {
        setIsLoading(false);
      } else {
        // Fetch the image from the server
        axios
          .get(`/api/images?id=${props.id}`)
          .then((response) => {
            setImageUrl(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            if (error.response && error.response.status !== 404) {
              console.error('Failed to retrieve event image: ', error);
              setError(true);
            }
            setIsLoading(false);
          });
      }
    };
    fetchImage();
  }, [props.id]);

  if (isLoading) {
    return <Image src={loading} alt="Loading" {...props} />;
  }

  if (error || !imageUrl) {
    // If there is an error or the image is not set, grab a random image from the internet
    return (
      <Image
        src="https://picsum.photos/300/200"
        alt="Default event image"
        {...props}
      />
    );
  }

  return <Image src={imageUrl} alt="Event picture" {...props} />;
}
