import React from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/allArtists.module.css'
import Banner from './banner'

const allArtists = (props) => {
    return (
      
        // whole badge
      <div className={styles.banners}>
        <div className={styles.side}>
          <div className={styles.header}>
            <p className = {styles.artistHeader}>Artist</p>
            <p className = {styles.otherHeader}>Followers</p>
            <p className = {styles.otherHeader}>Volume</p>
          </div>
          <Banner/><Banner/><Banner/><Banner/><Banner/>
        </div>
    
        <div className={styles.side}>
          <div className={styles.header}>
            <p className = {styles.artistHeader}>Artist</p>
            <p className = {styles.otherHeader}>Followers</p>
            <p className = {styles.otherHeader}>Volume</p>
          </div>
          <Banner/><Banner/><Banner/><Banner/><Banner/> 
        </div>
      </div>
    
       
  )
}
export default allArtists