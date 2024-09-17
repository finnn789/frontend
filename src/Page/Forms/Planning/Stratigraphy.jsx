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

const Stratigraphy = ({
  setWellStratigraphy,
  unittype,
  errorForms,
}) => {
  const [WellStratigraphy, setLocalWellStratigraphy] = useState({
    stratigraphy_id: "",
    depth: "",
    depth_datum: "",
    TablewellStratigraphy: [],
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({ stratigraphy_id: "", depth: "" });

  useEffect(() => {
    setWellStratigraphy(WellStratigraphy);
  }, [WellStratigraphy, setWellStratigraphy]);

  const selectType = [
    { name: "RT", value: "RT" },
    { name: "KB", value: "KB" },
    { name: "MSL", value: "MSL" },
  ];

  const handleInputChangeWellStratigraphy = (e) => {
    const { name, value } = e.target;
    setLocalWellStratigraphy((prev) => ({
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

  const handleWellStratichy = () => {
    const { stratigraphy_id, depth } = WellStratigraphy;
    if (!stratigraphy_id || !depth) {
      alert("Please fill in all fields.");
      return;
    }

    setLocalWellStratigraphy((prev) => ({
      ...prev,
      TablewellStratigraphy: [
        ...prev.TablewellStratigraphy,
        { stratigraphy_id, depth },
      ],
      stratigraphy_id: "",
      depth: "",
    }));
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setEditFormData({ ...WellStratigraphy.TablewellStratigraphy[index] });
  };

  const handleSaveEdit = (index) => {
    const updatedTable = [...WellStratigraphy.TablewellStratigraphy];
    updatedTable[index] = editFormData;
    setLocalWellStratigraphy((prev) => ({
      ...prev,
      TablewellStratigraphy: updatedTable,
    }));
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedStratigraphy = WellStratigraphy.TablewellStratigraphy.filter(
      (_, i) => i !== index
    );
    setLocalWellStratigraphy({
      ...WellStratigraphy,
      TablewellStratigraphy: updatedStratigraphy,
    });
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
                setLocalWellStratigraphy({
                  ...WellStratigraphy,
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
                    value={WellStratigraphy.stratigraphy_id}
                    onChange={handleInputChangeWellStratigraphy}
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
                      value={WellStratigraphy.depth}
                      onChange={handleInputChangeWellStratigraphy}
                      placeholder="Depth"
                    />
                    <InputRightAddon>
                      {unittype === "Metrics" ? "METER" : "FEET"}
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>
            <Button colorScheme="blue" onClick={handleWellStratichy}>
              Add
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem height="100%">
        <Box borderWidth="1px" height="325px" borderRadius="lg" p={6}>
          {WellStratigraphy.TablewellStratigraphy.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Depth</Th>
                  <Th>Stratigraphy</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {WellStratigraphy.TablewellStratigraphy.map((row, index) => (
                  <Tr key={index}>
                    {editIndex === index ? (
                      <>
                        <Td>
                          <Input
                            name="depth"
                            type="number"
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
