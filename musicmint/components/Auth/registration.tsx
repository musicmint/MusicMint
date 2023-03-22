import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../../src/context/auth'
import styles from '../../styles/marketplace.module.css'
import Link from "next/link"
import { InputType } from 'zlib'

import Wallet from '../../components/Auth/connectWallet'

const Registraion = (props) => {
    let { registerUser } = useContext(AuthContext)
    let [fullName, setFullName] = useState<any>(null)
    let [email, setEmail] = useState<any>(null)
    let [password, setPassword] = useState<any>(null)

    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "Enter") {
            registerUser(fullName, email, password, (document.getElementById("isArtist") as HTMLInputElement).checked);
          }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [fullName, email, password]);

    return (
         <div className={styles.container}>
         <div className={styles.header}>MusicMint</div>
             <div>
                 <div>Connect Wallet:</div>
                 <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
             </div>
             <div className={styles.formGroup}>
                 <input type="text" id="fullName" name="fullName" className={styles.input} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name"/>
             </div>
             <div className={styles.formGroup}>
                 <input type="email" id="email" name="email" className={styles.input} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your E-mail"/>
             </div>
             <div className={styles.formGroup}>
                 <input type="password" id="password" name="password" className={styles.input} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter your password"/>
             </div>
                <div className={styles.artistCheckbox}>
                    <input type="checkbox" id="isArtist"></input>
                    <div>I am an artist</div>
                </div>
             <div className={styles.formGroup}>
                 <div className={styles.button} onClick={() => registerUser(fullName, email, password, (document.getElementById("isArtist") as HTMLInputElement).checked)}>Register</div>
             </div>
             <div className={styles.noCredentials}>
                 <div onClick={props.switchTab}>Have an account? Log in</div>
             </div>
     </div>
    )
}

export default Registraion

// import React, { useContext } from 'react'
// import AuthContext from '../../src/context/auth'
//
// const Registration = (props) => {
//     let { registerUser } = useContext(AuthContext)
//
//     const formContainerStyles: React.CSSProperties = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: '2rem',
//     }
//
//     const inputStyles: React.CSSProperties = {
//         padding: '0.5rem',
//         margin: '0.5rem',
//         width: '100%',
//         borderRadius: '0.5rem',
//         border: 'none',
//         boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//     }
//
//     const buttonStyles: React.CSSProperties = {
//         padding: '0.5rem 1rem',
//         margin: '0.5rem',
//         width: '100%',
//         borderRadius: '0.5rem',
//         border: 'none',
//         backgroundColor: '#1DB954',
//         color: 'white',
//         fontWeight: 'bold',
//         boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
//         cursor: 'pointer',
//     }
//
//     const switchTabStyles: React.CSSProperties = {
//         textDecoration: 'underline',
//         cursor: 'pointer',
//     }
//
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <h1>Registration Page</h1>
//             <div style={formContainerStyles}>
//                 <input type="text" name="username" placeholder="Enter Username" style={inputStyles} />
//                 <input type="email" name="email" placeholder="Enter Email" style={inputStyles} />
//                 <input type="password" name="password" placeholder="Enter Password" style={inputStyles} />
//                 <input type="submit" value="Register" style={buttonStyles} />
//             </div>
//             <div style={switchTabStyles} onClick={() => props.switchTab()}>
//                 Already have an account? Login
//             </div>
//         </div>
//     )
// }
//
// export default Registration