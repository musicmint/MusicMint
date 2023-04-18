import styles from '../styles/pageStyles/artistpage.module.css';
// import EditIcon from '@mui/icons-material/Edit';
import NavBar from '../components/navbar';
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useState, useContext, useEffect } from 'react'
import { ethers } from "ethers"
import ExampleBadge from '../components/Badges/examplebadge'
import { MarketplaceContext } from '../src/context/contracts';
import Banner from '../components/Banners/artistBanner';
import { render } from "react-dom";
import AuthContext from '../src/context/auth';
import { useRouter } from 'next/router';
import { addIPFSProxy, loadMarketplaceItems } from "../components/loadMarketplaceItems";
import {Item} from "../interfaces/Item";



const projectId = process.env["SECRET_INFURA_ID "];   // <---------- your Infura Project ID

const projectSecret = process.env["SECRET_INFURA_KEY "];  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

// if (typeof window !== 'undefined'){
// document.addEventListener("DOMContentLoaded", function() {
// if (typeof window !== 'undefined') {
  
//     const button = document.getElementById("editButton")!;

// button.addEventListener("mouseenter", () => {
//   if (button) {
//     render(<span><EditIcon /></span>, button);
//   }
// });

// button.addEventListener("mouseleave", () => {
//   if (button) {
//   button.innerHTML = "Hover me";
//   }
// });
// }
// });
// }



export default function ArtistPage({ data, error}) {

    // nft variables
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('') ///THIS WILL BE USED FOR ARTIST NAME
  const [items, setItems] = useState<Item[]>([]);

  const { nft, marketplace } = useContext(MarketplaceContext);
  const { user, getUserInfo, isAuthorized} = useContext(AuthContext);

  const router = useRouter()
  // if the enpoint is reached by a non-artist user, go to 404
  useEffect(() => {
    console.log(user);
    
    if (user.email !== "" && !user.is_artist) {      
      router.push("/404")
    }
  }, [user])

    useEffect(() => {
        setDescription("Mr. Commodore")
    })

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
    }
    console.log(router);
    
  }, [isAuthorized])

  const uploadToIPFS = async (event) => {

    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error) {
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
      console.log(description)
    if (!image || !price || !name || !description) return
    try {
      const result = await client.add(JSON.stringify({ image, price, name, description}))
      mintThenList(result)
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft
    await (await nft.mint(uri)).wait()
    // get tokenId of new nft
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }

    // useEffect(() => {
    //     const fetchMarketplaceItems = async () => {
    //         const items = await loadMarketplaceItems(nft, marketplace);
    //         setItems(items);
    //
    //         //leave only the artist nfts that match the artist name
    //         let filteredItems = items.filter(item => item.description === user.full_name);
    //         setItems(filteredItems);
    //     };
    //     fetchMarketplaceItems();
    // }, []);


  return (
    
      <div className={styles.container}>
        <div className={styles.main}>
          <div style={{ zIndex: 2 }}>
            <NavBar nft={nft} marketplace={marketplace} />
          </div>

          <div className={styles.artistProfile}>
            <div className={styles.profPlaceholder}></div>
            <Button  className={styles.overlay} id="editButton"></Button>
            <div className={styles.nameSection}>
              <div className={styles.artistProfileName}>{user.full_name}</div>
              <div className={styles.bannerContainer}><Banner/></div>
            </div>
          </div>

          <div className={styles.formControlWrapper}>
            <p className={styles.minting}>Get minting!</p>
            <div className={styles.all}>

              {/* NAME SECTION */}
              <div className={styles.forms}>
                <p className={styles.instructions}>Give your collectible a name:</p>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  required
                  type="text"
                  placeholder="Ex: Midnights Number 1 Fan"
                  style={{
                    display: "flex",
                    width: "100%",
                    borderRadius: "50px",
                    outline: "none",
                    backgroundColor: "#f7f7f7",
                    color: "#333",
                    fontSize: "15px",
                    padding: "10px 70px",
                    justifyContent: "center",
                    textAlign: "center",
                    fontFamily: "Lexend, sans-serif"
                  }}
                />
              </div>
            
              {/* PRICE SECTION */}
              <div className={styles.forms}>
                <p className={styles.instructions}>Give it a price. The collector will cover the cost of minting.</p>
                <Form.Control
                  onChange={(e) => setPrice(e.target.value as any)}
                  size="lg"
                  required
                  type="number"
                  placeholder="Price in ETH"
                  style={{
                    display: "flex",
                    width: "40%",
                    borderRadius: "50px",
                    backgroundColor: "#f7f7f7",
                    color: "#333",
                    fontSize: "15px",
                    padding: "10px 1px",
                    justifyContent: "center",
                    textAlign: "center",
                    fontFamily: "Lexend, sans-serif",
                    outline: "none"
                  }}
                />
              </div>
              
              {/* IMAGE SECTION */}
              <div className={styles.forms}>
                <p className={styles.instructions}>Pick an image for your collectible.
                  Collectors are more likely to purchase if they see an image they like!</p>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  // UNCOMMENT TO ADD TO STORAGE
                  onChange={uploadToIPFS}
                  style={{
                    borderRadius: "50px",
                    backgroundColor: "#f7f7f7",
                    color: "#333",
                    fontSize: "16px",
                    padding: "10px 15px",
                    alignSelf: "end",
                    fontFamily: "Lexend, sans-serif",
                    outline: "none",
                  }}
                />
              </div>

              {/* CREATE NFT SECTION */}
              <div className={styles.forms}>
                <p className={styles.instructions}>You&apos;re ready to go!</p>
                <Button className={styles.createButton} onClick={createNFT}> Create Collectible </Button>
              </div>
            </div>
          </div>
          <div className={styles.collectibles}>
            <h2 className={styles.collectiblesTitle}>Your Avaliable Collectibles</h2>
            {/* <div className={styles.collectiblesList}> */}
            {/*  <div className={styles.artistBadges}>*/}
                  {items.length > 0 ?
                      <div className={styles.allCollectibles} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit)", gridColumnGap: "1rem", gridRowGap: "1rem" }}>
                          {items.map((item, idx) => (
                              <ExampleBadge
                                  //onBuyClick={() => buyMarketItem(item)}
                                  name={item.name}
                                  image={item.image}
                                  desc={item.description} //should be this lol item.description
                                  price={ethers.utils.formatEther(item.totalPrice)}
                                  key={idx}
                                  showButton={false}
                              />
                          ))}
                      </div>
                      : (
                          <main style={{ padding: "1rem 0" }}>
                              <div className = {styles.instructions}>No Listed Assets</div>
                          </main>
                      )
                  }
              {/*</div>*/}
            {/* </div> */}
          </div>
        </div>
      </div>
    
  )
}