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

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserRegistration/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/webrtc' element={<WebRTCComponent/>}/>
      <Route path='/call' element={<VideoChatRoom/>}/>
    </Routes> 
    <ToastContainer position='bottom-left'/>
      
    </>
  )
}

export default App
