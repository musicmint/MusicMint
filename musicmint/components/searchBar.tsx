import React, {useContext, useEffect} from 'react'
import styles from '../styles/searchBar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'

const searchBar = (props, { nft, marketplace }) => {
    return (
        <div className = {styles.searchBar}>
            <form>
                <input type="text" placeholder="Find your favorite artist" className = {styles.search} ></input>
                
            </form>
        </div>
    )
}

export default searchBar