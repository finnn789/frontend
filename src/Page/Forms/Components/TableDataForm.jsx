import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
} from "@chakra-ui/react";

const TableDataForm = ({ data = [{}], headers = [{}], headerKey = "Header", onDataChange }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (row, rowIndex) => {
    setEditRowId(rowIndex);
    setEditFormData(row);
  };

  const handleEditFormChange = (e, column) => {
    setEditFormData({
      ...editFormData,
      [column.accessor]: e.target.value,
    });
  };

  const handleSaveClick = () => {
    const updatedData = [...data];
    updatedData[editRowId] = editFormData;
    onDataChange(updatedData);
    setEditRowId(null);
  };

  const handleDeleteClick = (rowIndex) => {
    const updatedData = data.filter((item, index) => index !== rowIndex);
    onDataChange(updatedData);
  };

  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            {headers.map((column, index) => (
              <Th key={index}>{column[headerKey]}</Th>
            ))}
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((column, colIndex) => (
                <Td key={colIndex}>
                  {editRowId === rowIndex ? (
                    <Input
                      width={"150px"}
                      type={column.type || "text"}
                      value={editFormData[column.accessor]}
                      onChange={(e) => handleEditFormChange(e, column)}
                    />
                  ) : (
                    column.render ? column.render(row) : row[column.accessor]
                  )}
                </Td>
              ))}
              <Td>
                {editRowId === rowIndex ? (
                  <Button onClick={handleSaveClick} colorScheme="blue">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEditClick(row, rowIndex)} colorScheme="teal">
                    Edit
                  </Button>
                )}
                <Button onClick={() => handleDeleteClick(rowIndex)} colorScheme="red" ml={2}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableDataForm;
