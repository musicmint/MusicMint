import React from 'react'

import styles from '../../styles/componentStyles/banner.module.css'
import Wallet from '../Auth/connectWallet'

const Banner = (props) => {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.sections}>
                <div className={styles.followerSection}>
                    
                    <p className={styles.txt}>0 Followers</p>
                </div>
                <div className={styles.walletContainer}>
                    <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
                </div>
                {/* <p className={styles.txt}>Connect wallet</p> */}
                
                <div className={styles.ethSection}>
                    
                    <p className={styles.txt}>0 ETH</p>
                </div>
            </div>
        </div>
      )
}
export default Banner