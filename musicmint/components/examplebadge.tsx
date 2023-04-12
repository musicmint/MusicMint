// Created by Anneliese Breidsprecher

import React from 'react'
import styles from '../styles/componentStyles/examplebadge.module.css'

const ExampleBadge = (props) => {
    console.log(props.description)
    const handleBuyClick = () => {
        props.onBuyClick()
    }
    return (
      // whole badge
        <div className={styles.badge} >
          <div className={styles.img}> <img src={props.image} width={220} height={235}/> </div>

          {/* NFT info section */}
          <div className={styles.info}>
            <div className={styles.top}>
              <p className={styles.nftName}>{props.name}</p>
            </div>

            {/* artist name, price, and artist page button */}
            <div className={styles.bottom}>
                <p className={styles.artistName}>{props.desc}</p>
                <div className={styles.priceAndButton}>
                  <p className={styles.price}>{props.price} ETH</p>
                  <div className={styles.buttonSection}>
                    <button className={styles.artistPage} onClick={handleBuyClick}>buy nft</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
       
      )
}
export default ExampleBadge
