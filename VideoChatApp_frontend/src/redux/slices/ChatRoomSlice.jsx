import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { ChatRoomsInstance } from "../../axios/Userserver";
import { initialstate } from "../store/RootStore";

export const fetchChatRooms = createAsyncThunk('chat-rooms',async()=>{
    try{
        const response = await ChatRoomsInstance()
        return response.data
    }catch(error){
        console.log(error,'error while fetching chat roooms')
        return error.response
    }
})


const ChatRoomSlice = createSlice({
    name:"chat-rooms",
    initialState:initialstate.chatRooms,
    reducers:{
        addRoom :(state,action)=>{
            state.rooms = [...state.rooms,action.payload]
        },
        removeRoom :(state,action)=>{
           state.rooms = state.rooms.filter((room)=>room.id !== action.payload)
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchChatRooms.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchChatRooms.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.rooms = action.payload
            state.error = ""

        })
        .addCase(fetchChatRooms.rejected,(state,action)=>{
            state.status = 'rejected'
            state.error = action.error.message
        })
    }
})


export const {addRoom,removeRoom} = ChatRoomSlice.actions
export default ChatRoomSlice.reducer