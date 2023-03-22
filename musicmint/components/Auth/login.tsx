import React, {useContext} from 'react'
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/auth.module.css'

import Wallet from '../../components/Auth/connectWallet'

const Login = (props) => {
    let { loginUser } = useContext(AuthContext)
    let {user, logoutUser, authTokens} = useContext(AuthContext)
    return (
        <div className={styles.AuthWrapper}>
            <div>Login Page</div>
            <div>
                <div>Connect Wallet:</div>
            <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
            </div>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />

                <input type="submit"/>
            </form>
            <div onClick={() => props.switchTab()}>Register</div>
        </div>
    )
}

export default Login