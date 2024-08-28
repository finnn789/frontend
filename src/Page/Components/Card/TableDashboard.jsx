import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiInfo, FiArrowUp } from "react-icons/fi";
import { Button } from "react-day-picker";

const TableDashboard = ({ datas,headers=[],children,props }) => {
    
  

  return (
    <TableContainer >
      <Table variant="simple" {...props} mt={2} colorScheme="teal" size={"sm"}  >
        <Thead bg={"gray.200"} fontWeight={"bold"} borderRadius="lg">
          <Tr>
            {headers.map((head, index) => (
              <Th key={index} fontSize={"18px"} >
                {head}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {children}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableDashboard;
