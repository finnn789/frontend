import React,{ useEffect, useState } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  VStack,
  HStack,
 
} from "@chakra-ui/react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import CustomCard from "./../Components/Card/CustomCard"; // Path yang sesuai
import WellTable from "./../Components/Card/WellTable"; // Path yang sesuai
import { FaCheckCircle, FaCogs, FaFlagCheckered } from "react-icons/fa";



const OperasiPengerjaan = ({ handleTambahData }) => {
  const [dataDrilling, setDataDrilling] = useState([]);
  const sendData = (data) => {
    setDataDrilling(data);
  }

  const navigate = useNavigate();
  const warnabutton = "teal";
  return (
    <>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          <Box mt={25}>
            <ButtonGroup variant="outline" spacing={2}>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Disetuji
              </Button>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Beroperasi
              </Button>
              <Button colorScheme={warnabutton} variant={"solid"}>
                Selesai
              </Button>
            </ButtonGroup>
          </Box>
          <HStack justify="flex-end">
            <Button colorScheme="blue" as={Link} to="/dashboard/operasi/operasiform">Tambah Data</Button>
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
                Table Data Status Operasi Pekerjaan
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
    <Outlet/>
    </>
  );
};

export default OperasiPengerjaan;
