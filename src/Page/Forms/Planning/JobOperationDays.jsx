import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
} from "@chakra-ui/react";
import {
  IconTable,
  IconStopwatch,
  IconTrash,
  IconEdit,
  IconCheck,
  IconBriefcase,
} from "@tabler/icons-react";

const WorkBreakdownForm = ({ onAddItem, unitType = "Metrics" }) => {
  const [formData, setFormData] = useState({
    phase: "",
    depth_in: 0,
    depth_out: 0,
    operation_days: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" && value !== "" ? parseFloat(value) : value;
    setFormData((prevData) => ({ ...prevData, [name]: processedValue }));
  };

  const handleAdd = () => {
    onAddItem(formData);
    setFormData({
      phase: "",
      depth_in: 0,
      depth_out: 0,
      operation_days: 0,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} width="100%">
      <Flex alignItems="center">
        <Icon as={IconBriefcase} boxSize={12} color="gray.800" mr={3} />
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
      <FormControl>
        <FormLabel>Phase</FormLabel>
        <Input
          name="phase"
          value={formData.phase}
          onChange={handleInputChange}
          placeholder="Phase"
        />
      </FormControl>
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
          {unitType === "Metrics" ? (
            <InputRightAddon>METERS</InputRightAddon>
          ) : (
            <InputRightAddon>FEET</InputRightAddon>
          )}
        </InputGroup>
      </FormControl>
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
          {unitType === "Metrics" ? (
            <InputRightAddon>METERS</InputRightAddon>
          ) : (
            <InputRightAddon>FEET</InputRightAddon>
          )}
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Operation Days</FormLabel>
        <InputGroup>
          <Input
            name="operation_days"
            type="number"
            placeholder="Operation Days"
            value={formData.operation_days}
            onChange={handleInputChange}
          />
          <InputRightAddon>DAYS</InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button onClick={handleAdd} colorScheme="blue" mt={4}>
        Add
      </Button>
    </Box>
  );
};

const JobOperationDays = ({ ondata,unitType="Metrics" }) => {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editFormData, setEditFormData] = useState({});

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFormData({ ...items[index] });
  };

  const handleSave = (index) => {
    const updatedItems = [...items];
    updatedItems[index] = editFormData;
    setItems(updatedItems);
    setEditIndex(-1);
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue = type === "number" ? parseFloat(value) : value;
    setEditFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    ondata(items);
  }, [items]);

  return (
    <Flex mt={4}>
      <Box flex={1} mr={4}>
        <WorkBreakdownForm onAddItem={handleAddItem} unitType={unitType} />
      </Box>
      <Box
        flex={1}
        maxHeight="465px"
        overflowY="auto"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Phase</Th>
              <Th>Depth In</Th>
              <Th>Depth Out</Th>
              <Th>Operation Days</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, index) => (
              <Tr key={index}>
                {editIndex === index ? (
                  <>
                    <Td>
                      <Input
                        name="phase"
                        value={editFormData.phase}
                        onChange={handleEditChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        name="depth_in"
                        type="number"
                        value={editFormData.depth_in}
                        onChange={handleEditChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        name="depth_out"
                        type="number"
                        value={editFormData.depth_out}
                        onChange={handleEditChange}
                      />
                    </Td>
                    <Td>
                      <Input
                        name="operation_days"
                        type="number"
                        value={editFormData.operation_days}
                        onChange={handleEditChange}
                      />
                    </Td>
                    <Td>
                      <Button
                        onClick={() => handleSave(index)}
                        colorScheme="green"
                      >
                        <Icon as={IconCheck} />
                      </Button>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td>{item.phase}</Td>
                    <Td>{item.depth_in}</Td>
                    <Td>{item.depth_out}</Td>
                    <Td>{item.operation_days}</Td>
                    <Td>
                      <Button
                        onClick={() => handleEdit(index)}
                        colorScheme="blue"
                        mr={2}
                      >
                        <Icon as={IconEdit} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(index)}
                        colorScheme="red"
                      >
                        <Icon as={IconTrash} />
                      </Button>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default JobOperationDays;
