// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
// import Sidebar from "../Components/Sidebar";
// import Navbar from "../Components/Navbar";
// import HomePage from "./Components/HomeDash";
import { Outlet, useLocation } from "react-router-dom";
import SidebarKKS from "./Components/SidebarSKK";
import NavbarKKKS from "./Components/NavbarSKK";

export function DashboardSKK() {
  const [selectedNav, setSelectedNav] = useState("homeDash");
  const [pageForm, setPageForm] = useState("");
  const location = useLocation();

  const handleNavClick = (value) => {
    setSelectedNav(value);
    setPageForm("");
  };
  const username = JSON.parse(localStorage.getItem("user")).username;;

  return (
    <Flex>
      <SidebarKKS handleMenuValue={handleNavClick} selectedNav={selectedNav} />
      <Box flex="1" p={4}>
        <NavbarKKKS
          appName={location.pathname === "/skk/dashboard" && "Dashboard" || location.pathname === "/skk/exploration" && "Eksplorasi" || location.pathname === "/skk/development" && "Eksploitasi" || location.pathname === "/skk/workover" && "Work Over" || location.pathname === "/skk/wellservice" && "Well Service"}
          nameUser={username}

          // appName={selectedNav === 1 && "Homepage"}
          // {selectedNav === 2 && "Add Data"}
        />
        <Box mt={4}>
          <Box>
            {/* {selectedNav === 'homeDash' && <HomePage handleTambahData={setPageForm} />} */}
            {/* {selectedNav === 'submission' && <PengajuanPekerjaan handleTambahData={setPageForm} />} */}
            {/* {selectedNav === 'operations' && <OperasiPengerjaan handleTambahData={setPageForm} />} */}
            {/* {selectedNav === 'PPP' && <PPP handleTambahData={setPageForm} />} */}

            {/* {selectedNav === 2 && <AddData />} */}
            {/* <PengajuanPekerjaan /> */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default DashboardSKK;
