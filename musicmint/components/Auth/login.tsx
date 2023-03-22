import React, { useContext } from 'react';
import AuthContext from '../../src/context/auth';
import styles from '../../styles/marketplace.module.css';

const Login = (props) => {
    const { loginUser } = useContext(AuthContext);

    return (
        <div className={styles.container}>
            <div className={styles.label}>Login Page</div>
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
            
            <div className={styles.button} onClick={props.switchTab}>
                Register
            </div>
        </div>
    );
};

export default Login;