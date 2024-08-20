import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './Page/Dashboard'
import Login from './Auth/Login'
import { useAuth } from './Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import Register from './Auth/Register'



function App() {
  const { isAuthenticated } = useAuth();
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/dashboard",
      element:<Dashboard/> 
    }
  ])
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
