import React, {useContext} from 'react'
import Link from 'next/link'
import AuthContext from '../../src/context/auth'
import {Button} from "react-bootstrap";
import styles from '../../styles/AuthPage.styles/auth.module.css'

const Wallet = ({ web3Handler, account }) => {

    let {user, logoutUser, authTokens} = useContext(AuthContext)

    return (

        <div className={styles.WalletWrapper}>
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
    )
}

export default Wallet




