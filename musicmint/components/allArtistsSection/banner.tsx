import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/banner.module.css'

const Banner = ({artist}) => {
  // useEffect(()=>{
  //   console.log(artist);
    
  // })
    return (
      // whole badge
      <Link href={`/artistpage/${artist.link}`}>
        <div className={styles.artist}>
            <div className={styles.picAndName}>
                <div className={styles.pic}></div>
                <div className={styles.name}>{artist.name}</div>
            </div>
            <div className={styles.info}>{artist.followers}</div>
            {/* <div className={styles.info}>{artist.volume}</div> */}
        </div>
      </Link>
       
      )
}
export default Banner