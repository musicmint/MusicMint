
import styles from '../../styles/pageStyles/artistpage.module.css';
import NavBar from '../../components/navbar';
import { useRouter } from 'next/router';
import { useEffect, useState , useContext } from 'react';
import Image from 'next/image'
import ExampleBadge from '../../components/examplebadge';
import Wallet from '../../components/Auth/connectWallet';
import { MarketplaceContext } from '../../src/context/contracts';
import Banner from '../../components/artistBanner';
import VisibleBanner from '../../components/Banners/visibleBanner';

export default function ArtistPage({ }) {
    const router = useRouter()
    const artist = router.query.artist
    let [artistBio, setArtistBio] = useState<any>(null)
    let [artistName, setArtistName] = useState<any>(null)
    let [imageURL, setImageURL] = useState<any>(null)
    let [uploadedFile, setUploadedFile] = useState<any>(null)
    const { nft, marketplace } = useContext(MarketplaceContext)


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
          setImageURL(data.image_url)
          console.log(data);
        }
      } else {
          console.log(response);
      }
    } 


    let handleFileChange = async (event) => {
      const file = event.target.files[0];
    
      const formData = new FormData();
      formData.append('file', file);
      formData.append('artist_name', artistName);

    
      let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artists/upload_profile_image`, {
        method: 'POST',
        body: formData,
      }).then(response => response.json())
        .then(async result => {
          console.log('Image uploaded:', result);          
          setUploadedFile(URL.createObjectURL(file))
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }

    return (
        
      <div className={styles.container}>
       
        {artistName && artistBio ?
        <>
          <div className={styles.container}>
            <div className={styles.main}>
              <div style={{ zIndex: 2 }}>
                <NavBar nft={nft} marketplace={marketplace} />
              </div>

              <div className={styles.artistProfile}>
                <img className={styles.profPlaceholder} src="https://dummyimage.com/200x200/000/fff" alt="Artist profile" />
                {/* <div className={styles.profPlaceholder}></div> */}
                <div className={styles.overlay}></div>
                <div className={styles.nameSection}>
                  <div className={styles.artistProfileName}>{artistName}</div>
                  <div className={styles.bannerContainer}><VisibleBanner/></div>
                </div>
              </div>

              <div className={styles.collectibles}>
                <h2 className={styles.collectiblesTitle}>Avaliable Collectibles</h2>
                {/* <div className={styles.collectiblesList}> */}
                <div className={styles.artistBadges}>
                  <ExampleBadge />
                  <ExampleBadge />
                  <ExampleBadge />
                  <ExampleBadge />
                </div>
              </div>
            </div>

        
  
            <div className={styles.container}>
              <main className={styles.main}>
                <div className={styles.artistProfile}>
                  {/* <img className={styles.artistProfileImage} src="https://dummyimage.com/200x200/000/fff" alt="Artist profile" /> */}
                  
                  
                </div>
                <div className={styles.idk}>
                <div>UPLOAD YOUR PROFILE IMAGE</div>
                <img src={uploadedFile ? uploadedFile : imageURL} width="200" height="200" alt="profile pic" loading="eager"></img>
                <input type="file" onChange={handleFileChange} />
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
          </div>
        </>
        : <></>
        }
      </div>


    );
}
