import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
const Signup = () => {
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const navigate=useNavigate()
  const handlesubmit =async (e)=>{
  e.preventDefault();
  try {
    const response=await axios.post("http://localhost:1234/api/auth/register",{name ,email,password});
    console.log(response);
    if(response.data.success){
    navigate('/login')
    }
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 '>
    <div className='border shadow p-6 w-80 bg-white rounded-3xl'>
     <h2 className='text-2xl font-bold mb-4 text-center'>Signup</h2>
     <form action="" onSubmit={handlesubmit}>
      <div className='mb-4'>
      <label htmlFor="name" className='block text-gray-700'>Name</label>
      <input type="text" placeholder='Enter Name' required className='w-full px-3 py-2 border' id="name"
      onChange={(e)=>{
        setname(e.target.value)
      }}/>
      </div>
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
      <button className='text-white bg-blue-500 px-4 py-2 text-md relative left-[90px] top-2 rounded-2xl'>Signup </button>
     <p className='text-center mt-4'>
      Already have a account? <Link to="/login">Login</Link>
     </p>
     </form>
    </div>
    </div>
  )
}

export default Signup

