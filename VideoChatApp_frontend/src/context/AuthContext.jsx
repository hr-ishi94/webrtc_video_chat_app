import { createContext, useState } from "react";
import { base_url } from "../axios/EndPoints";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) =>{
    const authTokensString = localStorage.getItem('authTokens') ?JSON.parse(localStorage.getItem('authTokens')):null
    const [authTokens, setAuthTokens] = useState(authTokensString)
    const [user,setUser] = useState(authTokensString?jwtDecode(authTokensString.access):null)
    const navigate = useNavigate()
    
    const loginUser = async (e) =>{
        e.preventDefault()
        let response = await fetch(`${base_url}login/`,{
            method:'POST',
            headers:{
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value,'password':e.target.password.value})

        })
        const data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{

            toast.error('failed to login')
        }
    }
    const logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('accessTokens')
    }

    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }




    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}