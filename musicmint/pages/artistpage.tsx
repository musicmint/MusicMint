import styles from '../styles/AuthPage.styles/auth.module.css';
import NavBar from '../components/Auth/navbar';

export default function ArtistPage({data, error}) {
  console.log('data :>> ', data)
  console.log('error :>> ', error)

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

export async function getStaticProps() {
  let error = null
  let data = []

  try {
    const response = await fetch(`${process.env.BASE_URL}/smth`)
    data = await response.json();
    console.log("data is ")
    console.log(data)
  }
  catch (err) {
    console.log("error :>> ", err)
    error = err.message ? err.message : "Something went wrong"
  }

  return {
    props: {
      data: data,
      error: error,
    }
  }
}
