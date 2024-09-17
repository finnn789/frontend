import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  VStack,
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { IconLayersSubtract, IconEdit, IconCheck, IconX } from "@tabler/icons-react";

const Stratigraphy = ({ setWellStratigraphy, unittype, errorForms,onData }) => {
  const [WellStratigraphy, setLocalWellStratigraphy] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ stratigraphy_id: "", depth: "" });
  const [editFormData, setEditFormData] = useState({ stratigraphy_id: "", depth: "" });

  useEffect(() => {
    setWellStratigraphy(WellStratigraphy);
  }, [WellStratigraphy]);

  const selectType = [
    { name: "RT", value: "RT" },
    { name: "KB", value: "KB" },
    { name: "MSL", value: "MSL" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStratigraphy = () => {
    const { stratigraphy_id, depth } = formData;
    if (!stratigraphy_id || depth === "") {
      alert("Please fill in all fields.");
      return;
    }

    setLocalWellStratigraphy((prev) => [
      ...prev,
      { stratigraphy_id, depth: parseFloat(depth) },
    ]);
    setFormData({ stratigraphy_id: "", depth: "" });
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setEditFormData({ ...WellStratigraphy[index] });
  };

  const handleSaveEdit = (index) => {
    const updatedTable = [...WellStratigraphy];
    updatedTable[index] = { ...editFormData, depth: parseFloat(editFormData.depth) };
    setLocalWellStratigraphy(updatedTable);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedStratigraphy = WellStratigraphy.filter((_, i) => i !== index);
    setLocalWellStratigraphy(updatedStratigraphy);
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={7} fontFamily="Montserrat">
      <GridItem colSpan={1} height="100%">
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Flex alignItems="center">
              <Icon as={IconLayersSubtract} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection="column">
                <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                  Stratigraphy
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  Subtitle
                </Text>
              </Flex>
            </Flex>
            <Select
              width="auto"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  depth_datum: e.target.value,
                })
              }
            >
              {selectType.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Flex>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem gap={2} colSpan={2}>
                <FormControl>
                  <FormLabel>Stratigraphy</FormLabel>
                  <Select
                    name="stratigraphy_id"
                    value={formData.stratigraphy_id}
                    onChange={handleInputChange}
                    placeholder="Stratigraphy"
                  >
                    <option value="LITHOSTRATIGRAPHIC">LITHOSTRATIGRAPHIC</option>
                    <option value="CHRONOSTRATIGRAPHIC">CHRONOSTRATIGRAPHIC</option>
                    <option value="OTHER">OTHER</option>
                    <option value="RADIOMETRIC">RADIOMETRIC</option>
                    <option value="BIOSTRATIGRAPHIC">BIOSTRATIGRAPHIC</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Bottom Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="depth"
                      type="number"
                      step="0.01"
                      value={formData.depth}
                      onChange={handleInputChange}
                      placeholder="Depth"
                    />
                    <InputRightAddon>
                      {unittype === "Metrics" ? "METER" : "FEET"}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>
            <Button colorScheme="blue" onClick={handleAddStratigraphy}>
              Add
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem height="100%">
        <Box borderWidth="1px" height="325px" borderRadius="lg" p={6}>
          {WellStratigraphy.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Depth</Th>
                  <Th>Stratigraphy</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {WellStratigraphy.map((row, index) => (
                  <Tr key={index}>
                    {editIndex === index ? (
                      <>
                        <Td>
                          <Input
                            name="depth"
                            type="number"
                            step="0.01"
                            value={editFormData.depth}
                            onChange={handleEditChange}
                          />
                        </Td>
                        <Td>
                          <Select
                            name="stratigraphy_id"
                            value={editFormData.stratigraphy_id}
                            onChange={handleEditChange}
                          >
                            <option value="LITHOSTRATIGRAPHIC">LITHOSTRATIGRAPHIC</option>
                            <option value="CHRONOSTRATIGRAPHIC">CHRONOSTRATIGRAPHIC</option>
                            <option value="OTHER">OTHER</option>
                            <option value="RADIOMETRIC">RADIOMETRIC</option>
                            <option value="BIOSTRATIGRAPHIC">BIOSTRATIGRAPHIC</option>
                          </Select>
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
                        <Td>{row.depth}</Td>
                        <Td>{row.stratigraphy_id}</Td>
                        <Td>
                          <HStack spacing={2}>
                            <IconButton
                              icon={<Icon as={IconEdit} />}
                              colorScheme="blue"
                              size="sm"
                              onClick={() => handleEditRow(index)}
                              aria-label="Edit row"
                            />
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Flex
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
              height="100%"
            >
              <Heading fontFamily="Montserrat">Tidak Ada Data</Heading>
              {!!errorForms["job_plan.well.well_stratigraphy"] && (
                <Text color="red.500" fontSize="sm" mt={2}>
                  Well Stratigraphy cannot be empty.
                </Text>
              )}
            </Flex>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Stratigraphy;
