import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CallbackPage = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    // check if the URL contains an authorization code
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      setError("Authorization code not found.");
      return;
    }

    // send a POST request to the Spotify Accounts Service to exchange the authorization code for an access token
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/callback", // replace with redirect URI
        client_id: "c5c2ed390b3b4a1faf1895f8c269d5a5", // replace with client ID
        client_secret: "6ada78b5f3b6433b901d4731841a670f", // replace with client secret
      }),
    };
    fetch("https://accounts.spotify.com/api/token", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          setAccessToken(data.access_token);
          localStorage.setItem('access_token', data.access_token); // store access token in localStorage
          router.push("/test-spotify"); // redirect to your home page
        } else if (data.error) {
          setError(data.error_description);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while exchanging the authorization code for an access token.");
      });
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {!error && !accessToken && <div>Exchanging authorization code for access token...</div>}
      {accessToken && <div>Access token: {accessToken}</div>}
    </div>
  );
};

export default CallbackPage;
