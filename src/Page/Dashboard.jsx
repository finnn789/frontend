// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomeDash";
import PengajuanPekerjaan from "./WorkPlanning/PengajuanPekerjaan";
import OperasiPengerjaan from "./WorkPlanning/OperasiPengerjaan";
import PPP from "./WorkPlanning/PPP";
import PengajuanPekerjaanForm from "./Forms/PengajuaanPekerjaanForm";
import { Outlet, useLocation } from "react-router-dom";


export function Dashboard() {
  const [selectedNav, setSelectedNav] = useState('homeDash');
  const [pageDashboard, setPageDashboard] = useState(1);
  const [pageForm, setPageForm] = useState('');
  const location = useLocation();


  const ControllerButtonPageForm = (value) => {
    setPageForm(value)
  }

  const handleNavClick = (value) => {
    setSelectedNav(value);
    setPageForm('');


  };

  useEffect(() => {
    // Update the state based on the current URL path
    const path = location.pathname;
    if (path.includes("/dashboard/submission")) {
      setPageForm("submission");
      setSelectedNav('submission');
    } else if (path.includes("/dashboard/operasi")) {
      setPageForm("operations");
      setSelectedNav("operations");
    } else if (path.includes("/dashboard/ppp")) {
      setPageForm("PPP");
      setSelectedNav("PPP");
    }else if (path.includes("/dashboard")) {
      setPageForm("homeDash");
      setSelectedNav("homeDash");
    }   
     else {
      setPageForm(""); // Default or reset state
    }
  }, [location.pathname]);

  return (
    <Flex>
      <Sidebar handleMenuValue={handleNavClick} selectedNav={selectedNav} />
      {/* <SidebarResponsive selectedNav={selectedNav} /> */}
      <Box flex="1" p={4}>
        <Navbar
        // appName={selectedNav === 1 && "Homepage"}
        // {selectedNav === 2 && "Add Data"}
        />
        <Box mt={4}>
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {pageForm === 'submission' && (
              <>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'>Exploration</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem >
                    <BreadcrumbLink href='#' fontWeight={'bold'}>Submission</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
            {pageForm === 'operations' && (
              <>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'>Exploration</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem >
                    <BreadcrumbLink href='#' fontWeight={'bold'}>Operasi</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
            {pageForm === 'PPP' && (
              <>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/dashboard'>Exploration</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem >
                    <BreadcrumbLink href='#' fontWeight={'bold'}>PPP</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}

            {selectedNav === 2 && (
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Add Data</BreadcrumbLink>
              </BreadcrumbItem>
            )}

            {selectedNav === 1 && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Homepage</BreadcrumbLink>
              </BreadcrumbItem>
            )}

            {selectedNav === 2 && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>Form</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>


          <Box>
            {selectedNav === 'homeDash' && <HomePage handleTambahData={setPageForm} />}
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

export default Dashboard;
