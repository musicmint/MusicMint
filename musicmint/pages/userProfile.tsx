import React, {useContext, useEffect, useState} from 'react'
import styles from '../styles/pageStyles/userprofile.module.css'
import NavBar from '../components/navbar'
import Banner from '../components/userProfileBanner';
import { Row, Form, Button } from 'react-bootstrap'
import ExampleBadge from '../components/examplebadge'
import { MarketplaceContext } from '../src/context/contracts';
import { PurchasedItem } from "../interfaces/PurchasedItem";
import {addIPFSProxy, loadMarketplaceItems, loadPurchasedItems} from "../components/loadMarketplaceItems";
import {ethers} from "ethers";

// ADD PROPS FOR SPECIFIC ARTISTS!!!!!

export default function UserPage() {

    const { nft, marketplace, accountWallet } = useContext(MarketplaceContext);
    const [purchases, setPurchases] = useState<PurchasedItem[]>([]);

    //here we get our imported loadPurchased items function, load the items, and set them
    // useEffect(() => {
    //     const fetchPurchasedItems = async () => {
    //         const items = await loadPurchasedItems(nft, marketplace, accountWallet);
    //         setPurchases(items);
    //     };
    //     fetchPurchasedItems();
    // }, []);

    return (

        <div className={styles.container}>
            <div className={styles.main}>
                <div style={{ zIndex: 2 }}>
                    <NavBar className={styles.marketNav} nft={nft} marketplace={marketplace} />
                </div >

                <div className={styles.artistProfile}>
                    <div className={styles.profPlaceholder}></div>
                    <div className={styles.overlay}></div>
                    <div className={styles.nameSection}>
                        <div className={styles.artistProfileName}>MASHA S.</div>
                        <div className={styles.bannerContainer}><Banner collected={purchases.length}/></div>
                    </div>
                </div>

                <div className={styles.formControlWrapper}>
                </div>
                <div className={styles.collectibles}>
                    <h2 className={styles.collectiblesTitle}>Purchased Collectibles</h2>
                    {/* <div className={styles.collectiblesList}> */}
                    <div className={styles.artistBadges}>
                        {purchases.length > 0 ?
                            <div className={styles.allCollectibles} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridColumnGap: "1rem", gridRowGap: "1rem" }}>
                                {purchases.map((item, idx) => (
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
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>

    )
}

