
import styles from '../../styles/AuthPage.styles/auth.module.css';
import NavBar from '../../components/navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function ArtistPage({ }) {
    const router = useRouter()
    const artist = router.query.artist
    let [artistBio, setArtistBio] = useState<any>(null)
    let [artistName, setArtistName] = useState<any>(null)


    useEffect(() => {
      if (artist) getArtistInfo()
    }, [artist])

    let getArtistInfo = async () => {
      let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artists/get`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"artist_name": artist})
      })

      let data = await response.json()

      if (await response.status === 200) {
        if (Object.keys(data).includes("error")) {
          router.push("/404")
        } else {
          setArtistBio(data.artist_bio)
          setArtistName(data.artist_name)
          console.log(data);
        }
      } else {
          console.log(response);
      }
    } 

    return (
        <>
        {artistName && artistBio ?
        <>
        <div className={styles.artistWrapper}> 
          <NavBar/>
        </div>
  
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.artistProfile}>
              <img className={styles.artistProfileImage} src="https://dummyimage.com/200x200/000/fff" alt="Artist profile" />
              <h1 className={styles.artistProfileName}>ARTIST NAME: {artistName}</h1>
              <p className={styles.artistProfileBio}>
                {artistBio}
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
        : <></>
    }
      </>


    );
}
