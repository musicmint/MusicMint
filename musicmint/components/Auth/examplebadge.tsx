import React, {useContext} from 'react'
import styles from '../../styles/examplebadge.module.css'
import Link from 'next/link'
import AuthContext from '../../src/context/auth'
import Image from 'next/image'
import anneliese from '../../anneliese.png'

const ExampleBadge = (props) => {
    let { loginUser } = useContext(AuthContext)

    return (
        <div className={styles.usercard}>
            <div className="user-image">
                <Image src={anneliese} alt="logo" width={204} height={252}/>
            </div>
            <div className="user-info">
                <h3 className="user-name">Username</h3>
                <button className="follow-button">Follow</button>
            </div>
        </div>
    )
}

export default ExampleBadge


