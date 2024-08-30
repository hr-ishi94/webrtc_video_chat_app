import { axiosCoreInstance, axiosInstance } from "./AxiosInstance";

export const UserListInstance = async()=>{
    const res = await axiosInstance.get('users/')
    if ( res.status === 200){
        return res
    }
    
}
export const UserPostInstance = async(formData)=>{
    try{
        const res = await axiosInstance.post('users/',formData)
        // console.log(res,'ll')
        if ( res.status === 201 || res.status === 200 ){
            return res
        }

    }catch(error){
        console.log(error,'error')
        return error
    }
}


export const UserLoginResponse = async (email,password)=>{
    try{
        const res = await axiosInstance.post('login/',{email,password})
        if (res.status === 200 || res.status === 201){
            const access = res.data.access
            const refresh = res.data.refresh
            const authData = {
                access,
                refresh,
                'is_authenticated':true
            }
            return authData
        }
    }catch(error){
        console.log('Authentication failed',error)
        error ={'error':'authentication failed'}
        return error
    }
}

export const ChatRoomsInstance = async ()=>{
    try{
        const res = await axiosCoreInstance.get('chat_rooms/')
        if (res.status === 200){
            return res
        }
    }catch(error){
        console.log('error',error)
        return error
    }
}

export const ChatRoomPost = async (formData)=>{
    try{
        // console.log('lkjhh',formData)
        const res = await axiosCoreInstance.post('chat_rooms/',formData)
        // console.log(res,'lkjhh')
        if (res.status === 201){
            return res
        }
    }catch(error){
        console.log('error', error)
        return error
    }
}