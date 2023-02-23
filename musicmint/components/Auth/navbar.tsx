import React, {useContext} from 'react'
import styles from '../../styles/marketplace.module.css'
import Link from 'next/link'
import AuthContext from '../../src/context/auth'

const NavBar = () => {

  let {user, logoutUser, authTokens} = useContext(AuthContext)
    return (
        <nav className={styles.nav}>
          <ul>
            <li>
              <div className = 'leftside'>
                <Link href="/">Logo</Link>
              </div>
              <div className='rightside'>
                <Link href="/artistpage">For Artists</Link>
                <Link href="/marketplace">Marketplace</Link>
                {user ? (
                  <p onClick={logoutUser}>Logout</p>
                ) : (
                <Link href="/auth">Login</Link>
                )}
              </div>
            {/* </li> */}
            {/* <li>
              <Link href="/artistpage">For Artists</Link>
            </li>
            <li>
              <Link href="/marketplace">Marketplace</Link>
            </li>
            <li>
              <a href="#Search For Artists">Search For Artists</a>
            </li> */}

            {/* <li>         */}

            </li>
          </ul>
        </nav>
    )
}

export default NavBar