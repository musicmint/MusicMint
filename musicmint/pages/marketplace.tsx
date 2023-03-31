import styles from '../styles/marketplace.module.css'
import NavBar from '../components/navbar'
import {useEffect, useState} from "react";
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import SearchBar from '../components/searchBar'

interface Item {
  totalPrice: ethers.BigNumber;
  itemId: ethers.BigNumber;
  seller: string;
  name: string;
  description: string;
  image: string;
}

export default function Home(nft, marketplace) {

  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([]);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount
    let items: Item[] = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
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
     
      <div className={styles.search}>
        <SearchBar nft={nft} marketplace={marketplace}/>
      </div>
      
      {/* green cube */}
      <div className={styles.greenCube}>
        <div className={styles.cubeTxt}>
          <p className={styles.artistTxt}>Trade your favorite artist's collectibles.</p>
          <p className={styles.descTxt}>A marketplace for people to buy and sell unique,
            single-edition digital artwork from the artists they love.</p>
          <div className={styles.buttonSection}>
            <Button className={styles.exploreButton}>Start Exploring</Button>
          </div>
        </div>
      </div>

      {/* featured artists */}
      <div className={styles.vandyArtists}>
        <p className={styles.vandyTxt}>Vanderbilt Artists</p>
      </div>
      
      <div className="flex justify-center">
        
        {/*FOR REAL IT SHOULD BE >0*/}
        {items.length == 0 ?
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