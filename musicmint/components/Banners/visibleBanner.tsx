import React from 'react'

import styles from '../../styles/componentStyles/banner.module.css'
import Wallet from '../Auth/connectWallet'


function formatNumber(num) {
    if (num === null || num === undefined) {
        return "N/A";
      } else if (num >= 1000000) {
        return (num/1000000).toFixed(1) + "M";
      } else if (num > 9999) {
        return (num/1000).toFixed(1) + "k";
      } else {
        return num;
      }
  }

const VisibleBanner = (props) => {
    return (
        <div className={styles.visibleBannerContainer}>
            <div className={styles.sections}>
                <div className={styles.followerSectionV}> 
                    <p className={styles.txt}>{formatNumber(props.followers)} Followers</p>
                </div>
                <div className={styles.availSection}>
                    <p className={styles.txt}>0 Available Collectibles</p>
                </div>
            </div>
        </div>




      )
}
export default VisibleBanner