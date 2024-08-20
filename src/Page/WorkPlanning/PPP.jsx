import React from "react";
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

const PPP = () => {
  const warnabutton = "teal";
  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <ButtonGroup variant="outline" spacing={2}>
          <Button colorScheme={warnabutton} variant={"solid"}>
            Eksplorasi
          </Button>
          <Button colorScheme={warnabutton} variant={"solid"}>
            Eksploitasi
          </Button>
          <Button colorScheme={warnabutton} variant={"solid"}>
            Workover
          </Button>
          <Button colorScheme={warnabutton} variant={"solid"}>
            WellServices
          </Button>
        </ButtonGroup>
        <Box mt={25}>
          <ButtonGroup variant="outline" spacing={2}>
            <Button colorScheme={warnabutton} variant={"solid"}>
              Disetuji
            </Button>
            <Button colorScheme={warnabutton} variant={"solid"}>
              Belum Beroperasi
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
          <Button colorScheme="blue">Tambah Data</Button>
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
                Pekerjaan Belum Beroperasi
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
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="sm"
        >
          <TableContainer>
            <Table variant="simple">
              <TableCaption placement="top">Pekerjaan Beroperasi</TableCaption>
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
  );
};

export default PPP;
