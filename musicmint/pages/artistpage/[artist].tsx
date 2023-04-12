import styles from '../../styles/pageStyles/individualArtist.module.css';
import NavBar from '../../components/navbar';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import Image from 'next/image'
import ExampleBadge from '../../components/examplebadge';
import Wallet from '../../components/Auth/connectWallet';
import { MarketplaceContext } from '../../src/context/contracts';
import Banner from '../../components/artistBanner';
import VisibleBanner from '../../components/Banners/visibleBanner';
import { ethers } from "ethers";
import { Button } from "react-bootstrap";
import { Item } from "../../interfaces/Item";
import axios from 'axios';
import { addIPFSProxy, loadMarketplaceItems } from "../../components/loadMarketplaceItems";

export default function ArtistPage({ }) {
  const router = useRouter()
  const artist = router.query.artist
  let [artistBio, setArtistBio] = useState<any>(null)
  let [artistName, setArtistName] = useState<any>(null)
  let [imageURL, setImageURL] = useState<any>(null)
  let [spotifyID, setSpotifyID] = useState<any>(null)
  let [spotifyData, setSpotifyData] = useState<any>(null)
  let [uploadedFile, setUploadedFile] = useState<any>(null)
  const { nft, marketplace } = useContext(MarketplaceContext)
  const [items, setItems] = useState<Item[]>([]);

  //here we get our imported loadMarketplace items function, load the items, and set them
  // useEffect(() => {
  //     const fetchMarketplaceItems = async () => {
  //         const items = await loadMarketplaceItems(nft, marketplace);
  //         setItems(items);
  //
  //         //leave only the artist nfts that match the artist name
  //         let filteredItems = items.filter(item => item.description === artistName);
  //         setItems(filteredItems);
  //     };
  //     fetchMarketplaceItems();
  // }, []);


  // const [artist, setArtist] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [topTracks, setTopTracks] = useState<any>([]);
  let [accessToken, setAccessToken] = useState(window.document !== undefined ? localStorage.getItem("access_token") : "")
  // const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (spotifyID) {
      console.log(spotifyID)
      console.log(accessToken);
      if (accessToken != "") {

        const fetchData = async () => {
          try {
            // Fetch artist information
            const artistResponse = await axios.get(
              `https://api.spotify.com/v1/artists/${spotifyID}`,
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
              `https://api.spotify.com/v1/artists/${spotifyID}/top-tracks?market=US`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            setSpotifyData(artistResponse.data);
            console.log(artistResponse.data)
            setTopTracks(topTracksResponse.data.tracks);
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      } else {
        setAccessToken(window.document !== undefined ? localStorage.getItem("access_token") : "")
      }
    }
  }, [spotifyID]);

  useEffect(() => {
    if (artist) getArtistInfo()
  }, [artist])

  let getArtistInfo = async () => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artists/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "artist_name": artist })
    })

    let data = await response.json()

    if (await response.status === 200) {
      if (Object.keys(data).includes("error")) {
        router.push("/404")
      } else {
        setArtistBio(data.artist_bio)
        setArtistName(data.artist_name)
        setImageURL(data.image_url)
        setSpotifyID(data.spotify_id)
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
                <img className={styles.profPlaceholder} src={spotifyData ? spotifyData.images[0].url : "https://dummyimage.com/200x200/000/fff"} alt="Artist profile" />
                {/* <div className={styles.profPlaceholder}></div> */}
                
                <div className={styles.nameSection}>
                  <div className={styles.artistProfileName}>{artistName}</div>
                  <div className={styles.bannerContainer}><VisibleBanner
                    followers={spotifyData ? spotifyData.followers.total : 0}
                  />
                  </div>
                </div>
              </div>

              <div className={styles.collectibles}>
                <h2 className={styles.collectiblesTitle}>Available Collectibles</h2>
                {/* <div className={styles.collectiblesList}> */}
                <div className={styles.artistBadges}>
                  <div className={styles.artistAndSeeMore}>

                    <p className={styles.instructions}>Artist Collectibles</p>

                    <Button className={styles.seeMoreButton}>See more</Button>
                  </div>
                  {items.length > 0 ?
                    <div className={styles.allCollectibles} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridColumnGap: "1rem", gridRowGap: "1rem" }}>
                      {items.map((item, idx) => (
                        <ExampleBadge
                          //onBuyClick={() => buyMarketItem(item)}
                          name={item.name}
                          image={item.image}
                          desc={item.description}
                          price={ethers.utils.formatEther(item.totalPrice)}
                          key={idx}
                        />
                      ))}
                    </div>
                    : (
                      <main style={{ padding: "1rem 0" }}>
                        <div className = {styles.instructions}>No Listed Assets</div>
                      </main>
                    )
                  }
                </div>
              </div>
            </div>
            <div className={styles.container}>
              <main className={styles.main}>
                
                <div className={styles.artistProfile}>
                  {/* <img className={styles.artistProfileImage} src="https://dummyimage.com/200x200/000/fff" alt="Artist profile" /> */}


                </div>
                {/*
                <div className={styles.instructions}>
                  <div>UPLOAD YOUR PROFILE IMAGE</div>
                  <img src={uploadedFile ? uploadedFile : imageURL} width="200" height="200" alt="profile pic" loading="eager"></img>
                  <input type="file" onChange={handleFileChange} />
                </div> */}

                <div className={styles.instructions}>

                  <h2 className={styles.collectiblesTitle}>Top Songs</h2>
                  <div style={{ textAlign: "center" }}>
                    {topTracks.length > 0 && (
                      <p>
                        {topTracks.map((track) => (
                          <div key={track.id}>
                            {track.name} 
                          </div>
                        ))}
                      </p>
                    )}
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
