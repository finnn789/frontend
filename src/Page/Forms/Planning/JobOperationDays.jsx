import React, { useEffect, useState } from "react";
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
  Grid,
  GridItem,
  Select,
  Icon,
  Text,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";

import {IconTable, IconStopwatch} from "@tabler/icons-react";

const WorkBreakdownForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    unit_type: "Metrics",
    phase: "",
    depth_datum: "RT",
    depth_in: 0,
    depth_out: 0,
    operation_days: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue;

    if (type === 'number') {
      processedValue = value === '' ? '' : parseFloat(value);
    } else {
      processedValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleAdd = () => {
    onAddItem(formData);
    setFormData({
      unit_type: "",
      phase: "",
      depth_datum: "RT",
      depth_in: 0,
      depth_out: 0,
      operation_days: 0,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Flex alignItems="center" mb={6}>
        <Icon as={IconStopwatch} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
            {"Job Operation Days"}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {"subtitle"}
          </Text>
        </Flex>
      </Flex>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Phase</FormLabel>
          <Input
            name="phase"
            value={formData.phase}
            onChange={handleInputChange}
            placeholder="Phase"
          ></Input>
        </FormControl>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Depth In</FormLabel>
              <InputGroup>
                <Input
                  name="depth_in"
                  type="number"
                  placeholder="Depth In"
                  value={formData.depth_in}
                  onChange={handleInputChange}
                />
                <InputRightAddon>METERS</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Depth Out</FormLabel>
              <InputGroup>
                <Input
                  name="depth_out"
                  type="number"
                  placeholder="Depth Out"
                  value={formData.depth_out}
                  onChange={handleInputChange}
                />
                <InputRightAddon>METERS</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>
        <FormControl>
          <FormLabel>Operation Days</FormLabel>
          <InputGroup>
            <Input
              name="operation_days"
              value={formData.operation_days}
              onChange={handleInputChange}
              type="number"
              placeholder="Operation Days"
            />
            <InputRightAddon>METERS</InputRightAddon>
          </InputGroup>
        </FormControl>
        <Button onClick={handleAdd} colorScheme="blue">
          Add
        </Button>
      </VStack>
    </Box>
  );
};

const JobOperationDays = ({ ondata, errorForms }) => {
  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  useEffect(() => {
    ondata(items);
  }, [items]);
  return (
    <Flex mt={4}>
      <Box flex={1} mr={4}>
        <WorkBreakdownForm onAddItem={handleAddItem} />
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
        {items.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Phase</Th>
              <Th>Depth In</Th>
              <Th>Depth Out</Th>
              <Th>Operation Days</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                <Td>{item.phase}</Td>
                <Td>{item.depth_in}</Td>
                <Td>{item.depth_out}</Td>
                <Td>{item.operation_days}</Td>
              </Tr>
            ))}
          </Tbody>
          </Table>
        ) : (
          <Flex justifyContent="center" flexDirection={"column"} alignItems="center" height="100%">
          <Heading fontFamily={"Montserrat"}>Tidak Ada Data</Heading>
          {/* Tampilkan pesan error hanya jika objek dan propertinya ada */}
{errorForms && errorForms["job_plan.job_operation_days"] && errorForms["job_plan.job_operation_days"] && (
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

export default JobOperationDays;
