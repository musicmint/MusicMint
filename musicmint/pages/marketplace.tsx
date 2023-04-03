import { useState } from 'react';
import styles from '../styles/marketplace.module.css';
import NavBar from '../components/navbar';
import ArtistInfo from '../components/artist-info';

export default function Marketplace() {
  const [artistId, setArtistId] = useState(null);

  const handleArtistIdChange = (event) => {
    setArtistId(event.target.value);
  };

  return (
    <div className={styles.marketplaceWrapper}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.marketplaceTitle}>Marketplace</div>
        <div className={styles.marketplaceDescription}>
          You are on a marketplace page. Welcome!
        </div>
        <div className={styles.artistInfoWrapper}>
          <div className={styles.artistIdInputWrapper}>
            <label htmlFor="artistId">Artist ID:</label>
            <input type="text" id="artistId" onChange={handleArtistIdChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
