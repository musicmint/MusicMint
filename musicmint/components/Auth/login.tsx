import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/loginAndReg.module.css'
import Wallet from '../../components/Auth/connectWallet'
import ConnectSpotify from '../../components/Auth/connectSpotify';
import Image from 'next/image'
import logo from '../../images/music-mint-marketplace.png'

const Login = (props) => {
    const { loginUser } = useContext(AuthContext);
    let [email, setEmail] = useState<any>(null)
    let [password, setPassword] = useState<any>(null)

    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "Enter") {
            console.log(email);
            console.log(password);

            loginUser(email, password);
          }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [email, password, loginUser]);

    return (
        <div className={styles.container}>
            
            <div className={styles.header}><Image src={logo} alt="logo" width={400} height={40}/></div>
            
                <div className={styles.formGroup}>
                    <input type="email" id="email" name="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your E-mail"/>
                </div>
                <div className={styles.formGroup}>
                    <input type="password" id="password" name="password" className={styles.input} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password"/>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.button} onClick={() => loginUser(email, password)}>Log In</div>
                </div>
                <div className={styles.noCredentials}>
                    <div>Forgot password?</div>
                    <div onClick={props.switchTab}>Don&apos;t have an account? Register here</div>
                </div>
                <div>
                    <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
                </div>
                {/* <ConnectSpotify/> */}
        </div>
    );
};

export default Login;