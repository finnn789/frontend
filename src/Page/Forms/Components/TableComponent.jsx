import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

const TableComponent = ({ data, columns, headerKey = "Header" }) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead >
          <Tr>
            {columns.map((column, index) => (
              <Th key={index}>{column[headerKey]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <Td key={colIndex}>
                  {column.render ? column.render(row) : row[column.accessor]}{" "}
                  {/* Render content or custom render function */}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
