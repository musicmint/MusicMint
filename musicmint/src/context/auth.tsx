import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'

const initialContext = 
{ 
    user: {username: ""},
    authTokens: {access: "", refresh: ""},
    loginUser: async (e: any) => {},
    logoutUser: () => {},
    registerUser: async (e: any) => {},
}

const AuthContext = createContext(initialContext)

export default AuthContext;


export const AuthProvider = ({children}) => {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/token/refresh/`)
    let [authTokens, setAuthTokens] = useState(()=> typeof window !== 'undefined' && localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') || '{}') : null)
    let [user, setUser] = useState(()=> typeof window !== 'undefined' && localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens') || '{}') : null)
    let [loading, setLoading] = useState(true)
    const router = useRouter()

    let loginUser = async (e)=> {
        e.preventDefault()
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            if (typeof window !== 'undefined') localStorage.setItem('authTokens', JSON.stringify(data))
            router.push('/')
        } else {
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        if (typeof window !== 'undefined') localStorage.removeItem('authTokens')
        router.push('/auth')
    }

    let registerUser = async (e)=> {
        e.preventDefault()
        console.log(JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password':e.target.password.value}))
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log(data);
        console.log(response.status);

        
        if (response.status === 200){
            // setAuthTokens(data)
            // setUser(jwt_decode(data.access))
            // if (typeof window !== 'undefined') localStorage.setItem('authTokens', JSON.stringify(data))
            router.push('/')
        } else {
            alert('Something went wrong!')
        }
    }


    let updateToken = async ()=> {

        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            if (typeof window !== 'undefined') localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user as any,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser: registerUser,
    }


    useEffect(()=> {

        if(typeof window !== 'undefined' && localStorage.getItem('authTokens') && loading) {
            updateToken()
            console.log("entered refresh token");
        }

        setLoading(false)

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}