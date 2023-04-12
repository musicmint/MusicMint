import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/banner.module.css'


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
  
const Banner = ({artist}) => {
  useEffect(()=>{
    console.log(artist);
    
  })

//   useEffect(() => {
    
//     })

    return (
      // whole badge
      <Link href={`/artistpage/${artist.link}`}>
        <div className={styles.artist}>
            <div className={styles.picAndName}>
                <img className={styles.pic} src={artist.image}></img>
                <div className={styles.name}>{artist.name}</div>
            </div>
            <div className={styles.info}>{formatNumber(artist.followers)}</div>
            {/* <div className={styles.info}>{artist.volume}</div> */}
        </div>
      </Link>
       
      )
}
export default Banner