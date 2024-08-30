export const initialstate ={
    userList:{
        users:[],
        status:'idle',
        error:''
    },
    chatRooms:{
        rooms:[],
        status:'idle',
        error:''
    },
    userToken:{
        access:'',
        refresh:'',
        is_authenticated:false
    }
}