import React, { useContext, useEffect } from 'react'
import styles from '../styles/pageStyles/userprofile.module.css'
import NavBar from '../components/navbar'
import Banner from '../components/userProfileBanner';
import { Row, Form, Button } from 'react-bootstrap'
import ExampleBadge from '../components/examplebadge'

// ADD PROPS FOR SPECIFIC ARTISTS!!!!!

export default function UserPage(nft, marketplace) {

    return (

        <div className={styles.container}>
            <div className={styles.main}>
                <div style={{ zIndex: 2 }}>
                    <NavBar className={styles.marketNav} nft={nft} marketplace={marketplace} />
      

                </div>

                <div className={styles.artistProfile}>
                    <div className={styles.profPlaceholder}></div>
                    <div className={styles.overlay}></div>
                    <div className={styles.nameSection}>
                        <div className={styles.artistProfileName}>YOUR NAME</div>
                        <div className={styles.bannerContainer}><Banner /></div>
                    </div>
                </div>

                <div className={styles.formControlWrapper}>
                    
                    
                </div>


                <div className={styles.collectibles}>
                    <h2 className={styles.collectiblesTitle}>Purchased Collectibles</h2>
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

