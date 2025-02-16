import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {ToastContainer} from 'react-toastify'
const router=createBrowserRouter([
  {
    path:'/',
    element:
    <div>
      <Home/>
    </div>
    



  },{
    path:'/register',
    element:
    <div>
     <Signup/>
    </div>


  },{

    path:'/login',
    element:
    <div>
      <Login/>
    </div>


  }
])
function App() {
  

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App

