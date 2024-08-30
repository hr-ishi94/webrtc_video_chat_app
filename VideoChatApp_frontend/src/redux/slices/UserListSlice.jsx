import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../store/RootStore";
import { UserListInstance } from "../../axios/Userserver";


export const fetchUsers = createAsyncThunk('users/',async () =>{
    try{
        const response = await UserListInstance()
        return response.data
    }
    catch(error){
        throw error
    }
})



const UsersListSlice = createSlice({
    name:"AllUsers",
    initialState:initialstate.userList,
    reducers:{
       
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
            state.error =""
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default UsersListSlice.reducer 