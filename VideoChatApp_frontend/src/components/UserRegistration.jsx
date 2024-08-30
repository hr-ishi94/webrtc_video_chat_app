import React, { useState } from 'react'
import NavBar from './NavBar'
import './UserRegister.css'
import { UserPostInstance } from '../axios/Userserver'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserRegistration = () => {

  const [formData, setFormData] = useState({
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    password:'',
    confirm_password:''
  })
  const navigate = useNavigate()
  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const isFormValid = Object.values(formData).every((value) => {
      if (typeof value === 'string') {
          return value.trim() !== "";
      }
      return true; // Skip non-string values in the validation
  });
  if(isFormValid){

    try{
      
      const res = await UserPostInstance(formData)
      if(res.status && res.status=== 201){
        navigate('/login')
        toast.success('User Registration successfull')

      }
      if(res.response.data.email ){
        toast.error("Email already in use")
      }
      if(res.response.data.username){
        toast.error("Username already in use")
      }
      console.log(res,'lll')
    }catch(error){
      console.log('Error while posting: ',error)
    }
  }else{
    toast.warning('All fields required!')
  }
  }
  // console.log(formData,'kk')
  
  return (
    <div className="outer-reg">
    <h1 style={{fontSize:"30px",color: "#004d40"}} className='text-center' >User Register</h1>

    <form onSubmit={handleSubmit}>
    <p>First name</p>
    <input className="in" type="text" placeholder="First name" name='first_name' value={formData.first_name} onChange={handleChange}/>
    <p>Last name</p>
    <input className="in" type="text" placeholder="Last name" name='last_name' value={formData.last_name} onChange={handleChange}/>
    <p>Email</p>
    <input className="in" type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange}/>
    <p>Username</p>
    <input className="in" type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange}/>
    <p>Enter Password</p>
    <input className="in" type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
    <p>Confirm Password</p>
    <input className="in" type="password" placeholder="Confirm Password" name='confirm_password' value={formData.confirm_password} onChange={handleChange}/>
    {/* <br /> */}
    <input type="submit" value="Submit" id="bt"  />
     
    </form>
    <br />
    <a className='ln'>Already registered?<Link to={'/login'}>Login</Link></a>
</div>
  )
}

export default UserRegistration