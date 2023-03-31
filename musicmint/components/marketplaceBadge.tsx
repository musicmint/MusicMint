/* Created by Anneliese Breidsprecher */

import React, {useContext, useEffect} from 'react'
import styles from '../styles/mBadge.module.css'


// ADD PROPS FOR SPECIFIC ARTISTS!!!!!
const marketBadge = (props) => {
    return (
        <div className = {styles.mBadge}>
            <div className = {styles.classSection}>
                {/* will be pulled from spotify api */}
                <div className = {styles.photo}></div>
                <div className={styles.classWrapper}>
                    <div className = {styles.class}>
                        <p className = {styles.classTxt}>Class of ___</p>
                    </div>
                </div>
            </div>
            <div className = {styles.nameSection}>
                <p className = {styles.name}>Artist Name</p>
            </div>
        </div>
    )
}

export default marketBadge