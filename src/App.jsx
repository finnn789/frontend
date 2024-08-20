import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Page/Dashboard'
import Login from './Auth/Login'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    }
  ])
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
