import axios from "axios";
import { base_url, core } from "./EndPoints";


export const axiosInstance = axios.create({
    baseURL:base_url,
    headers:{
        'content-Type':'application/json'
    }
})


export const axiosCoreInstance = axios.create({
    baseURL:core,
    headers:{
        'Content-Type':'application/json'
    }
})
