/* Created by Anneliese Breidsprecher */

import React, {useContext, useEffect} from 'react'
import styles from '../styles/componentStyles/mBadge.module.css'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router';

// ADD PROPS FOR SPECIFIC ARTISTS!!!!!
const marketBadge = (props) => {
    const router = useRouter(); 
    const END = props.endpoint;

    const handleButtonClick = () => {
        router.push(`artistpage/${END}`); 
    };

    return (
        <div className = {styles.mBadge}>
            <div className = {styles.classSection}>
                {/* will be pulled from spotify api */}
                <img className = {styles.photo}/>
                <div className={styles.classWrapper}>
                    <div className = {styles.class}>
                        <p className = {styles.classTxt}>Class of {props.classyear}</p>
                    </div>
                </div>
            </div>
            
            <img className = {styles.imagebox} src={props.imageURL} />
            
            <Button className={styles.nameSection} onClick={handleButtonClick}>
                <p className = {styles.name}>{props.artistname}</p></Button>
            </div>
    )
}

export default marketBadge