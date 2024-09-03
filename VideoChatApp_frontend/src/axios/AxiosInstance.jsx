import axios from "axios";
import { base_url, core } from "./EndPoints";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const refreshToken = async()=>{
    const refreshToken = localStorage.getItem('refresh')
    try{
        const res = await axios.post(`${base_url}api/token/refresh/`,{
            refresh:refreshToken
        })
        if (res.status === 200 || res.status === 201){
            localStorage.setItem('access',res.data.access)
            return res.data.access
        }

    }catch(error){  
        console.log("Error while refreshing the token",error)
    }
    return null
}

const addAuthInterceptor = (axiosInstance) =>{
    axiosInstance.interceptors.request.use(
        async (config) =>{
            const accessToken  = localStorage.getItem('access')
            if (accessToken){
                const user = jwtDecode(accessToken)
                const isExp = dayjs.unix(user.exp).diff(dayjs()) <1
                if(isExp){
                    const newAccessToken = await refreshToken()
                    if (newAccessToken){
                        config.headers.Authorization = `Bearer ${newAccessToken}`
                    }
                }else{
                     config.headers.Authorization = `Bearer ${accessToken}`
                }
            }
            return config    
        },(error)=>{
            return Promise.reject(error)
        }
    )
}

export const axiosInstance = axios.create({
    baseURL:base_url,
    headers:{
        'content-Type':'application/json'
    }
})
addAuthInterceptor(axiosInstance)


export const axiosCoreInstance = axios.create({
    baseURL:core,
    headers:{
        'Content-Type':'application/json'
    }
})
addAuthInterceptor(axiosCoreInstance)