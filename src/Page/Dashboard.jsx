// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomeDash";
import PengajuanPekerjaan from "./WorkPlanning/PengajuanPekerjaan";
import OperasiPengerjaan from "./WorkPlanning/OperasiPengerjaan";
import PPP from "./WorkPlanning/PPP";
// import PengajuanPekerjaanForm from "./Forms/PengajuanPekerjaanForm";


export function Dashboard() {
  const [selectedNav, setSelectedNav] = useState('homeDash');
  const [pageForm, setPageForm] = useState('');

  const ControllerButtonPageForm = (value) => {
    setPageForm(value);
  };

  const handleNavClick = (value) => {
    setSelectedNav(value);
    setPageForm('');
  };

  const getAppName = () => {
    switch (selectedNav) {
      case 'homeDash':
        return "Homepage";
      case 'submission':
        return "Pengajuan Pekerjaan";
      case 'operations':
        return "Operasi Pengerjaan";
      case 'PPP':
        return "PPP";
      default:
        return "Dashboard";
    }
  };

  return (
    <Flex>
      <Sidebar handleMenuValue={handleNavClick} selectedNav={selectedNav} appName={getAppName()} />
      <Box flex="1" p={4}>
        <Navbar appName={getAppName()} />
        <Box mt={4}>
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            {selectedNav !== 'homeDash' && (
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>{getAppName()}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>

          <Box>
            {selectedNav === 'homeDash' && <HomePage handleTambahData={setPageForm} />}
            {selectedNav === 'submission' && <PengajuanPekerjaan handleTambahData={setPageForm} />}
            {selectedNav === 'operations' && <OperasiPengerjaan handleTambahData={setPageForm} />}
            {selectedNav === 'PPP' && <PPP handleTambahData={setPageForm} />}

            {pageForm === 'addData' && <PengajuanPekerjaanForm />}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;
