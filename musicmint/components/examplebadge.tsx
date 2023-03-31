import React, {useContext, useRef} from 'react'
// import {useRef} from 'react'
import styles from '../styles/examplebadge.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import anneliese from '../../anneliese.png'


// const badgeRef = useRef<HTMLDivElement>(null);

// export function ExampleBadge(){
const ExampleBadge = (props) => {
    let { loginUser } = useContext(AuthContext)

    return (
      
        <div className={styles.badge} >
          <div className={styles.img}></div>
          <div className={styles.info}>
            <div className={styles.top}>
              <p className={styles.nftName}>NFT Name</p>
            </div>
            <div className={styles.bottom}>
            <div className={styles.leftSide}>
              <p className={styles.artistName}>Artist Name</p>
              <p className={styles.price}>$__</p>
              <button className={styles.artistPage}>Artist Page</button>
            </div>
            {/* <div className={styles.rightSide}>
              <button className={styles.artistPage}>Artist Page</button>
            </div> */}
            </div>
          </div>
        </div>
        
      
        // <div className="user-card" style={{ border: '1px solid #000', borderRadius: '5px', padding: '10px', boxSizing: 'border-box' }}>
        //   <div className="user-image">
        //     <Image src={anneliese} alt="logo" width={204} height={252}/>
        //   </div>
        //   <div className="user-info">
        //     <h3 className="user-name">Username</h3>
        //     <button className="follow-button">Follow</button>
        //   </div>
        // </div>
      )
      
}

// ExampleBadge.badgeRef = badgeRef;
export default ExampleBadge
