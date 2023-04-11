import React, {useContext, useEffect} from 'react'

import styles from '../../styles/componentStyles/banner.module.css'
import Wallet from '../Auth/connectWallet'

const VisibleBanner = (props) => {
    return (
        <div className={styles.visibleBannerContainer}>
            <div className={styles.sections}>
                <div className={styles.followerSectionV}> 
                    <p className={styles.txt}>{props.followers} Followers</p>
                </div>
                <div className={styles.availSection}>
                    <p className={styles.txt}>0 Available Collectibles</p>
                </div>
            </div>
        </div>
      )
}
export default VisibleBanner