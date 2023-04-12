// Created by Anneliese Breidsprecher & Masha Sedunova

import styles from '../styles/pageStyles/marketplace.module.css'
import NavBar from '../components/navbar'
import {useEffect, useState, useContext} from "react";
import { ethers } from "ethers"
import { Button } from 'react-bootstrap'
import SearchBar from '../components/searchBar'
import MarketBadge from '../components/marketplaceBadge'
import ExampleBadge from '../components/examplebadge'
import Following from '../components/allArtistsSection/following'
import AllArtists from '../components/allArtistsSection/allArtists'
import { MarketplaceContext } from '../src/context/contracts';
import { Item } from "../interfaces/Item";
import { addIPFSProxy, loadMarketplaceItems } from "../components/loadMarketplaceItems";

export default function Home(clsssyear, artistname) {

  const [activeTab, setActiveTab] = useState(1)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([]);
  const { nft, marketplace } = useContext(MarketplaceContext);

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems(nft, marketplace)
  }

  //here we get our imported loadMarketplace items function, load the items, and set them
  // useEffect(() => {
  //   const fetchMarketplaceItems = async () => {
  //     setLoading(true);
  //     const items = await loadMarketplaceItems(nft, marketplace);
  //     setItems(items);
  //     setLoading(false);
  //   };
  //   fetchMarketplaceItems();
  // }, []);
  //
  // if (loading) return (
  //     <main style={{ padding: "1rem 0" }}>
  //       <h2>Loading...</h2>
  //     </main>
  // )
  return (
    <div className ={styles.container}>
      {/* className={styles.nav}  */}
      <NavBar className={styles.marketNav} nft={nft} marketplace={marketplace} />
      {/* <SearchBar className={styles.searchSection} nft={nft} marketplace={marketplace}/> */}
      {/* <div className={styles.searchSection}> */}
        {/* <SearchBar className={styles.searchSection} nft={nft} marketplace={marketplace}/> */}
      {/* </div> */}
      
      {/* green cube */}
      <div className={styles.cubeStyling}>
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
      </div>

      {/* featured artists */}
      <div className={styles.artistWrapper}>
        <div className={styles.vandyArtists}>
          <p className={styles.vandyTxt}>Vanderbilt Artists</p>
          <div className={styles.artistBadges}>
          <MarketBadge classyear={'2023'} artistname={'Noah Silver'} endpoint = {'noahsilver'} />
          <MarketBadge classyear={'2023'} artistname={'Jace June'} endpoint = {'jacejune'}/>
          <MarketBadge classyear={'2023'} artistname={'Edgehill'} endpoint = {'edgehill'}/>
          <MarketBadge classyear={'2023 & 2024'} artistname={'Gold Revere'} endpoint={'goldrevere'}/>
          </div>
        </div>
      </div>

      {/* all artists with collectibles */}
      <div className={styles.blockWrapper}>
        <div className={styles.allArtists}>
          <div className={styles.top}>
            <p className={`${styles.followTxt} ${activeTab == 1 ? styles.activeTab : ""}`} onClick={()=>setActiveTab(1)}>All Artists</p>
            <p className={`${styles.followTxt} ${activeTab == 2 ? styles.activeTab : ""}`} onClick={()=>setActiveTab(2)}>Following</p>
          </div>
          <div className={styles.line}></div>
          {activeTab == 1 ? <AllArtists/> : <Following/> }

        </div>
      </div>

      {/* collectibles/badges section*/}
      <div className = {styles.collectiblesWrapper}>
      <div className = {styles.collectibles}>

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
                      showButton={true}
                  />
              ))}
            </div>
            : (
                <main style={{ padding: "1rem 0" }}>
                  <h2>No listed assets</h2>
                </main>
            )
        }
          <div className={styles.allCollectibles}>
            {/*<ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/><ExampleBadge/>*/}
          </div>
      </div>
      </div>
  
    </div>
  );
}
