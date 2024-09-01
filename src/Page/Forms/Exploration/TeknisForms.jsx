import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  HStack,
  Select,
  Grid,
  GridItem,
  Heading,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  MenuItem,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import WellTest from "./Card/WellTest";
import WellCasing from "./Card/WellCasing";

const CardFormWell = ({ onFormChange }) => {
  const [formData, setFormData] = useState({
    unit_type: "Metrics",
    uwi: "",
    field_id: "",
    area_id: "",
    kkks_id: "",
    well_name: "",
    alias_long_name: "",
    well_type: "WILDCAT",
    well_status: "Active",
    well_profile_type: "DIRECTIONAL",
    hydrocarbon_target: "OIL",
    environment_type: "MARINE",
    surface_longitude: 0,
    surface_latitude: 0,
    bottom_hole_longitude: 0,
    bottom_hole_latitude: 0,
    maximum_inclination: 0,
    azimuth: 0,
    line_name: "",
    spud_date: "2024-08-31T16:27:35.697Z",
    final_drill_date: "2024-08-31T16:27:35.697Z",
    completion_date: "2024-08-31T16:27:35.697Z",
    rotary_table_elev: 0,
    kb_elev: 0,
    derrick_floor_elev: 0,
    ground_elev: 0,
    mean_sea_level: 0,
    depth_datum: "RT",
    kick_off_point: 0,
    maximum_tvd: 0,
    final_md: 0,
    remark: "",
    well_trajectory: {
      file_id: "string",
      data_format: "IMAGE",
    },
    well_ppfg: {
      file_id: "string",
      data_format: "IMAGE",
    },
    well_logs: [
      {
        file_id: "string",
        data_format: "IMAGE",
      },
    ],
    well_drilling_parameter: {
      file_id: "string",
      data_format: "IMAGE",
    },
    well_documents: [
      {
        file_id: "string",
        document_type: "Well Report",
        remark: "string",
      },
    ],
  });

  useEffect(() => {
    onFormChange(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      value === ""
        ? ""
        : isNaN(value)
        ? value
        : value.includes(".")
        ? parseFloat(value)
        : parseInt(value, 10);
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleMenuItemClick = (unit) => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeWellStraigraphy = (e) => {
    const { name, value } = e.target;
    setWellStratigraphy((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [tableData, setTableData] = useState([]);

  const [currentEntry, setCurrentEntry] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    hole_diameter: 0,
    bit: "string",
    casing_outer_diameter: 0,
    logging: "string",
    mud_program: "string",
    cementing_program: "string",
    bottom_hole_temperature: 0,
    rate_of_penetration: 0,
    remarks: "string",
  });

  const [TablewellStratigraphy, setTablewellStratigraphy] = useState([]);
  const [WellStratigraphy, setWellStratigraphy] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    stratigraphy_id: "string",
  });

  const handleAddClick = () => {
    const newEntry = { ...currentEntry };
    setTableData((prevData) => [...prevData, newEntry]);
    setFormData((prevData) => ({
      ...prevData,
      well_summary: [...(prevData.well_summary || []), newEntry],
    }));
    // Reset currentEntry after adding
    setCurrentEntry({
      unit_type: "Metrics",
      depth_datum: "RT",
      depth: 0,
      hole_diameter: 0,
      bit: "string",
      casing_outer_diameter: 0,
      logging: "string",
      mud_program: "string",
      cementing_program: "string",
      bottom_hole_temperature: 0,
      rate_of_penetration: 0,
      remarks: "string",
    });
  };

  const handleWellStratichy = () => {
    const newEntry = { ...WellStratigraphy };
    setTablewellStratigraphy((prevData) => [...prevData, newEntry]);
    setFormData((prevData) => ({
      ...prevData,
      well_stratigraphy: [...(prevData.well_stratigraphy || []), newEntry],
    }));
    // Reset WellStratigraphy after adding
    setWellStratigraphy({
      unit_type: "Metrics",
      depth_datum: "RT",
      depth: 0,
      stratigraphy_id: "string",
    });
  };

  const handleData = (newData) => {
    const newEntry = { ...newData };
    // Update parent state with the new data
    setFormData((prevData) => ({
      ...prevData,
      well_test: newData,
    }));
  };
  return (
    <>
      <Box borderWidth="1px" borderRadius="lg" p={6} m="auto">
        <VStack spacing={4} align="stretch">
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>UWI</FormLabel>
              <Input
                name="uwi"
                value={formData.uwi}
                onChange={handleChange}
                placeholder="UWI"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Well Name</FormLabel>
              <Input
                name="well_name"
                value={formData.well_name}
                onChange={handleChange}
                placeholder="Nama Sumur"
              />
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Alias Long Name</FormLabel>
              <Input
                name="alias_long_name"
                value={formData.alias_long_name}
                onChange={handleChange}
                placeholder="Nama Lengkap Sumur"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Well Type</FormLabel>
              <Select
                name="well_type"
                placeholder="J-Type"
                onChange={handleChange}
              >
                <option value="DELINEATION">DELINEATION</option>
                <option value="WILDCAT">WILDCAT</option>
                <option value="INFILL">INFILL</option>
                <option value="PRODUCER">PRODUCER</option>
                <option value="INJECTION">INJECTION</option>
                <option value="STEPOUT">STEOPOUT</option>
              </Select>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Well Profile Type</FormLabel>
              <Select
                name="well_profile_type"
                placeholder="Select Profile Type"
                onChange={handleChange}
              >
                <option value="DIRECTIONAL">DIRECTIONAL</option>
                <option value="HORIZONTAL">HORIZONTAL</option>
                <option value="VERTICAL">VERTICAL</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Environment Type</FormLabel>
              <Select
                name="environment_type"
                placeholder="Select Environment Type"
                onChange={handleChange}
              >
                <option value="SWAMP">SWAMP</option>
                <option value="MARINE">MARINE</option>
                <option value="LAND">LAND</option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </Box>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
        bg="white"
        mt={6}
      >
        <VStack align="stretch" spacing={4}>
          <Heading size="md" display="flex" alignItems="center">
            <Box as="span" mr={2}>
              ↗️
            </Box>
            Directional
          </Heading>

          <FormControl>
            <FormLabel>Directional Type</FormLabel>
            <Select
              name="directionalType"
              placeholder="Select Directional Type"
              onChange={handleChange}
            >
              <option value="DIRECTIONAL">DIRECTIONAL</option>
              <option value="s-type">S-Type</option>
              <option value="horizontal">Horizontal</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Kick Off Point</FormLabel>
            <Input
              name="kick_off_point"
              placeholder="kick off point"
              onChange={handleChange}
              type="number"
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Maximum Inclination</FormLabel>
                <Input
                  name="maximum_inclination"
                  placeholder="maximum inclination"
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Azimuth</FormLabel>
                <Input
                  name="azimuth"
                  type="number"
                  placeholder="Azimuth"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={6} mt={4}>
        <VStack align="stretch" spacing={4}>
          <Heading size="md" display="flex" alignItems="center">
            <Box as="span" mr={2}>
              📍
            </Box>
            Well Location
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Surface Longitude</FormLabel>
                <Input
                  name="surface_longitude"
                  placeholder="Surface longitude"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Surface Latitude</FormLabel>
                <Input
                  type="number"
                  name="surface_latitude"
                  placeholder="Surface latitude"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Bottom Hole Longitude</FormLabel>
                <Input
                  name="bottom_hole_longitude"
                  placeholder="bottom hole longitude"
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Bottom Hole Latitude</FormLabel>
                <Input
                  name="bottom_hole_latitude"
                  placeholder="bottom hole latitude"
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        mt={4}
        boxShadow="md"
        bg="white"
      >
        <VStack align="stretch" spacing={4}>
          <Heading size="md" display="flex" alignItems="center">
            <Box as="span" mr={2}>
              🌐
            </Box>
            Elevations and Depths
          </Heading>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Rotary Table Elevation</FormLabel>
                <Input
                  name="rotary_table_elev"
                  type="number"
                  placeholder="rotary table elev"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Kelly Bushing Elevation</FormLabel>
                <Input
                  name="kb_elev"
                  placeholder="kelly bushing elev"
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Derrick Floor Elevation</FormLabel>
                <Input
                  name="derrick_floor_elev"
                  placeholder="derrick floor elev"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Ground Elevation</FormLabel>
                <Input
                  name="ground_elev"
                  placeholder="ground elev"
                  type="number"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl>
            <FormLabel>Mean Sea Level</FormLabel>
            <Input
              name="mean_sea_level"
              placeholder="mean sea level"
              type="number"
              onChange={handleChange}
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Final MD</FormLabel>
                <Input
                  name="final_md"
                  type="number"
                  placeholder="final md"
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Maximum TVD</FormLabel>
                <Input
                  name="maximum_tvd"
                  placeholder="maximum tvd"
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </Box>

      <VStack spacing={6} align="stretch">
        <Box
          mt={4}
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="md"
          bg="white"
        >
          <VStack align="stretch" spacing={4}>
            <Heading size="md" display="flex" alignItems="center">
              <Box as="span" mr={2}>
                📊
              </Box>
              Seismic
            </Heading>

            <FormControl>
              <FormLabel>Seismic Line Name</FormLabel>
              <Input
                name="seismicLineName"
                placeholder="Seismic line name"
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="md"
          bg="white"
        >
          <VStack align="stretch" spacing={4}>
            <Heading size="md" display="flex" alignItems="center">
              <Box as="span" mr={2}>
                📅
              </Box>
              Key Dates
            </Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Spud Date</FormLabel>
                  <Input
                    name="spud_date"
                    placeholder="spud date"
                    type="date"
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <FormLabel>Final Drill Date</FormLabel>
                  <Input
                    name="final_drill_date"
                    placeholder="final drill date"
                    type="date"
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl>
              <FormLabel>Completion Date</FormLabel>
              <Input
                name="completionDate"
                placeholder="completion date"
                type="date"
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </Box>
      </VStack>

      <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Heading size="lg">Well Summary</Heading>
            </Flex>
            <VStack spacing={4} align="stretch">
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl>
                  <FormLabel>Depth</FormLabel>
                  <Input
                    name="depth"
                    type="number"
                    value={currentEntry.depth}
                    onChange={handleInputChange}
                    placeholder="Depth"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Hole Diameter</FormLabel>
                  <Input
                    name="hole_diameter"
                    value={currentEntry.hole_diameter}
                    type="number"
                    onChange={handleInputChange}
                    placeholder="Hole Diameter"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Casing Outer Diameter</FormLabel>
                  <Input
                    name="casing_outer_diameter"
                    type="number"
                    value={currentEntry.casing_outer_diameter}
                    onChange={handleInputChange}
                    placeholder="Casing Outer Diameter"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mud Program</FormLabel>
                  <Input
                    name="mud_program"
                    type="text"
                    value={currentEntry.mud_program}
                    onChange={handleInputChange}
                    placeholder="Mud Program"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bit</FormLabel>
                  <Input
                    name="bit"
                    value={currentEntry.bit}
                    onChange={handleInputChange}
                    placeholder="Bit"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Logging Program</FormLabel>
                  <Input
                    name="logging"
                    value={currentEntry.logging}
                    onChange={handleInputChange}
                    placeholder="Logging Program"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Cementing Program</FormLabel>
                  <Input
                    name="cementing_program"
                    value={currentEntry.cementing_program}
                    onChange={handleInputChange}
                    placeholder="Cementing Program"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bottom Hole Temperature</FormLabel>
                  <Input
                    name="bottom_hole_temperature"
                    value={currentEntry.bottom_hole_temperature}
                    type="number"
                    onChange={handleInputChange}
                    placeholder="Bottom Hole Temperature"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Rate of Penetration</FormLabel>
                  <Input
                    name="rate_of_penetration"
                    value={currentEntry.rate_of_penetration}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="Rate of Penetration"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Remarks</FormLabel>
                  <Input
                    name="remarks"
                    value={currentEntry.remarks}
                    onChange={handleInputChange}
                    placeholder="Remarks"
                  />
                </FormControl>
              </Grid>
              <Button colorScheme="blue" onClick={handleAddClick}>
                Add
              </Button>
            </VStack>
          </Box>
        </GridItem>
        <GridItem overflowX={"auto"}>
          <Box
            borderWidth="1px"
            h={"590px"}
            overflowY={"auto"}
            overflowX={"auto"}
            borderRadius="lg"
            p={6}
            boxShadow="md"
          >
            <Heading size="md" mb={4}>
              Table Well Summary
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Bit</Th>
                  <Th>Depth</Th>
                  <Th>Hole Diameter</Th>
                  <Th>Casing Diameter</Th>
                  <Th>Logging</Th>
                  <Th>Mud Program</Th>
                  <Th>Bottom Hole Temperature</Th>
                  <Th>RATE PENETRATION</Th>
                  <Th>Remarks</Th>
                  {/* Tambahkan header lain sesuai kebutuhan */}
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.bit}</Td>
                    <Td>{row.depth}</Td>
                    <Td>{row.hole_diameter}</Td>
                    <Td>{row.casing_outer_diameter}</Td>
                    <Td>{row.logging}</Td>
                    <Td>{row.mud_program}</Td>
                    <Td>{row.bottom_hole_temperature}</Td>
                    <Td>{row.rate_of_penetration}</Td>
                    <Td>{row.remarks}</Td>
                    {/* Tambahkan sel lain sesuai kebutuhan */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>

      <WellCasing
        dataWellCasing={(data) =>
          setFormData((prev) => ({ ...prev, well_casing: data }))
        }
      />

      <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={3}>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Heading size="lg">STRATIGRAPHY</Heading>
            </Flex>
            <VStack spacing={4} align="stretch">
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem gap={2} colSpan={2}>
                  <FormControl>
                    <FormLabel>Stratigraphy</FormLabel>
                    <Select
                      name="stratigraphy_id"
                      value={WellStratigraphy.stratigraphy_id}
                      onChange={handleInputChangeWellStraigraphy}
                      placeholder="Stratigraphy"
                    >
                      <option value="LITHOSTRATIGRAPHIC">
                        LITHOSTRATIGRAPHIC
                      </option>
                      <option value="CHRONOSTRATIGRAPHIC">
                        CHRONOSTRATIGRAPHIC
                      </option>
                      <option value="OTHER">OTHER</option>
                      <option value="RADIOMETRIC">RADIOMETRIC</option>
                      <option value="BIOSTRATIGRAPHIC">BIOSTRATIGRAPHIC</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Top Depth</FormLabel>
                    <Input
                      name="depth"
                      type="number"
                      value={WellStratigraphy.depth}
                      onChange={handleInputChangeWellStraigraphy}
                      placeholder="Depth"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Bottom Depth</FormLabel>
                    <Input
                      name="depth"
                      type="number"
                      value={WellStratigraphy.depth}
                      onChange={handleInputChangeWellStraigraphy}
                      placeholder="Depth"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Button colorScheme="blue" onClick={handleWellStratichy}>
                Add
              </Button>
            </VStack>
          </Box>
        </GridItem>

        <GridItem>
          <Box
            borderWidth="1px"
            height={"325px"}
            borderRadius="lg"
            p={6}
            boxShadow="md"
          >
            <Heading size="md" mb={4}>
              Table Straticgraphy
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Depth</Th>
                  <Th>Hole Diameter</Th>

                  {/* Tambahkan header lain sesuai kebutuhan */}
                </Tr>
              </Thead>
              <Tbody>
                {TablewellStratigraphy.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.depth}</Td>
                    <Td>{row.stratigraphy_id}</Td>

                    {/* Tambahkan sel lain sesuai kebutuhan */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>

      <WellTest onData={handleData} />
    </>
  );
};

export default CardFormWell;
