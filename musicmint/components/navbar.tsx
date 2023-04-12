import React, {useContext, useEffect} from 'react'
import styles from '../styles/componentStyles/navbar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'
import { useRouter } from 'next/router'
import SearchBar from './searchBar'

const NavBar = (props, {nft, marketplace}) => {
  let { user, logoutUser, getUserInfo, isAuthorized } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
    }
    console.log(router);
    
  }, [isAuthorized])

  const router = useRouter()

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

          {
            router.pathname == "/marketplace" ? 
            <SearchBar className={styles.searchSection} nft={nft} marketplace={marketplace}/>
            : <></>
          }


          <div className={styles.navbarLinks}>
              {isAuthorized ? 
              (!user.is_artist ? 
              <Link href={`/userProfile`}>PROFILE</Link>
              :
              <Link href={`/profile`}>YOUR PROFILE</Link>
              ) : <></>
              }
              <Link href={`/marketplace`}>MARKETPLACE</Link>
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