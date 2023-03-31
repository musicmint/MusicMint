import React, {useContext, useEffect} from 'react'
import styles from '../styles/pageStyles/userpage.module.css'
import NavBar from '../components/navbar'


// ADD PROPS FOR SPECIFIC ARTISTS!!!!!

export default function Home(nft, marketplace) {

    return (
        <div className = {styles.container}>
            <NavBar className={styles.marketNav} nft={nft} marketplace={marketplace} />
     
            <p>USER PROFILE!!!!!</p>
        </div>
    )
}

