import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../src/context/auth'
import Login from '../components/Auth/login'
import Registraion from '../components/Auth/registration'
import NavBar from '../components/navbar'
import router from 'next/router'

const AuthPage = () => {
    let [onLogin, setOnLogin] = useState(true)
    let { isAuthorized } = useContext(AuthContext)

    const switchTab = () => {
        setOnLogin(!onLogin)
    }


    useEffect(() => {
        if (isAuthorized) {
            router.push('/profile')
        }
    }, [])

    return (
        <>
        <NavBar/>
        {onLogin ? <Login switchTab={switchTab}></Login> : <Registraion switchTab={switchTab}></Registraion>}

        </>
        
    )
}

export default AuthPage