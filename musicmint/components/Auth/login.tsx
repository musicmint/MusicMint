import React, { useContext, useState } from 'react';
import AuthContext from '../../src/context/auth';
import styles from '../../styles/marketplace.module.css';
import Wallet from '../../components/Auth/connectWallet'

const Login = (props) => {
    const { loginUser } = useContext(AuthContext);
    let [email, setEmail] = useState<any>(null)
    let [password, setPassword] = useState<any>(null)

    return (
        <div className={styles.container}>
            <div className={styles.label}>MusicMint</div>
            <div>
                <div>Connect Wallet:</div>
                <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
            </div>
            <div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input type="email" id="email" name="email" className={styles.input} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input type="password" id="password" name="password" className={styles.input} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className={styles.button} onClick={() => loginUser(email, password)}>Log in</button>
            </div>
            
            <div className={styles.button} onClick={props.switchTab}>
                Register
            </div>
        </div>
    );
};

export default Login;