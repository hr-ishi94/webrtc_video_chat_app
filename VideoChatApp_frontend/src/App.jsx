import { useState } from 'react'
// import './App.css'
import { Route,Routes } from 'react-router-dom'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import VideoChatRoom from './components/VideoChatRoom'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' to={<UserLogin/>}/>
      <Route path='/register' to={<UserRegistration/>}/>
      <Route path='/call' to={<VideoChatRoom/>}/>
    </Routes>
      
    </>
  )
}

export default App
