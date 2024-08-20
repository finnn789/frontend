import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Page/Dashboard'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard/>
    }
  ])
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
