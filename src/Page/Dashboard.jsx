// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Box, Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomeDash";

export function Dashboard() {
  const [selectedNav, setSelectedNav] = useState(1);

  const handleNavClick = (value) => {
    setSelectedNav(value);
  };

  return (
    <Flex>
      <Sidebar onClickNavItem={handleNavClick} selectedNav={selectedNav} />
      {/* <SidebarResponsive selectedNav={selectedNav} /> */}
      <Box flex="1" p={4}>
        <Navbar appName=
          {selectedNav === 1 && "Homepage"}
          // {selectedNav === 2 && "Add Data"}
         />
        <Box mt={4}>
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>

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
            {selectedNav === 1 && <HomePage />}
            {/* {selectedNav === 2 && <AddData />} */}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;
