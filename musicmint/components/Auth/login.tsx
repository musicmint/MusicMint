import React, {useContext} from 'react'
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/auth.module.css'

import Wallet from '../../components/Auth/connectWallet'

const Login = (props) => {
    let { loginUser } = useContext(AuthContext)
    let {user, logoutUser, authTokens} = useContext(AuthContext)
    return (
        <div className={styles.container}>
            <div className={styles.label}>Login Page</div>
            <div>
                <div>Connect Wallet:</div>
                <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
            </div>
            <form onSubmit={() => loginUser}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>
                        Username
                    </label>
                    <input type="text" id="username" name="username" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input type="password" id="password" name="password" className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Log in</button>
            </form>
            <div onClick={() => props.switchTab()}>Register</div>
        </div>
    )
}

export default Login