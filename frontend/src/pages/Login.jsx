import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
const Login = () => {
  
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const navigate=useNavigate()
  const {login}=useAuth()
  const handlesubmit =async (e)=>{
  e.preventDefault();
  try {
    const response=await axios.post("http://localhost:1234/api/auth/login",{email,password});
   
    if(response.data.success){
      login(response.data.user)
      localStorage.setItem("token",response.data.token)
     navigate('/')
    }
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 '>
    <div className='border shadow p-6 w-80 bg-white rounded-3xl'>
     <h2 className='text-2xl font-bold mb-4'>Login</h2>
     <form action="" onSubmit={handlesubmit}>
      
      <div className='mb-4'>
      <label htmlFor="email" className='block text-gray-700'>Email</label>
      <input type="email" placeholder='Enter Email' required className='w-full px-3 py-2 border' id="email" onChange={(e)=>{
        setemail(e.target.value)
      }}/>
      </div>
      <div className='mb-4'>
      <label htmlFor="password" className='block text-gray-700'>Password</label>
      <input type="password" placeholder='Enter Password' required className='w-full px-3 py-2 border' id="password" onChange={(e)=>{
        setpassword(e.target.value)
      }}/>
      </div>
      <button className='text-white bg-blue-500 px-4 py-2 text-md relative left-[90px] top-2 rounded-2xl'>Login </button>
     <p className='text-center mt-4'>
      dont have a account? <Link to="/register">Signup</Link>
     </p>
     </form>
    </div>
    </div>
  )
}

export default Login

