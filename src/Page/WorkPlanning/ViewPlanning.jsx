import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Box, Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, SimpleGrid } from "@chakra-ui/react";
import Sidebar from "./../Components/Sidebar";
import Navbar from "./../Components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Plot from 'react-plotly.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ViewPlanning = () => {
  const { id } = useParams();
  const [selectedNav, setSelectedNav] = useState('homeDash');
  const [pageForm, setPageForm] = useState('');
  const [apiData, setApiData] = useState(null);
  const location = useLocation();

  const handleNavClick = (value) => {
    setSelectedNav(value);
    setPageForm('');
  };

  useEffect(() => {
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
    } else if (path.includes("/dashboard")) {
      setPageForm("homeDash");
      setSelectedNav("homeDash");
    } else {
      setPageForm("");
    }

    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/job/planning/view/${id}/`, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJza2siLCJleHAiOjE3MjQ1MTQxMjB9.T5KGGpdlLRr7EmBnrjAs-XWEEOOhAPRxD_NH6zm3_lc',
            'accept': 'application/json'
          }
        });

        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location.pathname, id]);

  const renderCardItem = (key, value) => (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4} key={key} w={"98%"}>
      <Text fontWeight="bold">{key}:</Text>
      <Text>{String(value)}</Text>
    </Box>
  );

  const renderOperationalDetails = (data) => (
    <Box flex="1" mr={4} mb={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Operational Details</Text>
      {Object.entries(data).map(([key, value]) => renderCardItem(key, value))}
    </Box>
  );

  const renderTechnicalDetails = (data) => (
    <Box flex="1" mr={4} mb={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>Technical Details</Text>
      <SimpleGrid columns={2}  >
        {Object.entries(data).map(([key, value]) => renderCardItem(key, value))}
      </SimpleGrid>
    </Box>
  );

  return (
    <Flex>
      <Sidebar handleMenuValue={handleNavClick} selectedNav={selectedNav} />
      <Box flex="1" p={4}>
        <Navbar appName="View Planning"/>
        <Box mt={4}>
          <Breadcrumb mb={4}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>View Planning</BreadcrumbLink>
            </BreadcrumbItem>
            {pageForm === 'submission' && (
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Exploration</BreadcrumbLink>
                <BreadcrumbLink href='#' fontWeight={'bold'}>Submission</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>

          <Text mt={4}>ID: {id}</Text>

          {apiData && (
            <>
              {/* Row 1: Operational and Technical Cards */}
              <Flex>
                {renderOperationalDetails(apiData.operational)}
                {renderTechnicalDetails(apiData.technical)}
              </Flex>

              {/* Row 2: Work Breakdown Structure Table and Chart */}
              <Box mb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={4}>Work Breakdown Structure</Text>
                <Flex>
                  <Box flex="1" mr={4}>
                    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                      {apiData.work_breakdown_structure && apiData.work_breakdown_structure.table && (
                        <AgGridReact
                          rowData={apiData.work_breakdown_structure.table} // Data untuk tabel
                          columnDefs={Object.keys(apiData.work_breakdown_structure.table[0] || {}).map(key => ({
                            headerName: key,
                            field: key
                          }))} // Definisi kolom berdasarkan keys dari objek data
                        />
                      )}
                    </div>
                  </Box>
                  <Box flex="1">
                    {apiData.work_breakdown_structure && apiData.work_breakdown_structure.plot && (
                      <Plot
                        data={apiData.work_breakdown_structure.plot.data || []}
                        layout={apiData.work_breakdown_structure.plot.layout || {}}
                        useResizeHandler
                        style={{ width: '100%', height: '100%' }}
                      />
                    )}
                  </Box>
                </Flex>
              </Box>
            </>
          )}

          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default ViewPlanning;
