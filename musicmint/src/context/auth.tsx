import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useRouter } from 'next/router'
import { access } from 'fs';
import { send } from 'process';
import { json } from 'stream/consumers';

const initialContext =
{
    user: { full_name: "", email: "", nickname: ""},
    authTokens: { access: "", refresh: "" },
    loginUser: async (email: any, password: any) => { },
    logoutUser: () => { },
    registerUser: async (full_name: any, email: any, password: any, isArtist: any) => { },
    updateUser: async (updatedInfo: any) => { },
    isAuthorized: false as boolean,
    getUserInfo: (): any => { },
    changePassword: (email: any, password: any, new_password: any): any => { },
    changeForgotPassword: (email: any, password: any): any => { },
    deleteUser: (email: any, password: any): any => { },
}

const AuthContext = createContext(initialContext)

export default AuthContext;


export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(typeof window !== 'undefined' && localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') || '{}') : null)
    let [user, setUser] = useState({ full_name: "", email: "", nickname: "" })
    let [loading, setLoading] = useState(true)
    const router = useRouter()

    let loginUser = async (email, password) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email, 'password': password })
        })
        let data = await response.json()
        console.log(data)


        if (await response.status === 200) {
            if (typeof window !== 'undefined') await localStorage.setItem('authTokens', JSON.stringify(data))
            if (typeof window !== 'undefined') await localStorage.setItem('isAuthorized', "true")
            await setAuthTokens(await data)
            if (await authTokens) await getUserInfo()

            await router.push('/marketplace')
        } else {
            console.log("Incorrect Credentials")
            console.log(response.status)
            console.log(response.statusText)
        }

        return data
    }

    let getUserInfo = async () => {
        let user_info = await updateUser({})
        await setUser(await user_info)

        return user_info
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser({ full_name: "", email: "", nickname: "" })
        if (typeof window !== 'undefined') localStorage.removeItem('authTokens')
        if (typeof window !== 'undefined') localStorage.removeItem('isAuthorized')
        router.push('/auth')
    }

    let registerUser = async (full_name: any, email: any, password: any, isArtist: any) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'full_name': full_name, 'email': email, 'password': password, 'is_artist': isArtist })
        })
        let data = await response.json()

        if (await response.status === 200) {
            // setAuthTokens(data)
            // setUser(jwt_decode(data.access))
            // if (typeof window !== 'undefined') localStorage.setItem('authTokens', JSON.stringify(data))
            router.push('/')
        } else {
            console.log("Unable to register user with given credentials")
            console.log(response.status)
            console.log(response.statusText)
        }
    }

    let updateToken = async () => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': await authTokens?.refresh })
        })

        let data = await response.json()
        console.log(await data);


        if (await response.status === 200) {
            console.log("updated token");

            await setAuthTokens(await data)
            if (await typeof window !== 'undefined') await localStorage.setItem('authTokens', JSON.stringify(data))
            return await authTokens
        } else {
            logoutUser()
            console.log("could not update token");
            console.log(response.statusText);
        }

        if (loading) {
            setLoading(false)
        }
    }

    let updateUser = async (updatedInfo) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await authTokens?.access}`
            },
            body: JSON.stringify(updatedInfo)
        })

        let data = await response.json()

        if (await response.status === 200) {
            await setUser(data.user)
            return data.user
        } else {
            logoutUser()
            console.log(response.statusText);
        }
    }

    let changePassword = async (email, password, new_password) => {
        authTokens = JSON.parse(localStorage.getItem('authTokens') || "{}")
        setAuthTokens(JSON.parse(localStorage.getItem('authTokens') || "{}"))

        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/change/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({ "email": email, "password": password, "new_password": new_password })
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log("Password Changed Successfully")

        } else {
            console.log("Could not change password.")
        }
    }

    let changeForgotPassword = async (email, password) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/change/password/verified`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": email, "password": password })
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log("Password Changed Successfully")
            await loginUser(email, password)
        } else {
            console.log("Could not change password.")
        }
    }

    let deleteUser = async (email, password) => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/account/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`,
            },
            body: JSON.stringify({ 'email': email, 'password': password })
        })

        let data = await response.json()
        console.log(data)


        if (await data.status === 200) {
            logoutUser()
        } else {

        }

        return data
    }

    









    let contextData = {
        authTokens: authTokens,
        user: user as any,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        updateUser: updateUser,
        isAuthorized: typeof window !== 'undefined' && localStorage.getItem('authTokens') ? true : false,
        getUserInfo: getUserInfo,
        changePassword: changePassword,
        changeForgotPassword: changeForgotPassword,
        deleteUser: deleteUser
    }


    useEffect(() => {
        if (loading && authTokens && Date.now() / 1000 - 30 >= (jwt_decode(authTokens?.access) as any).exp) {
            console.log("because of this");
            updateToken()
        } else {
            setLoading(false)
        }

        let fiveMinutes = 1000 * 60 * 5

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fiveMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
