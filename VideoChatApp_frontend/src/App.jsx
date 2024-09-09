import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import VideoChatRoom from './components/VideoChatRoom'
import Users from './components/WebRTCComponent'
import Home from './components/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WebRTCComponent from './components/WebRTCComponent'
import PrivateRoute from './axios/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  
  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<UserRegistration/>}/>
        <Route element={<PrivateRoute element={<Home/>}/>} path='/' exact/>
      <Route path='/webrtc' element={<PrivateRoute element={<WebRTCComponent/>}/>}/>
      <Route path='/call' element={<PrivateRoute element={<VideoChatRoom/>}/>}/>
      </Routes> 
    </AuthProvider>
    <ToastContainer position='bottom-left'/>
      
    </>
  )
}

export default App
