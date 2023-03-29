import axios from 'axios';
import querystring from 'querystring';

// Replace these values with your own
const CLIENT_ID = "c5c2ed390b3b4a1faf1895f8c269d5a5";
const CLIENT_SECRET = "6ada78b5f3b6433b901d4731841a670f";
const REDIRECT_URI = "http://localhost:3000/api/callback";


export const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getAccessToken(code: string) {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in,
    };
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

export async function getArtist(accessToken: string) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching artist:', error);
    throw error;
  }
}
export const setAccessToken = (token: string) => {
    spotifyApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
  
export default spotifyApi;

