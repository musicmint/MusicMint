import React, { useState } from 'react';
// import { SpotifyAuth } from 'react-spotify-auth';
// import 'react-spotify-auth/dist/index.css';
import styles from '../../styles/AuthPage.styles/auth.module.css'

const ConnectSpotify = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  return (
    <>
    <div className={styles.WalletWrapper}>
      {/* <SpotifyAuth
        redirectUri="http://localhost:3000/callback"
        clientID="c5c2ed390b3b4a1faf1895f8c269d5a5"
        scopes={['user-read-private', 'user-read-email']}
        onAccessToken={(token: string) => setAccessToken(token)}
        onError={(error: Error) => setError(error.message)}
        noCookie={true}
        btnClassName={styles.spotifyLoginButton}
        btnId="spotify-login-button"
      /> */}
      {error && <div className={styles.error}>{error}</div>}
    </div> 
    </>
  );
};

export default ConnectSpotify;
