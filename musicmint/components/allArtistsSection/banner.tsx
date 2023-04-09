import React from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/banner.module.css'

const Banner = (props) => {
    return (
      // whole badge
        <div className={styles.artist}>
            <div className={styles.picAndName}>
                <div className={styles.pic}></div>
                <div className={styles.name}>Artist Name</div>
            </div>
            <div className={styles.info}>Followers</div>
            <div className={styles.info}>Volume</div>
        </div>
       
      )
}
export default Banner