import React, {useContext} from 'react'
import AuthContext from '../../src/context/auth'
import styles from '../../styles/AuthPage.styles/auth.module.css'

const Registraion = (props) => {
    let { registerUser } = useContext(AuthContext)
    return (
        <div className={styles.AuthWrapper}>
            <div>Registration Page</div>
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