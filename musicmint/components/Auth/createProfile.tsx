import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/loginAndReg.module.css'
import Image from 'next/image'
import logo from '../../music-mint-marketplace.png'

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
      }, [email, password]);

    return (
        <div className={styles.container}>
            <Image src={logo} alt="logo" width={400} height={40}/>
        </div>
    );
};

export default Login;