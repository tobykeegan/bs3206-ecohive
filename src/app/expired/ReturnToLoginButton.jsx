'use client';
import { Button } from '@mui/joy';
import { useRouter } from 'next/navigation';

export default function ReturnToLoginButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push('/api/auth/signin');
      }}
      size="lg"
      id="loginButton"
    >
      Return to Login
    </Button>
  );
}
