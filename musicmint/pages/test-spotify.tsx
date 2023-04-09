import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/pageStyles/marketplace.module.css';
import NavBar from '../components/navbar';

const TestSpotify = () => {
  const [artist, setArtist] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any>([]);
  let [accessToken, setAccessToken] = useState(window.document !== undefined ? localStorage.getItem("access_token") : "")

  useEffect(() => {
    console.log(accessToken); 
    if (accessToken != "") {
    
      const fetchData = async () => {
        try {
          // Fetch artist information
          const artistResponse = await axios.get(
            'https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // Fetch user information
          const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Fetch artist's top tracks
          const topTracksResponse = await axios.get(
            'https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ/top-tracks?market=US',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          setArtist(artistResponse.data);
          setUser(userResponse.data);
          setTopTracks(topTracksResponse.data.tracks);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    } else {
      setAccessToken(window.document !== undefined ? localStorage.getItem("access_token") : "")
    }
  }, [accessToken]);

  return (
    <div className={styles.marketplaceWrapper}>
      <NavBar />
      <div className={styles.container}>
        {user && (
          <>
            <h2>User Info</h2>
            <p>Name: {user.display_name}</p>
            <p>Email: {user.email}</p>
            <p>Country: {user.country}</p>
          </>
        )}

        {artist ? (
          <>
            <h2>Artist Info</h2>
            <h1>{artist.name}</h1>
            <img src={artist.images[0].url} alt={artist.name} />
            <p>Genres: {artist.genres.join(', ')}</p>
            <p>Popularity: {artist.popularity}</p>
            <p>Followers: {artist.followers.total}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        {topTracks.length > 0 && (
          <>
            <h2>Top Tracks</h2>
            <ul>
              {topTracks.map((track) => (
                <li key={track.id}>
                  {track.name} - {track.album.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TestSpotify;
