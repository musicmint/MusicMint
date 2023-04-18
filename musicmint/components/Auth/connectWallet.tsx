import React from 'react'
import Link from 'next/link'
import {Button} from "react-bootstrap";
import styles from '../../styles/AuthPage.styles/wallet.module.css'

const Wallet = ({ web3Handler, account }) => {

    return (

        <div className={styles.WalletWrapper}>
            <div className={styles.connectText}>
                    {/* <p>Connect Wallet:</p> */}
                    </div>
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
                <Button onClick={web3Handler} className={styles.connectButton}>Connect Wallet</Button>
            )}
        </div>
    )
}

export default Wallet




