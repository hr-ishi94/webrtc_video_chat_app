import React, { useCallback, useContext } from 'react'
import './Home.css'
import Rooms from './Rooms'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/slices/UserAuthSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import VideoChatRoom from './VideoChatRoom'
import AuthContext from '../context/AuthContext'

const Home = () => {
  const dispatch = useDispatch()
  const {logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout =useCallback(()=>{
    try{
      
      dispatch(userLogout())
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      navigate('/login')
    }catch(error){
      console.log('failed to logout')
    }

  },[])
  return (
    
    <div className='outer-home'>
      <Rooms />
      <Button className='logout ' variant='' onClick={logoutUser}><i className="fa-solid fa-arrow-right-from-bracket"></i></Button>
    </div>
    
  )
}

export default Home