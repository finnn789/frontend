import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  InputGroup,
  InputRightAddon,
  Icon,
  Text,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { IconCylinder, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";

const WellCasing = ({ dataWellCasing, errorForms = false, unittype = "Metrics" }) => {
  const [showWellCasing, setShowWellCasing] = useState({
    names: [],
    top_depths: [],
    bottom_depths: [],
    diameters: [],
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [tableWellCasing, setTableWellCasing] = useState([]);
  const [wellCasing, setWellCasing] = useState({
    unit_type: unittype,
    depth_datum: "RT",
    depth: "",
    length: "",
    hole_diameter: "",
    casing_outer_diameter: "",
    casing_inner_diameter: "",
    casing_grade: "",
    casing_weight: "",
    connection: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleWellCasing = () => {
    const calculationBottomDepth = (depth, length) => {
      return parseFloat(depth) - parseFloat(length);
    };

    const newEntry = { ...wellCasing };
    const updatedTable = [...tableWellCasing, newEntry];
    setTableWellCasing(updatedTable);
    setShowWellCasing((prevData) => ({
      names: [...prevData.names, newEntry.description],
      bottom_depths: [...prevData.bottom_depths, parseFloat(newEntry.depth)],
      top_depths: [...prevData.top_depths, calculationBottomDepth(newEntry.depth, newEntry.length)],
      diameters: [...prevData.diameters, parseFloat(newEntry.casing_outer_diameter)],
    }));

    dataWellCasing(updatedTable);
    resetWellCasing();
  };

  const handleInputChangeWellCasing = (e) => {
    const { name, value, type } = e.target;
    let processedValue = type === "number" && value !== "" ? parseFloat(value) : value;
    setWellCasing((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    let processedValue = type === "number" && value !== "" ? parseFloat(value) : value;
    setEditFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const resetWellCasing = () => {
    setWellCasing({
      unit_type: unittype,
      depth_datum: "RT",
      depth: "",
      length: "",
      hole_diameter: "",
      casing_outer_diameter: "",
      casing_inner_diameter: "",
      casing_grade: "",
      casing_weight: "",
      connection: "",
      description: "",
    });
  };

  const clickShowCasing = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/visualize/visualize-casing`,
        showWellCasing,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        const sessionId = response.data.data.session_id;
        try {
          const visualizationResponse = await axios.get(
            `${import.meta.env.VITE_APP_URL}/visualize/casing-visualization/${sessionId}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              responseType: "blob",
            }
          );

          const blob = visualizationResponse.data;
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        } catch (error) {
          console.error("Error getting Data Table", error);
        }
      }
    } catch (error) {
      console.error("Error get Data Table", error);
    }
  };

  const handleDeleteRow = (index) => {
    const updatedTable = tableWellCasing.filter((_, i) => i !== index);
    setTableWellCasing(updatedTable);
    dataWellCasing(updatedTable);

    setShowWellCasing((prevData) => ({
      names: prevData.names.filter((_, i) => i !== index),
      top_depths: prevData.top_depths.filter((_, i) => i !== index),
      bottom_depths: prevData.bottom_depths.filter((_, i) => i !== index),
      diameters: prevData.diameters.filter((_, i) => i !== index),
    }));
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setEditFormData(tableWellCasing[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTable = [...tableWellCasing];
    updatedTable[index] = editFormData;
    setTableWellCasing(updatedTable);
    setEditIndex(null);
    dataWellCasing(updatedTable);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const optionsWellCasing = [
    { name: "RT", value: "RT" },
    { name: "KB", value: "KB" },
    { name: "MSL", value: "MSL" },
  ];

  useEffect(() => {
    setWellCasing((prevData) => ({
      ...prevData,
      unit_type: unittype,
    }));
  }, [unittype]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} height="600px" fontFamily={"Montserrat"}>
      <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Flex alignItems="center" flexDirection={"row"}>
            <Icon as={IconCylinder} boxSize={12} color="gray.800" mr={3} />
            <Flex flexDirection="column">
              <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                Well Casing
              </Text>
              <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                subtitle
              </Text>
            </Flex>
          </Flex>
          <Select
            width="auto"
            onChange={(e) => setWellCasing({ ...wellCasing, depth_datum: e.target.value })}
          >
            {optionsWellCasing.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
        </Flex>
        <VStack spacing={4} align="stretch">
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <FormControl>
              <FormLabel>Depth</FormLabel>
              <InputGroup>
                <Input
                  name="depth"
                  type="number"
                  value={wellCasing.depth}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Depth"
                />
                <InputRightAddon>{wellCasing.unit_type === "Metrics" ? "METERS" : "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Length</FormLabel>
              <InputGroup>
                <Input
                  name="length"
                  type="number"
                  value={wellCasing.length}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Length"
                />
                <InputRightAddon>{wellCasing.unit_type === "Metrics" ? "METERS" : "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Hole Diameter</FormLabel>
              <InputGroup>
                <Input
                  name="hole_diameter"
                  value={wellCasing.hole_diameter}
                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Hole Diameter"
                />
                <InputRightAddon>{wellCasing.unit_type === "Metrics" ? "INCH" : "mm"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Casing Outer Diameter</FormLabel>
              <InputGroup>
                <Input
                  name="casing_outer_diameter"
                  value={wellCasing.casing_outer_diameter}
                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Casing Outer Diameter"
                />
                <InputRightAddon>{wellCasing.unit_type === "Metrics" ? "INCH" : "mm"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Casing Inner Diameter</FormLabel>
              <InputGroup>
                <Input
                  name="casing_inner_diameter"
                  value={wellCasing.casing_inner_diameter}
                  onChange={handleInputChangeWellCasing}
                  type="number"
                  placeholder="Casing Inner Diameter"
                />
                <InputRightAddon>{wellCasing.unit_type === "Metrics" ? "INCH" : "mm"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Casing Grade</FormLabel>
              <InputGroup>
                <Select
                  onChange={(e) =>
                    setWellCasing({
                      ...wellCasing,
                      casing_grade: e.target.value,
                    })
                  }
                  value={wellCasing.casing_grade}
                >
                  <option value="H40">H40</option>
                  <option value="K55">K55</option>
                  <option value="J55">J55</option>
                  <option value="N80">N80</option>
                  <option value="C95">C95</option>
                  <option value="P10">P10</option>
                  <option value="S125">S125</option>
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Casing Weight</FormLabel>
              <InputGroup>
                <Input
                  name="casing_weight"
                  value={wellCasing.casing_weight}
                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Casing Weight"
                />
                <InputRightAddon>{wellCasing.unit_type ? "KG/m" : "PPF"}</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Connection</FormLabel>
              <Input
                name="connection"
                value={wellCasing.connection}
                onChange={handleInputChangeWellCasing}
                placeholder="Connection"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                type="text"
                value={wellCasing.description}
                onChange={handleInputChangeWellCasing}
                placeholder="Description"
              />
            </FormControl>
          </Grid>
          <Button colorScheme="blue" onClick={handleWellCasing}>
            {editIndex !== null ? "Update Data" : "Add Data"}
          </Button>
        </VStack>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" boxShadow="md" height="100%" display="flex" flexDirection="column" overflow="hidden">
        <Tabs display="flex" flexDirection="column" height="100%">
          <TabList position="sticky" top={0} bg="white" zIndex={1}>
            <Tab>Table</Tab>
            <Tab>Casing</Tab>
          </TabList>

          <TabPanels flex={1} overflowY="auto">
            <TabPanel height="100%" p={0}>
              <Box overflowX="auto" height="100%">
                {tableWellCasing.length > 0 ? (
                  <Table variant="simple">
                    <Thead position="sticky" top={0} bg="white" zIndex={1}>
                      <Tr>
                        <Th>Depth</Th>
                        <Th>Length</Th>
                        <Th>Hole Diameter</Th>
                        <Th>Casing Outer</Th>
                        <Th>Casing Inner</Th>
                        <Th>Casing Grade</Th>
                        <Th>Casing Weight</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableWellCasing.map((row, index) => (
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
                                <Input
                                  name="length"
                                  type="number"
                                  value={editFormData.length}
                                  onChange={handleEditChange}
                                />
                              </Td>
                              <Td>
                                <Input
                                  name="hole_diameter"
                                  type="number"
                                  value={editFormData.hole_diameter}
                                  onChange={handleEditChange}
                                />
                              </Td>
                              <Td>
                                <Input
                                  name="casing_outer_diameter"
                                  type="number"
                                  value={editFormData.casing_outer_diameter}
                                  onChange={handleEditChange}
                                />
                              </Td>
                              <Td>
                                <Input
                                  name="casing_inner_diameter"
                                  type="number"
                                  value={editFormData.casing_inner_diameter}
                                  onChange={handleEditChange}
                                />
                              </Td>
                              <Td>
                                <Select
                                  value={editFormData.casing_grade}
                                  onChange={(e) =>
                                    setEditFormData({
                                      ...editFormData,
                                      casing_grade: e.target.value,
                                    })
                                  }
                                >
                                  <option value="H40">H40</option>
                                  <option value="K55">K55</option>
                                  <option value="J55">J55</option>
                                  <option value="N80">N80</option>
                                  <option value="C95">C95</option>
                                  <option value="P10">P10</option>
                                  <option value="S125">S125</option>
                                </Select>
                              </Td>
                              <Td>
                                <Input
                                  name="casing_weight"
                                  type="number"
                                  value={editFormData.casing_weight}
                                  onChange={handleEditChange}
                                />
                              </Td>
                              <Td>
                                <Input
                                  name="description"
                                  type="text"
                                  value={editFormData.description}
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
                              <Td>{row.depth}</Td>
                              <Td>{row.length}</Td>
                              <Td>{row.hole_diameter}</Td>
                              <Td>{row.casing_outer_diameter}</Td>
                              <Td>{row.casing_inner_diameter}</Td>
                              <Td>{row.casing_grade}</Td>
                              <Td>{row.casing_weight}</Td>
                              <Td>{row.description}</Td>
                              <Td>
                                <HStack spacing={2}>
                                  <IconButton
                                    icon={<Icon as={IconEdit} />}
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => handleEditRow(index)}
                                    aria-label="Edit row"
                                  />
                                  <IconButton
                                    icon={<Icon as={IconTrash} />}
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDeleteRow(index)}
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
                    {!!errorForms["job_plan.well.well_casing"] && (
                      <Text color="red.500" fontSize="sm" mt={2}>
                        Well Casing cannot be empty.
                      </Text>
                    )}
                  </Flex>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <Button colorScheme="blue" onClick={clickShowCasing}>
                Show Casing
              </Button>
              {imageUrl && <img src={imageUrl} alt="Casing Visualization" />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

export default WellCasing;
