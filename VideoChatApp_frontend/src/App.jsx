import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import VideoChatRoom from './components/VideoChatRoom'
import Users from './components/Users'
import Home from './components/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/register' element={<UserRegistration/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/call' element={<VideoChatRoom/>}/>
    </Routes> 
    <ToastContainer position='bottom-left'/>
      
    </>
  )
}

export default App
