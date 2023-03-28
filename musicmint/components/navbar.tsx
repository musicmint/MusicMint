import React, {useContext, useEffect} from 'react'
import styles from '../styles/navbar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'

const NavBar = ({ nft, marketplace }) => {
  let { user, logoutUser, getUserInfo, isAuthorized } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
    }
  }, [isAuthorized])

  return (
        <nav className={styles.nav}>

          <div className = 'leftside'>
            <li>
              <Link href="/">
                <Image src={logo} alt="logo" width={263.16} height={25.79}/>
              </Link>
              {/* <Link href="/">Logo</Link> */}
            </li>
          </div>

          <div className={styles.navbarLinks}>
              <Link href={`/profile?nft=${nft}&marketplace=${marketplace}`}>FOR ARTISTS</Link>
              <Link href={`/marketplace?nft=${nft}&marketplace=${marketplace}`}>MARKETPLACE</Link>
              {isAuthorized ? (
                <p onClick={logoutUser}>LOGOUT</p>
              ) : (
              <Link href="/auth">LOGIN</Link>
              )} 
          </div>
        </nav>
    )
}

export default NavBar