import React from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/allArtists.module.css'

const Following = (props) => {
  return (
      // whole badge
    <div className={styles.banners}>
      <div className={styles.side}>
        <div className={styles.header}>
          <p className = {styles.artistHeaderFollowing}>Artist</p>
          <p className = {styles.otherHeaderFollowing}>Followers</p>
          <p className = {styles.otherHeaderFollowing}>Your Volume</p>
        </div>
        {/* <Banner/><Banner/><Banner/><Banner/><Banner/> */}
      </div>
  
      <div className={styles.side}>
        <div className={styles.header}>
          <p className = {styles.artistHeaderFollowing}>Artist</p>
          <p className = {styles.otherHeaderFollowing}>Followers</p>
          <p className = {styles.otherHeaderFollowing}>Volume</p>
        </div>
        {/* <Banner/><Banner/><Banner/><Banner/><Banner/>  */}
      </div>
    </div>
  )
}
export default Following