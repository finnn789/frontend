import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './Page/Dashboard'
import Login from './Auth/Login'
import PengajuanPekerjaan from './Page/WorkPlanning/PengajuanPekerjaan'
import OperasiPengerjaan from './Page/WorkPlanning/OperasiPengerjaan'
import PPP from './Page/WorkPlanning/PPP'
import PengajuanPekerjaanForm from './Page/Forms/PengajuaanPekerjaanForm'
import Register from './Auth/Register'
import { useAuth } from './Auth/AuthContext'




function App() {
  const { isAuthenticated } = useAuth();
  

  const router = createBrowserRouter([
    {
      path: "/",
      element:isAuthenticated ? <Dashboard/> : <Login/>
    },
    {
      path: "/register",
      element:<Register/>
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard/> : <Navigate to="/"/>
    },
    {
      path:"/pengajuanpekerjaan",
      element:<PengajuanPekerjaan/>
    },
    {
      path:"/operasipekerjaan",
      element:<OperasiPengerjaan/>
    },
    {
      path:"/ppp",
      element:<PPP/>
    },
    {
      path:"/pengajuanpekerjaanform",
      element:<PengajuanPekerjaanForm/>
    }
  ])
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
