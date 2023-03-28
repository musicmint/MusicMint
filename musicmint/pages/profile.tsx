import styles from '../styles/AuthPage.styles/auth.module.css';
import NavBar from '../components/navbar';
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
//const { CID } = require('ipfs-http-client')
import { useState } from 'react'
import { ethers } from "ethers"

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

export default function ArtistPage({data, error, nft, marketplace}) {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

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
      const result = await client.add(JSON.stringify({image, price, name, description}))
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
    <>
      <div className={styles.artistWrapper}> 
        <NavBar nft={nft} marketplace={marketplace}/>
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
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                  type="file"
                  required
                  name="file"
                  //UNCOMMENT TO ADD TO STORAGE
                  //onChange={uploadToIPFS}
                  style={{borderRadius: "20px", border: "2px solid #1DB954",}}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text"
                            placeholder="Name"
                            style={{
                              borderRadius: "20px",
                              border: "2px solid #1DB954"
                            }}/>
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required
                            as="textarea" placeholder="Description"
                            style={{
                              borderRadius: "20px",
                              border: "2px solid #1DB954"
                            }}/>
              <Form.Control onChange={(e) => setPrice(parseFloat(e.target.value))} size="lg" required type="number"
                            placeholder="Price in ETH"
                            style={{
                              borderRadius: "20px",
                              border: "2px solid #1DB954"
                            }}/>
              <div
                  style={{
                    display: "inline-block",
                    borderRadius: "10px",
                    overflow: "hidden"
                  }} className="d-grid px-0">
                {/*<Button*/}
                {/*    className="btn btn-primary btn-lg rounded-pill px-5"*/}
                {/*    style={{*/}
                {/*      background: "#1DB954",*/}
                {/*      border: "none",*/}
                {/*      borderRadius: "10px",*/}
                {/*      color: "white",*/}
                {/*      fontFamily: "Helvetica",*/}
                {/*      fontSize: "18px",*/}
                {/*      fontWeight: "bold",*/}
                {/*      padding: "12px 36px",*/}
                {/*      textAlign: "center",*/}
                {/*      textDecoration: "none",*/}
                {/*      display: "inline-block",*/}
                {/*      margin: "4px 2px",*/}
                {/*      cursor: "pointer"*/}
                {/*    }} onClick={createNFT} variant="primary" size="lg">*/}
                {/*  Create & List NFT!*/}
                {/*</Button>*/}
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  )
}