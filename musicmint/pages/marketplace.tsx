// Created by Anneliese Breidsprecher & Masha Sedunova

import styles from '../styles/pageStyles/marketplace.module.css'
import NavBar from '../components/navbar'
import {useEffect, useState, useContext} from "react";
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import SearchBar from '../components/searchBar'
import MarketBadge from '../components/marketplaceBadge'
import ExampleBadge from '../components/examplebadge'
import Following from '../components/allArtistsSection/following'
import { MarketplaceContext } from '../src/context/contracts';
import is from "@sindresorhus/is";
import formData = is.formData;
import {create as ipfsHttpClient} from "ipfs-http-client";


interface Item {
  totalPrice: ethers.BigNumber;
  itemId: ethers.BigNumber;
  seller: string;
  name: string;
  description: string;
  image: string;
}


export default function Home(clsssyear, artistname) {

  //create proxy to access our project storage
  function addIPFSProxy(ipfsHash) {
    const URL = "https://musicminty.infura-ipfs.io/ipfs/"
    const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
    const ipfsURL = URL + hash

    console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
    return ipfsURL
  }

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([]);
  const { nft, marketplace } = useContext(MarketplaceContext);

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
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
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
  return (
    <div className ={styles.container}>
      {/* className={styles.nav}  */}
      <NavBar className={styles.marketNav} nft={nft} marketplace={marketplace} />
      {/* <SearchBar className={styles.searchSection} nft={nft} marketplace={marketplace}/> */}
      {/* <div className={styles.searchSection}> */}
        {/* <SearchBar className={styles.searchSection} nft={nft} marketplace={marketplace}/> */}
      {/* </div> */}
      
      {/* green cube */}
      <div className={styles.greenCube}>
        <div className={styles.cubeTxt}>
          <p className={styles.artistTxt}>Trade your favorite artist&apos;s collectibles.</p>
          <p className={styles.descTxt}>A marketplace for you to buy and sell unique,
            single-edition digital artwork from the artists you love.</p>
          <div className={styles.buttonSection}>
            <Button className={styles.exploreButton}>Start Exploring</Button>
          </div>
        </div>
      </div>

      {/* featured artists */}
      <div className={styles.artistWrapper}>
        <div className={styles.vandyArtists}>
          <p className={styles.vandyTxt}>Vanderbilt Artists</p>
          <div className={styles.artistBadges}>
          <MarketBadge classyear={'2023'} artistname={'Noah Silver'}/>
          <MarketBadge classyear={'2023'} artistname={'Jace June'}/>
          <MarketBadge classyear={' '} artistname={'Edgehill'}/>
          <MarketBadge classyear={' '} artistname={'Gold Revere'}/>
          </div>
        </div>
      </div>

      {/* all artists with collectibles */}
      <div className={styles.blockWrapper}>
        <div className={styles.allArtists}>
          <div className={styles.top}>
            <p className={styles.followTxt}>All Artists</p>
            <p className={styles.followTxt}>Following</p>
          </div>
          <div className={styles.line}></div>
          <Following/>
        </div>
      </div>

      {/* collectibles/badges section*/}
      <div className = {styles.collectiblesWrapper}>
      <div className = {styles.collectibles}>
          <div className = {styles.artistAndSeeMore}>
            <p className={styles.collectibleTxt}>Artist Collectibles</p>
            <Button className={styles.seeMoreButton}>See more</Button>
          </div>
          <div className={styles.allCollectibles}>
            <ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/>
          </div>
          <div className={styles.allCollectibles}>
            <ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/>
          </div>
      </div>
      </div>

      
      <div className="flex justify-center">
        
        {/*FOR REAL IT SHOULD BE >0*/}
        {items.length > 0 ?
            <div className="px-5 container">
              <Row xs={1} md={2} lg={4} className="g-4 py-5">
                {items.map((item, idx) => (
                    <Col key={idx} className="overflow-hidden">
                      <Card>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body color="secondary">
                          <Card.Title>{item.name}</Card.Title>
                          <Card.Text>
                            {item.description}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <div className='d-grid'>
                            <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                              Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                            </Button>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                ))}
              </Row>
            </div>
            : (
                <main style={{ padding: "1rem 0" }}>
                  <h2>No listed assets</h2>
                </main>
            )}
      </div>
  
    </div>
  );
}
