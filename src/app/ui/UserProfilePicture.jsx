import axios from 'axios';
import loading from '@/static/loading.gif';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * User Profile Picture component
 * @author Alec Painter
 * @param {any} props
 * @returns {JSX.Element}
 */
export default function UserProfilePicture(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = () => {
      axios
        .get('/api/users/image')
        .then((response) => {
          setImageUrl(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.status !== 404) {
            console.error('Failed to retrieve user profile image: ', error);
            setError(true);
          }
          setIsLoading(false);
        });
    };
    fetchImage();
  }, []);

  if (isLoading) {
    return <Image src={loading} alt="Loading" {...props} />;
  }

  if (error || !imageUrl) {
    return <FaUser {...props} />;
  }

  return <Image src={imageUrl} alt="User profile picture" {...props} />;
}
