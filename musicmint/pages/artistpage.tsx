import styles from '../styles/AuthPage.styles/auth.module.css';
import NavBar from '../components/navbar';

export default function ArtistPage() {

  return (
    <>
      <div className={styles.artistWrapper}> 
        <NavBar/>
      </div>

      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.artistProfile}>
            <img className={styles.artistProfileImage} src="https://dummyimage.com/200x200/000/fff" alt="Artist profile" />
            <h1 className={styles.artistProfileName}>ARTIST NAME</h1>
            <p className={styles.artistProfileBio}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus augue id nisi semper, sit amet hendrerit tortor ultricies.
            </p>
            
          </div>


          <div className={styles.collectibles}>
          <div className={styles.authPageDivider}>New Collection</div>
            <h2 className={styles.collectiblesTitle}>Collectibles</h2>
            <div className={styles.collectiblesList}>
              <img className={styles.collectibleImage} src="https://dummyimage.com/150x150/000/fff" alt="Collectible 1" />
              <img className={styles.collectibleImage} src="https://dummyimage.com/150x150/000/fff" alt="Collectible 2" />
              <img className={styles.collectibleImage} src="https://dummyimage.com/150x150/000/fff" alt="Collectible 3" />
              <img className={styles.collectibleImage} src="https://dummyimage.com/150x150/000/fff" alt="Collectible 4" />
              <img className={styles.collectibleImage} src="https://dummyimage.com/150x150/000/fff" alt="Collectible 5" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}