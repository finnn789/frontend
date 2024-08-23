import React, { useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import PengajuanPekerjaanForm from "../Forms/PengajuaanPekerjaanForm";
import { Link, Outlet, useNavigate } from "react-router-dom";

const PengajuanPekerjaan = ({ handleTambahData }) => {

  const [dataDrilling, setDataDrilling] = useState([]);
  const sendData = (data) => {
    setDataDrilling(data);
  }


  const [dataSubmit, setdataSumbit] = useState({
    planned_well: {

    }
  })

  useEffect(() => {
    if (dataDrilling?.teknisData) {
      const { unit, ...wellWithoutUnit } = dataDrilling.teknisData.elevasi;

      const plannedWellData = {
        ...dataDrilling.teknisData.well,
        ...dataDrilling.teknisData.koordinat, // Contoh jika ada data dari koordinat
        ...wellWithoutUnit, // Contoh jika ada data dari elevasi
        // Tambahkan sumber data lainnya jika diperlukan
      };


      const jobData = {
        ...dataDrilling.operasionalData.proposedJob
      }
      const {totalBudget, ...newJobData} = jobData
      setdataSumbit({
        job: {
          ...newJobData,
          planned_well: plannedWellData,
        }
        

      });
    }
  }, [dataDrilling])

  console.log(dataSubmit);
  
  // useEffect(() => {
  //   if (dataDrilling?.teknisData) {
  //     const { unit, ...wellWithoutUnit } = dataDrilling.teknisData.elevasi;
  //     console.log(wellWithoutUnit);
      
  //     const plannedWellData = {
  //       ...dataDrilling.teknisData.well,
  //       ...dataDrilling.teknisData.koordinat, // Contoh jika ada data dari koordinat
  //       ...wellWithoutUnit, // Contoh jika ada data dari elevasi
  //       // Tambahkan sumber data lainnya jika diperlukan
  //     };

  //     setdataSumbit({
  //       planned_well: plannedWellData
  //     });
  //   }
  // }, [dataDrilling])



  // console.log(dataSubmit);
  



  const navigate = useNavigate();
  const warnabutton = "teal";
  return (
    <>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Box mt={25}>
            <ButtonGroup variant="outline" spacing={2}>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Diajukan
              </Button>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Ditolak
              </Button>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Disetujui
              </Button>
            </ButtonGroup>
          </Box>

          <HStack justify="flex-end">
            <Button colorScheme="blue" as={Link} to={"/dashboard/submission/pengajuanform"} >Tambah Data</Button>
          </HStack>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
          >
            <TableContainer>
              <Table variant="simple">
                <TableCaption placement="top">
                  Table data Status Pengajuan Pekerjaan
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Status</Th>
                    <Th>Count</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Status 1</Td>
                    <Td>10</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Box>
      <Outlet context={{ sendData }} />
    </>

  );
};

export default PengajuanPekerjaan;
