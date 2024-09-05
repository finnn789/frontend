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
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import WellTest from "./Card/WellTest";
import WellCasing from "./Card/WellCasing";
import FileUploadForm from "./Card/WellTrajectory";
import WellTrajectory from "./Card/WellTrajectory";
import WellPorePressureForm from "./Card/WellPPFG";
import ElevationsAndDepths from "./../Planning/ElevationsandDepths";
import WellLocation from "./../Planning/WellLocation";
import JobDetail from "./../Planning/JobDetail";
import WellSummary from "./../Planning/WellSummary";

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
    well_profile_type: "",
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
      file_id: "",
      data_format: "IMAGE",
    },
    well_ppfg: {
      file_id: "",
      data_format: "IMAGE",
    },
    well_logs: [
      {
        file_id: "",
        data_format: "IMAGE",
      },
    ],
    well_drilling_parameter: {
      file_id: "",
      data_format: "IMAGE",
    },
    well_documents: [
      {
        file_id: "",
        document_type: "Well Report",
        remark: "",
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
    console.log(`Field: ${name}, Value: ${parsedValue}`);
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
    bit: "",
    casing_outer_diameter: 0,
    logging: "",
    mud_program: "",
    cementing_program: "",
    bottom_hole_temperature: 0,
    rate_of_penetration: 0,
    remarks: "",
  });

  const [TablewellStratigraphy, setTablewellStratigraphy] = useState([]);
  const [WellStratigraphy, setWellStratigraphy] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    stratigraphy_id: "",
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
      depth_datum: "",
      depth: 0,
      hole_diameter: 0,
      bit: "",
      casing_outer_diameter: 0,
      logging: "",
      mud_program: "",
      cementing_program: "",
      bottom_hole_temperature: 0,
      rate_of_penetration: 0,
      remarks: "",
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
      stratigraphy_id: "",
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

  // console.log('asd',handleInputChange);
  return (
    <>
      <JobDetail handleChange={handleChange} formData={formData} />
      <WellLocation handleChange={handleChange} />
      <ElevationsAndDepths handleChange={handleChange} />
      <WellSummary handleAddClick={handleAddClick} handleInputChange={handleInputChange} currentEntry={currentEntry} tableData={tableData}/>

      <WellCasing
        dataWellCasing={(data) =>
          setFormData((prev) => ({ ...prev, well_casing: data }))
        }
      />

      <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={3}>
        <GridItem colSpan={1}>
          <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
              <Heading size="lg">Strati</Heading>
              <Select
                width={"auto"}
                onChange={(e) =>
                  setWellStratigraphy({
                    ...WellStratigraphy,
                    depth_datum: e.target.value,
                  })
                }
              >
                <option value="MSL">MSL</option>
                <option value="GL">GL</option>
                <option value="RT">RT</option>
                <option value="RKB">RKB</option>
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
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel>Bottom Depth</FormLabel>
                    <InputGroup>
                      <Input
                        name="depth"
                        type="number"
                        value={WellStratigraphy.depth}
                        onChange={handleInputChangeWellStraigraphy}
                        placeholder="Depth"
                      />
                      <InputRightAddon>123</InputRightAddon>
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

        <GridItem>
          <Box
            borderWidth="1px"
            height={"325px"}
            borderRadius="lg"
            p={6}
            boxShadow="md"
          >
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
      <WellTrajectory
        ondata={(data) =>
          setFormData((prev) => ({ ...prev, well_trajectory: data }))
        }
      />
      <WellPorePressureForm />
      <WellTest onData={handleData} />
    </>
  );
};

export default CardFormWell;
