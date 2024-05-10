'use client';
import { Button } from '@mui/joy';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import styles from '@/styles/events/styles';

/**
 * @returns Simple button that navigates back to the previous page
 * @author Toby Keegan
 */
export default function GoBack() {
  const router = useRouter();
  return (
    <Button
      id="back-btn"
      onClick={() => router.back()}
      startDecorator={<ArrowBack />}
    >
      Go Back
    </Button>
  );
}
