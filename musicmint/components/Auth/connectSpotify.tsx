import React, { useEffect, useState } from 'react';
import styles from '../../styles/AuthPage.styles/auth.module.css'

const ConnectSpotify = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if code parameter is present in query string
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // Exchange code for access token
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
      const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
      const authString = `${clientId}:${clientSecret}`;
      const base64AuthString = btoa(authString);

      fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${base64AuthString}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
      })
        .then(response => response.json())
        .then(data => setAccessToken(data.access_token))
        .catch(error => setError(error.message));
    }
  }, []);

  const handleSpotifyLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
    const scopes = 'user-read-private user-read-email';
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;

    window.location.href = spotifyAuthUrl;
  };

  return (
    <>
      <div className={styles.WalletWrapper}>
        <button className={styles.spotifyLoginButton} onClick={handleSpotifyLogin}>
          Log in with Spotify
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </div> 
    </>
  );
};

export default ConnectSpotify;
