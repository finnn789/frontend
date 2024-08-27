import React, { useState, useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import { useAuth } from "./Auth/AuthContext";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PengajuanPekerjaan from "./Page/WorkPlanning/PengajuanPekerjaan";
import OperasiPengerjaan from "./Page/WorkPlanning/OperasiPengerjaan";
import PPP from "./Page/WorkPlanning/PPP";
import PengajuanPekerjaanForm from "./Page/Forms/PengajuaanPekerjaanForm";
import PengajuanOperasiForm from "./Page/Forms/OperasiPengajuaanForm";
import PlanningWows from "./Page/Forms/PlanningWows";
import OperasiPengajuaanForm from "./Page/Forms/OperasiPengajuaanForm";
import ProtectedRoute from "./Auth/ProtectedUser";
import DashboardSKK from "./Page/PageSKK/DashboardKKS";
import HomeDashKKKS from "./Page/PageSKK/Components/HomeDashSKK";
import ViewPlanning from "./Page/WorkPlanning/ViewPlanning";
import HomeExploitation from "./Page/Components/PageExploitasi/HomeDashExplo";
import SplashScreen from "./Page/Components/SplashScreen"; // Import SplashScreen

function App() {
  const { isAuthenticated } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const splashScreenShown = localStorage.getItem("splashScreenShown");

      if (!splashScreenShown) {
        setShowSplashScreen(true);
        localStorage.setItem("splashScreenShown", "true");

        const timer = setTimeout(() => {
          setShowSplashScreen(false);
        }, 3000); // Tampilkan splash screen selama 3 detik

        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: showSplashScreen ? (
        <SplashScreen />
      ) : (
        <ProtectedRoute element={<Dashboard />} allowedRoles={["Admin"]} />
      ),
      children: [
        {
          path: "submission",
          element: (
            <ProtectedRoute
              element={<PengajuanPekerjaan />}
              allowedRoles={["Admin"]}
            />
          ),
          children: [
            {
              path: "pengajuanform",
              element: <PengajuanPekerjaanForm />,
            },
          ],
        },
        {
          path: "operasi",
          element: <OperasiPengerjaan />,
          children: [
            {
              path: "operasiform",
              element: <OperasiPengajuaanForm />,
            },
          ],
        },
        {
          path: "ppp",
          element: <PPP />,
          children: [
            {
              path: "pppform",
              element: <PengajuanPekerjaanForm />,
            },
          ],
        },
      ],
    },
    {
      path: "development",
      element: <Dashboard />,
      children: [
        {
          path: "perencanaan",
          element: <HomeExploitation />,
        },
      ],
    },
    {
      path: "/skk",
      element: <DashboardSKK />,
      children: [
        {
          path: "dashboard",
          element: <HomeDashKKKS />,
        },
      ],
    },
    {
      path: "/pengajuanpekerjaan",
      element: <PengajuanPekerjaan />,
    },
    {
      path: "/operasipekerjaan",
      element: <OperasiPengerjaan />,
    },
    {
      path: "/ppp",
      element: <PPP />,
    },
    {
      path: "/pengajuanpekerjaanform",
      element: <PengajuanPekerjaanForm />,
    },
    {
      path: "/pengajuanoperasiform",
      element: <PengajuanOperasiForm />,
    },
    {
      path: "/pengajuanwowsform",
      element: <PlanningWows />,
    },
    {
      path: "viewplanning/:id",
      element: <ViewPlanning />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
