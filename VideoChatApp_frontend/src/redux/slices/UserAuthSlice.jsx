import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { UserLoginResponse } from "../../axios/Userserver";
import { initialstate } from "../store/RootStore";

export const UserLoginThunk = createAsyncThunk('user/login',async ({email, password})=>{
    console.log(email,"emails")
    const authdata = await UserLoginResponse(email,password)
    return authdata
})

const UserauthSlice = createSlice({
    name:'auth-user',
    initialState:initialstate.userToken,
    reducers:{
        userLogout:(state)=>{
            state.access = null,
            state.refresh = null,
            state.is_authenticated =false 
        }

    },
    extraReducers:(builders)=>{
        builders
        .addCase(UserLoginThunk.fulfilled,(state,action)=>{
            state.access=action.payload.access,
            state.refresh=action.payload.refresh,
            state.is_authenticated=action.payload.is_authenticated
        })
    }
})


export const {userLogout} = UserauthSlice.actions
export default UserauthSlice.reducer