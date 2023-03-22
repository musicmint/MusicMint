import React, {useContext} from 'react'
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/auth.module.css'

import Wallet from '../../components/Auth/connectWallet'

const Registraion = (props) => {
    let { registerUser } = useContext(AuthContext)
    return (
        <div className={styles.AuthWrapper}>
            <div>Registration Page</div>
            <div>
                <div>Connect Wallet:</div>
            <Wallet web3Handler={props.web3Handler} account={props.account}></Wallet>
            </div>
            <form onSubmit={registerUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="email" name="email" placeholder="Enter Email" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit"/>
            </form>
            <div onClick={() => props.switchTab()}>Login</div>
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