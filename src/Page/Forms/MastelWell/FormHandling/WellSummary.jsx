import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Select,
  VStack,
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
  Text,
  Icon,
  IconButton,
  HStack,
  Heading,
} from "@chakra-ui/react";
import {
  IconTablePlus,
  IconTrash,
  IconEdit,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const WellSummary = ({ handleChange, errorForms, unittype = "Metrics" }) => {
  const [currentEntry, setCurrentEntry] = useState({
    unit_type: unittype,
    depth_datum: "RT", // Default value for depth_datum
    top_depth: null,
    bottom_depth: null,
    hole_diameter: null,
    bit: null,
    casing_outer_diameter: null,
    logging: null,
    mud_program: {
      slurry_volume: null,
      slurry_mix: null,
      mud_type: null,
      // "mud_type should be 'WATER BASED MUD' or 'OIL BASED MUD'"
      weight: null,
      viscosity: null,
      ph_level: null,
    },
    cementing_program: {
      slurry_volume: null,
      slurry_mix: null,
    },
    bottom_hole_temperature: null,
    rate_of_penetration: null,
    remarks: null,
  });

  const [tableData, setTableData] = useState([]);
  const [depthValue, setDepthValue] = useState("RT");
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" && value !== "" ? parseFloat(value) : value;
    setCurrentEntry((prev) => ({ ...prev, [name]: processedValue }));
  };

  // Menangani perubahan input untuk sub-object (mud_program, cementing_program)
  const handleSubInputChange = (e, parentName) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" && value !== "" ? parseFloat(value) : value;
    setCurrentEntry((prev) => ({
      ...prev,
      [parentName]: { ...prev[parentName], [name]: processedValue },
    }));
  };

  // Menangani perubahan input saat mengedit
  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" && value !== "" ? parseFloat(value) : value;
    setEditFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  // Menangani perubahan input untuk sub-object saat mengedit (mud_program, cementing_program)
  const handleEditSubInputChange = (e, parentName) => {
    const { name, value, type } = e.target;
    const processedValue =
      type === "number" && value !== "" ? parseFloat(value) : value;
    setEditFormData((prev) => ({
      ...prev,
      [parentName]: { ...prev[parentName], [name]: processedValue },
    }));
  };

  // Menangani pengeditan baris data
  const handleEditRow = (index) => {
    setEditIndex(index);
    setEditFormData(tableData[index]);
  };

  // Menyimpan hasil edit
  const handleSaveEdit = (index) => {
    const updatedData = [...tableData];
    updatedData[index] = editFormData;
    setTableData(updatedData);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  // Menghapus baris data
  const handleDeleteRow = (index) => {
    const newData = tableData.filter((_, i) => i !== index);
    setTableData(newData);
  };

  // Menambah entry baru ke tabel
  const handleAddClickLocal = () => {
    const newEntry = {
      ...currentEntry,
      depth_datum: depthValue, // Include depth_datum with the current selected value
    };
    setTableData((prev) => [...prev, newEntry]); // Update the local table data state
    setCurrentEntry({
      unit_type: unittype,
      depth_datum: "RT",
      top_depth: null,
      bottom_depth: null,
      hole_diameter: null,
      bit: null,
      casing_outer_diameter: null,
      logging: null,
      mud_program: {
        slurry_volume: null,
        slurry_mix: null,
        mud_type: null,
        // "mud_type should be 'WATER BASED MUD' or 'OIL BASED MUD'"
        weight: null,
        viscosity: null,
        ph_level: null,
      },
      cementing_program: {
        slurry_volume: null,
        slurry_mix: null,
      },
      bottom_hole_temperature: null,
      rate_of_penetration: null,
      remarks: null,
    });
  };

  // Mengirim data terbaru ke parent component saat `tableData` berubah
  useEffect(() => {
    handleChange(tableData); // Mengirim data tableData ke WellMasterForm saat data berubah
  }, [tableData, handleChange]); // handleChange ditambahkan sebagai dependency untuk memastikan pembaruan sinkron

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      mt={4}
      fontFamily={"Montserrat"}
    >
      <GridItem colSpan={1} width={"100%"}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          width={"100%"}
          p={6}
          height="100%"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Flex alignItems="center">
              <Icon as={IconTablePlus} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection="column">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.700"
                  fontFamily="Montserrat"
                >
                  Well Summary
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  Subtitle
                </Text>
              </Flex>
            </Flex>
            <Select
              width="auto"
              value={depthValue}
              onChange={(e) => setDepthValue(e.target.value)}
            >
              <option value="MSL">MSL</option>
              <option value="RT">RT</option>
              <option value="KB">KB</option>
            </Select>
          </Flex>
          <VStack spacing={4} align="stretch" height="calc(100% - 80px)">
            {/* Input fields for Well Summary */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Top Depth</FormLabel>
                <InputGroup>
                  <Input
                    name="top_depth"
                    type="number"
                    value={currentEntry.top_depth}
                    onChange={handleInputChange}
                    placeholder="Top Depth"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "m" : "ft"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Bottom Depth</FormLabel>
                <InputGroup>
                  <Input
                    name="bottom_depth"
                    type="number"
                    value={currentEntry.bottom_depth}
                    onChange={handleInputChange}
                    placeholder="Bottom Depth"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "m" : "ft"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Hole Diameter</FormLabel>
                <InputGroup>
                  <Input
                    name="hole_diameter"
                    type="number"
                    value={currentEntry.hole_diameter}
                    onChange={handleInputChange}
                    placeholder="Hole Diameter"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "mm" : "in"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Casing Outer Diameter</FormLabel>
                <InputGroup>
                  <Input
                    name="casing_outer_diameter"
                    type="number"
                    value={currentEntry.casing_outer_diameter}
                    onChange={handleInputChange}
                    placeholder="Casing Outer Diameter"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "mm" : "in"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Bit</FormLabel>
                <Input
                  name="bit"
                  type="text"
                  value={currentEntry.bit}
                  onChange={handleInputChange}
                  placeholder="Bit"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Logging</FormLabel>
                <Input
                  name="logging"
                  type="text"
                  value={currentEntry.logging}
                  onChange={handleInputChange}
                  placeholder="Logging"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Slurry Volume (Mud Program)</FormLabel>
                <InputGroup>
                  <Input
                    name="slurry_volume"
                    type="number"
                    value={currentEntry.mud_program.slurry_volume}
                    onChange={(e) => handleSubInputChange(e, "mud_program")}
                    placeholder="Slurry Volume"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Slurry Mix (Mud Program)</FormLabel>
                <Input
                  name="slurry_mix"
                  type="text"
                  value={currentEntry.mud_program.slurry_mix}
                  onChange={(e) => handleSubInputChange(e, "mud_program")}
                  placeholder="Slurry Mix"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Slurry Volume (Cementing Program)</FormLabel>
                <InputGroup>
                  <Input
                    name="slurry_volume"
                    type="number"
                    value={currentEntry.cementing_program.slurry_volume}
                    onChange={(e) =>
                      handleSubInputChange(e, "cementing_program")
                    }
                    placeholder="Slurry Volume"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Slurry Mix (Cementing Program)</FormLabel>
                <Input
                  name="slurry_mix"
                  type="text"
                  value={currentEntry.cementing_program.slurry_mix}
                  onChange={(e) => handleSubInputChange(e, "cementing_program")}
                  placeholder="Slurry Mix"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Bottom Hole Temperature</FormLabel>
                <InputGroup>
                  <Input
                    name="bottom_hole_temperature"
                    type="number"
                    value={currentEntry.bottom_hole_temperature}
                    onChange={handleInputChange}
                    placeholder="Bottom Hole Temperature"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "°C" : "°F"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rate of Penetration</FormLabel>
                <InputGroup>
                  <Input
                    name="rate_of_penetration"
                    type="number"
                    value={currentEntry.rate_of_penetration}
                    onChange={handleInputChange}
                    placeholder="Rate of Penetration"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "m/hr" : "ft/hr"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Remarks</FormLabel>
                <Input
                  name="remarks"
                  type="text"
                  value={currentEntry.remarks}
                  onChange={handleInputChange}
                  placeholder="Remarks"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Mud Type</FormLabel>
                <Select
                  name="mud_type"
                  value={currentEntry.mud_program.mud_type}
                  onChange={(e) => handleSubInputChange(e, "mud_program")}
                >
                  <option value="WATER BASED MUD">WATER BASED MUD</option>
                  <option value="OIL BASED MUD">OIL BASED MUD</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Mud Weight</FormLabel>
                <InputGroup>
                  <Input
                    name="weight"
                    type="number"
                    value={currentEntry.mud_program.weight}
                    onChange={(e) => handleSubInputChange(e, "mud_program")}
                    placeholder="Weight"
                  />
                  <InputRightAddon>
                    {unittype === "Metrics" ? "kg/m³" : "lb/ft³"}
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Viscosity</FormLabel>
                <InputGroup>
                  <Input
                    name="viscosity"
                    type="number"
                    value={currentEntry.mud_program.viscosity}
                    onChange={(e) => handleSubInputChange(e, "mud_program")}
                    placeholder="Viscosity"
                  />
                  <InputRightAddon>cP</InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>pH Level</FormLabel>
                <InputGroup>
                  <Input
                    name="ph_level"
                    type="number"
                    value={currentEntry.mud_program.ph_level}
                    onChange={(e) => handleSubInputChange(e, "mud_program")}
                    placeholder="pH Level"
                  />
                </InputGroup>
              </FormControl>
            </Grid>
            <Flex justifyContent="flex-end">
              <Button colorScheme="blue" onClick={handleAddClickLocal}>
                Add
              </Button>
            </Flex>
          </VStack>
        </Box>
      </GridItem>
      {/* Bagian untuk menampilkan data tabel */}
      <GridItem colSpan={1} overflow="hidden">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          height="100%"
          overflow="hidden"
        >
          <Box height="100%" overflowX="auto" overflowY="auto" maxWidth="100%">
            {tableData.length > 0 ? (
              <Table variant="simple" minWidth="800px">
                <Thead position="sticky" top={0} bg="white" zIndex={1}>
                  <Tr>
                    <Th>Top Depth</Th>
                    <Th>Bottom Depth</Th>
                    <Th>Mud Program - Slurry Volume</Th>
                    <Th>Mud Program - Slurry Mix</Th>
                    <Th>Cementing Program - Slurry Volume</Th>
                    <Th>Cementing Program - Slurry Mix</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tableData.map((row, index) => (
                    <Tr key={index}>
                      {editIndex === index ? (
                        <>
                          <Td>
                            <Input
                              name="top_depth"
                              type="number"
                              value={editFormData.top_depth}
                              onChange={handleEditChange}
                            />
                          </Td>
                          <Td>
                            <Input
                              name="bottom_depth"
                              type="number"
                              value={editFormData.bottom_depth}
                              onChange={handleEditChange}
                            />
                          </Td>
                          <Td>
                            <Input
                              name="slurry_volume"
                              type="number"
                              value={editFormData.mud_program.slurry_volume}
                              onChange={(e) =>
                                handleEditSubInputChange(e, "mud_program")
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              name="slurry_mix"
                              value={editFormData.mud_program.slurry_mix}
                              onChange={(e) =>
                                handleEditSubInputChange(e, "mud_program")
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              name="slurry_volume"
                              type="number"
                              value={
                                editFormData.cementing_program.slurry_volume
                              }
                              onChange={(e) =>
                                handleEditSubInputChange(e, "cementing_program")
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              name="slurry_mix"
                              value={editFormData.cementing_program.slurry_mix}
                              onChange={(e) =>
                                handleEditSubInputChange(e, "cementing_program")
                              }
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
                          <Td>{row.top_depth}</Td>
                          <Td>{row.bottom_depth}</Td>
                          <Td>{row.mud_program.slurry_volume}</Td>
                          <Td>{row.mud_program.slurry_mix}</Td>
                          <Td>{row.cementing_program.slurry_volume}</Td>
                          <Td>{row.cementing_program.slurry_mix}</Td>
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
              <Flex
                justifyContent="center"
                flexDirection={"column"}
                alignItems="center"
                height="100%"
              >
                <Heading fontFamily={"Montserrat"}>Tidak Ada Data</Heading>
                {/* {!!errorForms["job_plan.well.well_summary"] && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    Well Summary cannot be empty.
                  </Text>
                )} */}
              </Flex>
            )}
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default WellSummary;
