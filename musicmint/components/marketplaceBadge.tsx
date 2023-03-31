/* Created by Anneliese Breidsprecher */

import React, {useContext, useEffect} from 'react'
import styles from '../styles/mBadge.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'


// ADD PROPS FOR SPECIFIC ARTISTS!!!!!
const marketBadge = (props) => {
    return (
        <div className = {styles.mBadge}>
            <div className = {styles.nameSection}>
                <p className = {styles.name}>Artist Name</p>
            </div>
        </div>
    )
}

export default marketBadge