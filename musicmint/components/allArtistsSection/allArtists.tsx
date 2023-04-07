import React from 'react'
import styles from '../../styles/componentStyles/examplebadge.module.css'

const allArtists = (props) => {
    return (
      // whole badge
        <div className={styles.badge} >
          <div className={styles.img}></div>

          {/* NFT info section */}
          <div className={styles.info}>
            <div className={styles.top}>
              <p className={styles.nftName}>NFT Name</p>
            </div>

            {/* artist name, price, and artist page button */}
            <div className={styles.bottom}>
                <p className={styles.artistName}>Artist Name</p>
                <div className={styles.priceAndButton}>
                  <p className={styles.price}>$__</p>
                  <div className={styles.buttonSection}>
                    <button className={styles.artistPage}>Go To Artist</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
       
      )
}
export default allArtists