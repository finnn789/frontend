import React, { useState, useEffect } from "react";
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
  HStack,
  GridItem,
  Heading,
  Grid,
  InputRightAddon,
  InputGroup,
  Flex,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { IconTableAlias, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";

const WellTest = ({ onData, unitype, errorForms }) => {
  const [formData, setFormData] = useState([]);
  const [wellTest, setWellTest] = useState({
    unit_type: unitype,
    depth_datum: "RT",
    zone_name: "",
    zone_top_depth: 0,
    zone_bottom_depth: 0,
    depth_uom: "FEET",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWellTest((prev) => ({
      ...prev,
      [name]: name.includes("depth") ? parseFloat(value) : value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name.includes("depth") ? parseFloat(value) : value,
    }));
  };

  const handleAddClick = () => {
    const newData = { ...wellTest };
    if (editIndex !== null) {
      const updatedData = [...formData];
      updatedData[editIndex] = newData;
      setFormData(updatedData);
      setEditIndex(null);
    } else {
      setFormData((prev) => [...prev, newData]);
    }
    setWellTest({
      unit_type: unitype,
      depth_datum: "RT",
      zone_name: "",
      zone_top_depth: 0,
      zone_bottom_depth: 0,
      depth_uom: "FEET",
    });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditFormData(formData[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedData = [...formData];
    updatedData[index] = editFormData;
    setFormData(updatedData);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteClick = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
  };

  useEffect(() => {
    onData(formData);
  }, [formData]);

  return (
    <div fontFamily={"Montserrat"}>
      <Grid templateColumns={"repeat(2, 1fr)"} mt={4} gap={4} fontFamily={"Montserrat"}>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={6}>
            <Flex alignItems="center" mb={6}>
              <Icon as={IconTableAlias} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection={"column"}>
                <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                  Well Test
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  subtitle
                </Text>
              </Flex>
            </Flex>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Zone Name</FormLabel>
                  <InputGroup>
                    <Input
                      name="zone_name"
                      value={wellTest.zone_name}
                      onChange={handleChange}
                      placeholder="Zone Name"
                    />
                  </InputGroup>
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Zone Top Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="zone_top_depth"
                      type="number"
                      value={wellTest.zone_top_depth}
                      onChange={handleChange}
                      placeholder="Zone Top Depth"
                    />
                    <InputRightAddon>
                      {(unitype === "Metrics" && "METERS") || (unitype === "Imperial" && "FEET")}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Zone Bottom Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="zone_bottom_depth"
                      type="number"
                      value={wellTest.zone_bottom_depth}
                      onChange={handleChange}
                      placeholder="Zone Bottom Depth"
                    />
                    <InputRightAddon>
                      {(unitype === "Metrics" && "METERS") || (unitype === "Imperial" && "FEET")}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </HStack>
              <Button colorScheme="blue" onClick={handleAddClick}>
                Add Data
              </Button>
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth="1px" h={"325px"} borderRadius="lg" p={6} overflowY="auto">
            <Heading size="lg" mb={6} fontFamily={"Montserrat"}>
              Table Well Test
            </Heading>
            {formData.length > 0 ? (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    
                    <Th>Zone Name</Th>
                    <Th>Zone Top Depth</Th>
                    <Th>Zone Bottom Depth</Th>
                    
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData.map((data, index) => (
                    <Tr key={index}>
                      {editIndex === index ? (
                        <>
                          
                          <Td>
                            <Input
                              name="zone_name"
                              value={editFormData.zone_name}
                              onChange={handleEditChange}
                            />
                          </Td>
                          <Td>
                            <Input
                              name="zone_top_depth"
                              type="number"
                              value={editFormData.zone_top_depth}
                              onChange={handleEditChange}
                            />
                          </Td>
                          <Td>
                            <Input
                              name="zone_bottom_depth"
                              type="number"
                              value={editFormData.zone_bottom_depth}
                              onChange={handleEditChange}
                            />
                          </Td>
                          
                          <Td>
                            <HStack spacing={2}>
                              <IconButton
                                icon={<Icon as={IconCheck} />}
                                colorScheme="green"
                                size="sm"
                                onClick={() => handleSaveEdit(index)}
                                aria-label="Save"
                              />
                              <IconButton
                                icon={<Icon as={IconX} />}
                                colorScheme="red"
                                size="sm"
                                onClick={handleCancelEdit}
                                aria-label="Cancel"
                              />
                            </HStack>
                          </Td>
                        </>
                      ) : (
                        <>
                          
                          <Td>{data.zone_name}</Td>
                          <Td>{data.zone_top_depth}</Td>
                          <Td>{data.zone_bottom_depth}</Td>
                          
                          <Td>
                            <HStack spacing={2}>
                              <IconButton
                                icon={<Icon as={IconEdit} />}
                                colorScheme="blue"
                                size="sm"
                                onClick={() => handleEditClick(index)}
                                aria-label="Edit row"
                              />
                              <IconButton
                                icon={<Icon as={IconTrash} />}
                                colorScheme="red"
                                size="sm"
                                onClick={() => handleDeleteClick(index)}
                                aria-label="Delete row"
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
                {!!errorForms["job_plan.well.well_test"] && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    Well Test cannot be empty.
                  </Text>
                )}
              </Flex>
            )}
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default WellTest;
