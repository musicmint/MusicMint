import React, {useContext, useState} from 'react'
import AuthContext from '../src/context/auth'
import Login from '../components/Auth/login'
import Registraion from '../components/Auth/registration'
import NavBar from '../components/navbar'


const AuthPage = () => {
    let [onLogin, setOnLogin] = useState(true)

    const switchTab = () => {
        setOnLogin(!onLogin)
    }

    return (
        <>
        <NavBar/>
        {onLogin ? <Login switchTab={switchTab}></Login> : <Registraion switchTab={switchTab}></Registraion>}
        </>
    )
}

export default AuthPage