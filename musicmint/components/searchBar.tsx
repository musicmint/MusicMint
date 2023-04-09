import React, {useContext, useEffect} from 'react'
import styles from '../styles/componentStyles/searchBar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'

const searchBar = (props, { nft, marketplace }) => {
    return (
        <input type="text" placeholder="Find your favorite artist" className = {styles.search} ></input>
    )
}

export default searchBar