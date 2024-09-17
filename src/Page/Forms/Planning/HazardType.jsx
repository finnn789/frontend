import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  Flex,
  Select,
  Icon,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { IconAlertTriangle, IconTable, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";

const HazardTypeForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    hazard_type: "",
    hazard_description: "",
    severity: "",
    remark: "",
    mitigation: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData({
      hazard_type: "",
      hazard_description: "",
      severity: "",
      remark: "",
      mitigation: "",
    });
  };

  const severity = [
    { name: "LOW", value: "LOW" },
    { name: "MEDIUM", value: "MEDIUM" },
    { name: "HIGH", value: "HIGH" },
    { name: "CRITICAL", value: "CRITICAL" },
  ];

  const hazardType = [
    { name: "GAS KICK", value: "GAS KICK" },
    { name: "STUCK PIPE", value: "STUCK PIPE" },
    { name: "LOST CIRCULATION", value: "LOST CIRCULATION" },
    { name: "WELL CONTROL", value: "WELL CONTROL" },
    { name: "EQUIPMENT FAILURE", value: "EQUIPMENT FAILURE" },
    { name: "OTHER", value: "OTHER" },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Flex alignItems="center" mb={6}>
        <Icon as={IconAlertTriangle} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
            {"Hazard Type"}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {"subtitle"}
          </Text>
        </Flex>
      </Flex>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Hazard Type</FormLabel>
            <Select name="hazard_type" value={formData.hazard_type} onChange={handleInputChange}>
              <option value="">Select Hazard Type</option>
              {hazardType.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Hazard Description</FormLabel>
            <Input
              name="hazard_description"
              type="text"
              placeholder="hazard_description"
              value={formData.hazard_description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Severity</FormLabel>
            <Select name="severity" value={formData.severity} onChange={handleInputChange}>
              <option value="">Select Severity</option>
              {severity.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Mitigation</FormLabel>
            <Input
              name="mitigation"
              value={formData.mitigation}
              onChange={handleInputChange}
              placeholder="mitigation"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Remarks</FormLabel>
            <Input name="remark" value={formData.remark} onChange={handleInputChange} placeholder="remarks" />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const HazardType = ({ onDataChange, errorForms }) => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onDataChange(updatedItems);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(items[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = editFormData;
    setItems(updatedItems);
    setEditIndex(null);
    onDataChange(updatedItems);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onDataChange(updatedItems);
  };

  return (
    <Flex mt={4}>
      <Box flex={1} mr={4}>
        <HazardTypeForm onAddItem={handleAddItem} />
      </Box>
      <Box flex={1} maxHeight={"465px"} overflowY={"auto"} borderWidth="1px" borderRadius="lg" p={4}>
        <Flex alignItems="center" mb={6}>
          <Icon as={IconTable} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
              {"Table"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        {items.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Hazard Type</Th>
                <Th>Hazard Desc</Th>
                <Th>Severity</Th>
                <Th>Mitigation</Th>
                <Th>Remarks</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item, index) => (
                <Tr key={index}>
                  {editIndex === index ? (
                    <>
                      <Td>
                        <Select name="hazard_type" value={editFormData.hazard_type} onChange={handleEditChange}>
                          <option value="">Select Hazard Type</option>
                          <option value="GAS KICK">GAS KICK</option>
                          <option value="STUCK PIPE">STUCK PIPE</option>
                          <option value="LOST CIRCULATION">LOST CIRCULATION</option>
                          <option value="WELL CONTROL">WELL CONTROL</option>
                          <option value="EQUIPMENT FAILURE">EQUIPMENT FAILURE</option>
                          <option value="OTHER">OTHER</option>
                        </Select>
                      </Td>
                      <Td>
                        <Input
                          name="hazard_description"
                          value={editFormData.hazard_description}
                          onChange={handleEditChange}
                        />
                      </Td>
                      <Td>
                        <Select name="severity" value={editFormData.severity} onChange={handleEditChange}>
                          <option value="">Select Severity</option>
                          <option value="LOW">LOW</option>
                          <option value="MEDIUM">MEDIUM</option>
                          <option value="HIGH">HIGH</option>
                          <option value="CRITICAL">CRITICAL</option>
                        </Select>
                      </Td>
                      <Td>
                        <Input name="mitigation" value={editFormData.mitigation} onChange={handleEditChange} />
                      </Td>
                      <Td>
                        <Input name="remark" value={editFormData.remark} onChange={handleEditChange} />
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<Icon as={IconCheck} />}
                            colorScheme="green"
                            onClick={() => handleSaveEdit(index)}
                            aria-label="Save"
                          />
                          <IconButton
                            icon={<Icon as={IconX} />}
                            colorScheme="red"
                            onClick={handleCancelEdit}
                            aria-label="Cancel"
                          />
                        </HStack>
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td>{item.hazard_type}</Td>
                      <Td>{item.hazard_description}</Td>
                      <Td>{item.severity}</Td>
                      <Td>{item.mitigation}</Td>
                      <Td>{item.remark}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <IconButton
                            icon={<Icon as={IconEdit} />}
                            colorScheme="blue"
                            onClick={() => handleEditClick(index)}
                            aria-label="Edit"
                          />
                          <IconButton
                            icon={<Icon as={IconTrash} />}
                            colorScheme="red"
                            onClick={() => handleDeleteItem(index)}
                            aria-label="Delete"
                          />
                        </HStack>
                      </Td>
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Flex justifyContent="center" flexDirection={"column"} alignItems="center" height="100%">
            <Heading fontFamily={"Montserrat"}>Tidak Ada Data</Heading>
            {/* Uncomment this block if errorForms prop is provided */}
            {errorForms && errorForms["job_plan.job_hazards"] && (
              <Text color="red.500" fontSize="sm" mt={2}>
                Job Operation Day cannot be empty.
              </Text>
            )}
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default HazardType;
