// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

// export default function Login() {
//   const router = useRouter();

//   useEffect(() => {
//     // Replace YOUR_CLIENT_ID with your actual client ID
//     const client_id = 'c5c2ed390b3b4a1faf1895f8c269d5a5';

//     // Replace REDIRECT_URI with the URI that you registered with Spotify
//     const redirect_uri = 'http://localhost:3000/callback';

//     // Replace STATE with a random string that you generate
//     const state = 'STATE';

//     const artistId = router.query.artistId as string;

//     const scopes = 'user-read-private user-read-email';

//     const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&state=${state}&scope=${encodeURIComponent(
//       scopes
//     )}&artistId=${artistId}`;

//     router.push(authUrl);
//   }, []);

//   return <div>Redirecting to Spotify login...</div>;
// }
