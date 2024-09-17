// IncidentTable.js
import React, { useState, useEffect } from "react";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, Flex, SimpleGrid } from "@chakra-ui/react";

const IncidentTable = ({ handleOnChangeData }) => {
  const [incidentData, setIncidentData] = useState([]);
  const [incidentForm, setIncidentForm] = useState({
    incident_time: "",
    incident: "",
    type: "",
    comments: "",
  });

  const handleInputChange = (name) => (e) => {
    setIncidentForm((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleAddIncident = () => {
    setIncidentData((prevData) => [...prevData, incidentForm]);
    setIncidentForm({
      incident_time: "",
      incident: "",
      type: "",
      comments: "",
    });
  };

  React.useEffect(() => {
    handleOnChangeData(incidentData);
  }, [incidentData]);

  const handleDeleteIncident = (index) => {
    setIncidentData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <SimpleGrid columns={2} gap={4} mt={4}>
      {/* Form Input Section */}
      <Box>
        <SimpleGrid columns={1} gap={4} mb={4}>
          <Input
            placeholder="Incident Time"
            value={incidentForm.incident_time}
            onChange={handleInputChange("incident_time")}
          />
          <Input
            placeholder="Incident"
            value={incidentForm.incident}
            onChange={handleInputChange("incident")}
          />
          <Input
            placeholder="Type"
            value={incidentForm.type}
            onChange={handleInputChange("type")}
          />
          <Input
            placeholder="Comments"
            value={incidentForm.comments}
            onChange={handleInputChange("comments")}
          />
          <Button colorScheme="blue" onClick={handleAddIncident}>
            Add Incident
          </Button>
        </SimpleGrid>
      </Box>

      {/* Table Section */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Incident Time</Th>
              <Th>Incident</Th>
              <Th>Type</Th>
              <Th>Comments</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {incidentData.map((incident, index) => (
              <Tr key={index}>
                <Td>{incident.incident_time}</Td>
                <Td>{incident.incident}</Td>
                <Td>{incident.type}</Td>
                <Td>{incident.comments}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteIncident(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </SimpleGrid>
  );
};

export default IncidentTable;
