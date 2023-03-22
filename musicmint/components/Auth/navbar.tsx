import React, {useContext} from 'react'
import styles from '../../styles/marketplace.module.css'
import Link from 'next/link'
import AuthContext from '../../src/context/auth'
import Image from 'next/image'
import logo from '../../music-mint-marketplace.png'
import {Button} from "react-bootstrap";

const NavBar = ({ web3Handler, account }) => {

  let {user, logoutUser, authTokens} = useContext(AuthContext)
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

          <div className='rightside'>
            <li>
              <Link href="/artistpage">FOR ARTISTS</Link>
              <Link href="/marketplace">MARKETPLACE</Link>

              {user ? (
                <p onClick={logoutUser}>LOGOUT</p>
              ) : (
              <Link href="/auth">LOGIN</Link>
              )}
            </li>
          </div>
            <div className='meta'>
                {account ? (
                    <Link
                        href={`https://etherscan.io/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button nav-button btn-sm mx-4">
                        <Button variant="outline-light">
                            {account.slice(0, 5) + '...' + account.slice(38, 42)}
                        </Button>

                    </Link>
                ) : (
                    <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                )}
            </div>
        </nav>
    )
}

export default NavBar