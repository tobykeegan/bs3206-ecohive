'use client';
import { Button } from '@mui/joy';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// create a JoyUI component that redirects to the previous page
export default function GoBack() {
  const router = useRouter();
  return (
    <Button
      //   variant="outlined"
      //   color="neutral"
      onClick={() => router.back()}
      startDecorator={<ArrowBack />}
    >
      Go Back
    </Button>
  );
}
