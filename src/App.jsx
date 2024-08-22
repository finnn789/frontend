import './App.css'


import { useAuth } from './Auth/AuthContext'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './Page/Dashboard'
import Login from './Auth/Login'
import Register from './Auth/Register'
import PengajuanPekerjaan from './Page/WorkPlanning/PengajuanPekerjaan'
import OperasiPengerjaan from './Page/WorkPlanning/OperasiPengerjaan'
import PPP from './Page/WorkPlanning/PPP'
import PengajuanPekerjaanForm from './Page/Forms/PengajuaanPekerjaanForm'
import PengajuanWowsForm from './Page/Forms/PengajuanWOWSForm'




function App() {
  const { isAuthenticated } = useAuth();


  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Dashboard /> : <Login />
    },
    {
      path: "/register",
      element: <Register />,
      
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/" />,
      
      
    },
    {
      path: "/pengajuanpekerjaan",
      element: <PengajuanPekerjaan />
    },
    {
      path: "/operasipekerjaan",
      element: <OperasiPengerjaan />
    },
    {
      path: "/ppp",
      element: <PPP />
    },
    {
      path:"/pengajuanpekerjaanform",
      element:<PengajuanPekerjaanForm/>
    },
    {
      path:"/pengajuanwowsform",
      element:<PengajuanWowsForm/>
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
