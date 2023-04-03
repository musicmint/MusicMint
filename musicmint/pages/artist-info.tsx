import { useEffect, useState } from 'react';
import axios from 'axios';

interface SpotifyUser {
  display_name: string;
  email: string;
  followers: {
    total: number;
  };
}

const ArtistInfo = () => {
  const [userData, setUserData] = useState<SpotifyUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setUserData(response.data);
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <p>Display Name: {userData.display_name}</p>
          <p>Email: {userData.email}</p>
          <p>Followers: {userData.followers.total}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArtistInfo;
