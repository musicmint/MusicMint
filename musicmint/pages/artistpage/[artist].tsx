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
import {ethers} from "ethers";
import {Button} from "react-bootstrap";

interface Item {
    totalPrice: ethers.BigNumber;
    itemId: ethers.BigNumber;
    seller: string;
    name: string;
    description: string;
    image: string;
}
import axios from 'axios';


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

    //create proxy to access our project storage
    function addIPFSProxy(ipfsHash) {
        const URL = "https://musicminty.infura-ipfs.io/ipfs/"
        const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
        const ipfsURL = URL + hash

        console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
        return ipfsURL
    }

    const [activeTab, setActiveTab] = useState(1)
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<Item[]>([]);

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        console.log(nft)
        console.log(marketplace)
        console.log("starting loading")
        const itemCount = await marketplace.itemCount()
        console.log(itemCount)

        // create array for the items
        let items: Item[] = []


        for (let i = 1; i <= itemCount; i++) {


            const item = await marketplace.items(i)
            console.log(item)
            if (!item.sold) {

                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                console.log(uri)

                //we have to split it, and get the last part that's important. Super hacky, but that's life
                const uriParts = uri.split("/"); // split the string into an array of substrings
                const lastUriPart = uriParts.pop(); // get the last element of the array
                console.log(lastUriPart)

                //let's fetch
                const ipfsURL = addIPFSProxy(lastUriPart);
                const request = new Request(ipfsURL);
                const response = await fetch(request)


                console.log(response)

                //get the metadata
                const metadata = await response.json()

                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)

                //again, super hacky, but such is life
                const imageParts = (metadata.image).split("/"); // split the string into an array of substrings
                const lastImagePart = imageParts.pop(); // get the last element of the array

                const imagee = addIPFSProxy(lastImagePart);

                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: imagee
                })
            }
        }

        //leave only the artist nfts that match the artist name
        let filteredItems = items.filter(item => item.name === artistName);
        items = filteredItems;

        setLoading(false)
        setItems(items)
    }

    const buyMarketItem = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems()
    }


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
          setSpotifyID(data.spotify_id)
          console.log(data);
        }
      } else {
          console.log(response);
      }
    }
    useEffect(() => {
        console.log("trying to load")
        loadMarketplaceItems()
    }, [])
    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading...</h2>
        </main>
    )


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
                <div className={styles.overlay}></div>
                <div className={styles.nameSection}>
                  <div className={styles.artistProfileName}>{artistName}</div>
                  <div className={styles.bannerContainer}><VisibleBanner 
                  followers={spotifyData ? spotifyData.followers.total : 0}
                  />
                  </div>
                </div>
              </div>



              <div className={styles.collectibles}>
                <h2 className={styles.collectiblesTitle}>Avaliable Collectibles</h2>
                {/* <div className={styles.collectiblesList}> */}
                <div className={styles.artistBadges}>
                    <div className = {styles.artistAndSeeMore}>
                        <p className={styles.collectibleTxt}>Artist Collectibles</p>
                        <Button className={styles.seeMoreButton}>See more</Button>
                    </div>
                    {items.length > 0 ?
                        <div className={styles.allCollectibles} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gridColumnGap: "1rem", gridRowGap: "1rem" }}>
                            {items.map((item, idx) => (
                                <ExampleBadge
                                    onBuyClick={() => buyMarketItem(item)}
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
                                <h2>No listed assets</h2>
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
