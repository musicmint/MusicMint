import styles from '../styles/pageStyles/artistpage.module.css';

import NavBar from '../components/navbar';
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useState, useContext } from 'react'
import { ethers } from "ethers"
import ExampleBadge from '../components/examplebadge'
import { MarketplaceContext } from '../src/context/contracts';

const projectId = '2NTlPAsbm2qHgQi2tpi7cebBnNd';   // <---------- your Infura Project ID

const projectSecret = 'cef0ed12c92e5a9a981a156c2f4f7d84';  // <---------- your Infura Secret
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

export default function ArtistPage({ data, error}) {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { nft, marketplace } = useContext(MarketplaceContext);

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
    console.log("Minteddddd")
    if (!image || !price || !name || !description) return
    try {
      console.log("Minteddddd1")
      const result = await client.add(JSON.stringify({ image, price, name, description }))
      mintThenList(result)
      console.log("Minteddddd2")
    } catch (error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    console.log("Minteddddd2")
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

  return (
    
      <div className={styles.container}>
        <div className={styles.main}>
          <div style={{ zIndex: 2 }}>
            <NavBar nft={nft} marketplace={marketplace} />
          </div>

          <div className={styles.artistProfile}>
            <div className={styles.profPlaceholder}></div>
            <div className={styles.overlay}></div>
            <div className={styles.artistProfileName}>ARTIST NAME</div>
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
                    fontFamily: "Lexend, sans-serif"
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
                    fontFamily: "Lexend, sans-serif"
                  }}
                />
              </div>

              {/* CREATE NFT SECTION */}
              <div className={styles.forms}>
                <p className={styles.instructions}>You're ready to go!</p>
                <Button className={styles.createButton} onClick={createNFT}> Create Collectible </Button>
              </div>
            </div>
          </div>
      

          <div className={styles.collectibles}>
            <h2 className={styles.collectiblesTitle}>Your Unpurchased Collectibles</h2>
            {/* <div className={styles.collectiblesList}> */}
              <div className={styles.artistBadges}>
                <ExampleBadge />
                <ExampleBadge />
                <ExampleBadge />
                <ExampleBadge />
              </div>

            {/* </div> */}


          </div>
        </div>


       
      </div>
    
  )
}