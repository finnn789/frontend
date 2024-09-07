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
} from "@chakra-ui/react";

import { IconAlertTriangle, IconTable } from "@tabler/icons-react";
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
    {
      name: "LOW",
      value: "LOW",
    },
    {
      name: "MEDIUM",
      value: "MEDIUM",
    },
    {
      name: "HIGH",
      value: "HIGH",
    },
    {
      name: "CRITICAL",
      value: "CRITICAL",
    },
  ];

  const hazardType = [
    {
      name: "GAS KICK",
      value: "GAS KICK",
    },
    {
      name: "STUCK PIPE",
      value: "STUCK PIPE",
    },
    {
      name: "LOST CIRCULATION",
      value: "LOST CIRCULATION",
    },
    {
      name: "WELL CONTROL",
      value: "WELL CONTROL",
    },
    {
      name: "EQUIPMENT FAILURE",
      value: "EQUIPMENT FAILURE",
    },
    {
      name: "OTHER",
      value: "OTHER",
    },
  ];

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Flex alignItems="center" mb={6}>
        <Icon as={IconAlertTriangle} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
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
            <Select
              name="hazard_type"
              value={formData.hazard_type}
              onChange={handleInputChange}
            >
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
            <Select
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
            >
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
            <Input
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
              placeholder="remarks"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const HazardType = ({ onDataChange }) => {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    const updatedItems = [...items, newItem];
    console.log(updatedItems);
    
    setItems(updatedItems);
    onDataChange(updatedItems); // Kirim data ke Parent component
  };



  return (
    <Flex mt={4}>
      <Box flex={1} mr={4}>
        <HazardTypeForm onAddItem={handleAddItem} />
      </Box>
      <Box
        flex={1}
        maxHeight={"465px"}
        overflowY={"auto"}
        borderWidth="1px"
        borderRadius="lg"
        p={4}
      >
        <Flex alignItems="center" mb={6}>
          <Icon as={IconTable} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Table"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Hazard Type</Th>
              <Th>Hazard Desc</Th>
              <Th>Severity</Th>
              <Th>Mitigation</Th>
              <Th>Remarks</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.hazard_type}</Td>
                <Td>{item.hazard_description}</Td>
                <Td>{item.severity}</Td>
                <Td>{item.mitigation}</Td>
                <Td>{item.remark}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default HazardType;
