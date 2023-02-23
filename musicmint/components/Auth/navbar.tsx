import React, {useContext} from 'react'
import styles from '../../styles/marketplace.module.css'
import Link from 'next/link'
import AuthContext from '../../src/context/auth'

const NavBar = () => {

  let {user, logoutUser, authTokens} = useContext(AuthContext)
    return (
        <nav className={styles.nav}>

          <div className = 'leftside'>
            <li>
              <Link href="/">Logo</Link>
            </li>
          </div>

          <div className='rightside'>
            <li>
              <Link href="/artistpage">For Artists</Link>
              <Link href="/marketplace">Marketplace</Link>
              {user ? (
                <p onClick={logoutUser}>Logout</p>
              ) : (
              <Link href="/auth">Login</Link>
              )}
            </li>
          </div>
        </nav>
    )
}

export default NavBar