import { configureStore,combineReducers } from "@reduxjs/toolkit";
import UserListSlice from "../slices/UserListSlice";
import UserAuthSlice from "../slices/UserAuthSlice";
import {persistReducer,persistStore,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ChatRoomSlice from "../slices/ChatRoomSlice";

export const rootReducer = combineReducers({
    UserList:UserListSlice,
    UserToken:UserAuthSlice,
    ChatRooms :ChatRoomSlice
})

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });


const persistor = persistStore(store)

export {store, persistor}