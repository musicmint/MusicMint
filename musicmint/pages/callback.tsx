import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      router.push('/test-spotify');
    } else {
      console.error('Access token not found in URL');
    }
  }, []);

  return <div>Logging in...</div>;
}
