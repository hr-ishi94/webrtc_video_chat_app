import React, { useContext, useState } from 'react'
import './UserLogin.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserLoginResponse } from '../axios/Userserver'
import { useDispatch, useSelector } from 'react-redux'
import { UserLoginThunk } from '../redux/slices/UserAuthSlice'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'

const UserLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {loginUser} = useContext(AuthContext)


  // const handleChange = (e)=>{
  //   const {name, value} = e.target
  //   setFormData((prevState)=>({
  //     ...prevState,
  //     [name]:value
  //   }))
  // }
  //  const handleSubmit = async(e)=>{
  //   e.preventDefault()
  //  const isFormValid = Object.values(formData).every((value) => {
  //     if (typeof value === 'string') {
  //         return value.trim() !== "";
  //     }
  //     return true; // Skip non-string values in the validation
  // });
  // if(isFormValid){
  //   try{
      // const res =  await dispatch(UserLoginThunk(formData))
  //     console.log(res,'dd')
  //     const {access,refresh} = res.payload
  //     if (access){

  //       console.log(access,refresh,'lllk')
  //       localStorage.setItem('access',access)
  //       localStorage.setItem('refresh',refresh)
  //       toast.success("Successfully logged in")
  //       navigate('/')
  //     }
  //   }catch(error){
  //     toast.error("Failed to login")
  //   }
  // }else{
  //   toast.warning("All fields required")
  // }
  // }
  
  
  return (
    <>
    {/* {is_authenticated ?<Navigate to ={'/home'}/>: */}
  <div className="outer">

    <h1 style={{fontSize:"30px",color: "#004d40"}} className='text-center'>User Login</h1>
    <br />
    <p>Email</p>
    <form onSubmit={loginUser}>
    <input className="in" type="email" placeholder="Email" name='email' />
    <br />
    <p>Password</p>
    <input className="in" type="password" placeholder="Enter Password" name='password' />
    <input type="submit" value="Submit" id="bt" />
    <a className='rg'>New member?<Link to={'/register'}> Register</Link></a>
    </form>
  </div>
  {/* } */}
    </>
  )
}

export default UserLogin