import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { ChevronRightIcon, CheckIcon } from "@chakra-ui/icons";
import { AllEnums, getUtilsdb } from "../API/AllEnums";
import { useOutletContext } from "react-router-dom";

const NavigationMenu = ({ completedSections, activeTab, onNavigate }) => (
  <VStack align="stretch" spacing={2} position="sticky" top="20px">
    <Text fontWeight="bold" fontSize="xl" mb={2}>
      Navigasi
    </Text>
    <List spacing={2}>
      {Object.entries(completedSections[activeTab]).map(
        ([section, isCompleted]) => (
          <ListItem
            key={section}
            display="flex"
            alignItems="center"
            cursor="pointer"
            onClick={() => onNavigate(section)}
          >
            <ListIcon
              as={isCompleted ? CheckIcon : ChevronRightIcon}
              color={isCompleted ? "green.500" : "blue.500"}
            />
            {section}
          </ListItem>
        )
      )}
    </List>
  </VStack>
);

const PengajuanDrillingForm = () => {
  const [proposedJob, setProposedJob] = useState({
    kkks_id: "",
    area_id: "",
    field_id: "",
    contract_type: "COST-RECOVERY",
    afe_number: "",
    wpb_year: 0,
    start_date: "",
    end_date: "",
    total_budget: 0,
    rig_name: "",
    rig_type: "JACK-UP",
    rig_horse_power: 0,
    job_operation_days: [],
    work_breakdown_structure: [],
    job_hazards: [],
    job_documents: [],
    well: {
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
      spud_date: "",
      final_drill_date: "",
      completion_date: "",
      rotary_table_elev: 0,
      rotary_table_elev_uom: "FEET",
      kb_elev: 0,
      kb_elev_uom: "FEET",
      derrick_floor_elev: 0,
      derrick_floor_elev_uom: "FEET",
      ground_elev: 0,
      ground_elev_uom: "FEET",
      mean_sea_level: 0,
      mean_sea_level_uom: "FEET",
      depth_datum: "RT",
      kick_off_point: 0,
      kick_off_point_uom: "FEET",
      maximum_tvd: 0,
      maximum_tvd_uom: "FEET",
      final_md: 0,
      final_md_uom: "FEET",
      remark: "",
      well_documents: [],
      well_summary: [],
      well_test: [],
      well_trajectory: {
        file_id: "",
        data_format: "IMAGE",
      },
      well_ppfg: {
        file_id: "",
        data_format: "IMAGE",
      },
      well_logs: [],
      well_drilling_parameter: {
        file_id: "",
        data_format: "IMAGE",
      },
      well_casing: [],
      well_stratigraphy: [],
    },
  });

  const [fetchingData, setFetchingData] = useState(null);
  const [utilsDb, setUtilsDb] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [completedSections, setCompletedSections] = useState({
    teknis: {
      Well: false,
      Koordinat: false,
      Seismic: false,
      Keydates: false,
      Elevasi: false,
      "Well Summary": false,
      "Well Test": false,
      "Well Trajectory": false,
      "Well Casing": false,
      Stratigraphy: false,
    },
    operasional: {
      "Proposed Job": false,
      "Work breakdown structure": false,
      "Job document": false,
      "Job Operation Days": false,
      "Job Hazard": false,
    },
  });

  console.log(proposedJob);

  useEffect(() => {
    async function fetchData() {
      const data = await AllEnums();
      if (data) {
        setFetchingData(data);
      } else {
        console.error("Error fetching data");
      }
    }
    async function fetchingUtils() {
      const data = await getUtilsdb();
      if (data) {
        setUtilsDb(data);
      } else {
        console.error("Error fetching data");
      }
    }

    fetchingUtils();
    fetchData();
  }, []);

  const handleInputChange = (section, field, value) => {
    setProposedJob((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
    updateSectionCompletion(section);
  };

  const handleWellInputChange = (field, value) => {
    setProposedJob((prevState) => ({
      ...prevState,
      well: {
        ...prevState.well,
        [field]: value,
      },
    }));
    updateSectionCompletion("Well");
  };

  const handleArrayInputChange = (section, field, value, index) => {
    setProposedJob((prevState) => {
      // Ensure the section exists and is an array
      const sectionArray = Array.isArray(prevState[section])
        ? prevState[section]
        : [];

      // Create a new array with the updated item
      const updatedSection = sectionArray.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      // If the index is out of bounds, add a new item
      if (index >= sectionArray.length) {
        updatedSection.push({ [field]: value });
      }

      // Return the new state with the updated section
      return {
        ...prevState,
        [section]: updatedSection,
      };
    });

    updateSectionCompletion(section);
  };

  const handleAddBatch = (section) => {
    setProposedJob((prevState) => {
      const sectionArray = Array.isArray(prevState[section])
        ? prevState[section]
        : [];
      return {
        ...prevState,
        [section]: [...sectionArray, {}],
      };
    });
    updateSectionCompletion(section);
  };

  const handleFileUpload = (event, section) => {
    const file = event.target.files[0];
    setProposedJob((prevState) => ({
      ...prevState,
      well: {
        ...prevState.well,
        [section]: {
          file_id: file.name,
          data_format: "IMAGE",
        },
      },
    }));
    updateSectionCompletion("Well Trajectory");
  };

  const updateSectionCompletion = (section) => {
    setCompletedSections((prevState) => {
      const tab = section in prevState.teknis ? "teknis" : "operasional";
      return {
        ...prevState,
        [tab]: {
          ...prevState[tab],
          [section]: true,
        },
      };
    });
  };

  const sectionRefs = useRef({});

  useEffect(() => {
    Object.keys(completedSections.teknis).forEach((section) => {
      sectionRefs.current[section] = React.createRef();
    });
    Object.keys(completedSections.operasional).forEach((section) => {
      sectionRefs.current[section] = React.createRef();
    });
  }, []);

  const handleNavigate = (section) => {
    const sectionRef = sectionRefs.current[section];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Grid templateColumns="1fr 250px" gap={8}>
      <Box>
        <Tabs index={activeTab} onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>Teknis</Tab>
            <Tab>Operasional</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={8}>
                <Box ref={sectionRefs.current["Well"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Well
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>UWI</FormLabel>
                      <Input
                        placeholder="UWI"
                        value={proposedJob.well.uwi}
                        onChange={(e) =>
                          handleWellInputChange("uwi", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Well Name</FormLabel>
                      <Input
                        placeholder="Well Name"
                        value={proposedJob.well.well_name}
                        onChange={(e) =>
                          handleWellInputChange("well_name", e.target.value)
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Nama Lengkap Sumur</FormLabel>
                      <Input
                        placeholder="Nama Lengkap Sumur"
                        value={proposedJob.well.alias_long_name}
                        onChange={(e) =>
                          handleWellInputChange(
                            "alias_long_name",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Type Well</FormLabel>
                      <Input
                        placeholder="Type Well"
                        value={proposedJob.well.well_type}
                        onChange={(e) =>
                          handleWellInputChange("well_type", e.target.value)
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Well Status</FormLabel>
                      <Input
                        placeholder="Well Status"
                        value={proposedJob.well.well_status}
                        onChange={(e) =>
                          handleWellInputChange("well_status", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Well Profile Type</FormLabel>
                      <Input
                        placeholder="Well Profile Type"
                        value={proposedJob.well.well_profile_type}
                        onChange={(e) =>
                          handleWellInputChange(
                            "well_profile_type",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Hydrocarbon Target</FormLabel>
                      <Input
                        placeholder="Hydrocarbon Target"
                        value={proposedJob.well.hydrocarbon_target}
                        onChange={(e) =>
                          handleWellInputChange(
                            "hydrocarbon_target",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Environment Type</FormLabel>
                      <Select
                        placeholder="Environment Type"
                        value={proposedJob.well.environment_type}
                        onChange={(e) =>
                          handleWellInputChange(
                            "environment_type",
                            e.target.value
                          )
                        }
                      >
                        {fetchingData?.environment.map((item, key) => (
                          <option key={key} value={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </HStack>
                </Box>

                <Box ref={sectionRefs.current["Koordinat"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Koordinat
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>Surface Longitude</FormLabel>
                      <Input
                        placeholder="Surface Longitude"
                        value={proposedJob.well.surface_longitude}
                        type="number"
                        onChange={(e) =>
                          handleWellInputChange(
                            "surface_longitude",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Surface Latitude</FormLabel>
                      <Input
                        placeholder="Surface Latitude"
                        type="number"
                        value={proposedJob.well.surface_latitude}
                        onChange={(e) =>
                          handleWellInputChange(
                            "surface_latitude",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Bottom Hole Longitude</FormLabel>
                      <Input
                        placeholder="Bottom Hole Longitude"
                        value={proposedJob.well.bottom_hole_longitude}
                        type="number"
                        onChange={(e) =>
                          handleWellInputChange(
                            "bottom_hole_longitude",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bottom Hole Latitude</FormLabel>
                      <Input
                        placeholder="Bottom Hole Latitude"
                        value={proposedJob.well.bottom_hole_latitude}
                        type="number"
                        onChange={(e) =>
                          handleWellInputChange(
                            "bottom_hole_latitude",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Maximum Inclination</FormLabel>
                      <Input
                        placeholder="Maximum Inclination"
                        value={proposedJob.well.maximum_inclination}
                        type="number"
                        onChange={(e) =>
                          handleWellInputChange(
                            "maximum_inclination",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Azimuth</FormLabel>
                      <Input
                        placeholder="Azimuth"
                        value={proposedJob.well.azimuth}
                        type="number"
                        onChange={(e) =>
                          handleWellInputChange(
                            "azimuth",
                            parseFloat(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                </Box>

                <Box ref={sectionRefs.current["Seismic"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Seismic
                  </Text>
                  <FormControl>
                    <FormLabel>Line Name</FormLabel>
                    <Input
                      placeholder="Line Name"
                      value={proposedJob.well.line_name}
                      onChange={(e) =>
                        handleWellInputChange("line_name", e.target.value)
                      }
                    />
                  </FormControl>
                </Box>

                <Box ref={sectionRefs.current["Keydates"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Keydates
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>Spud Date</FormLabel>
                      <Input
                        type="date"
                        value={proposedJob.well.spud_date}
                        onChange={(e) =>
                          handleWellInputChange("spud_date", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Final Drill Date</FormLabel>
                      <Input
                        type="date"
                        value={proposedJob.well.final_drill_date}
                        onChange={(e) =>
                          handleWellInputChange(
                            "final_drill_date",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Completion Date</FormLabel>
                    <Input
                      type="date"
                      value={proposedJob.well.completion_date}
                      onChange={(e) =>
                        handleWellInputChange("completion_date", e.target.value)
                      }
                    />
                  </FormControl>
                </Box>

                <Box ref={sectionRefs.current["Elevasi"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Elevasi
                  </Text>
                  <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      placeholder="Select Unit"
                      value={proposedJob.well.rotary_table_elev_uom}
                      onChange={(e) => {
                        const unit = e.target.value;
                        handleWellInputChange("rotary_table_elev_uom", unit);
                        handleWellInputChange("kb_elev_uom", unit);
                        handleWellInputChange("derrick_floor_elev_uom", unit);
                        handleWellInputChange("ground_elev_uom", unit);
                        handleWellInputChange("mean_sea_level_uom", unit);
                        handleWellInputChange("kick_off_point_uom", unit);
                        handleWellInputChange("maximum_tvd_uom", unit);
                        handleWellInputChange("final_md_uom", unit);
                      }}
                    >
                      <option value="FEET">Feet</option>
                      <option value="METER">Meters</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Rotary Table Elev</FormLabel>
                      <Input
                        placeholder="Rotary Table Elev"
                        value={proposedJob.well.rotary_table_elev}
                        onChange={(e) =>
                          handleWellInputChange(
                            "rotary_table_elev",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>KB Elev</FormLabel>
                      <Input
                        placeholder="KB Elev"
                        value={proposedJob.well.kb_elev}
                        onChange={(e) =>
                          handleWellInputChange(
                            "kb_elev",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Derrick Floor Elev</FormLabel>
                      <Input
                        placeholder="Derrick Floor Elev"
                        value={proposedJob.well.derrick_floor_elev}
                        onChange={(e) =>
                          handleWellInputChange(
                            "derrick_floor_elev",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Ground Elev</FormLabel>
                      <Input
                        placeholder="Ground Elev"
                        value={proposedJob.well.ground_elev}
                        onChange={(e) =>
                          handleWellInputChange(
                            "ground_elev",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Mean Sea Level</FormLabel>
                    <Input
                      placeholder="Mean Sea Level"
                      value={proposedJob.well.mean_sea_level}
                      onChange={(e) =>
                        handleWellInputChange(
                          "mean_sea_level",
                          parseFloat(e.target.value)
                        )
                      }
                      type="number"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Select
                      placeholder="Select Depth Datum"
                      value={proposedJob.well.depth_datum}
                      onChange={(e) =>
                        handleWellInputChange("depth_datum", e.target.value)
                      }
                    >
                      <option value="MSL">MSL</option>
                      <option value="RT">RT</option>
                      <option value="KB">KB</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Kick Off Point</FormLabel>
                      <Input
                        placeholder="Kick Off Point"
                        value={proposedJob.well.kick_off_point}
                        onChange={(e) =>
                          handleWellInputChange(
                            "kick_off_point",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Maximum TVD</FormLabel>
                      <Input
                        placeholder="Maximum TVD"
                        value={proposedJob.well.maximum_tvd}
                        onChange={(e) =>
                          handleWellInputChange(
                            "maximum_tvd",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Final MD</FormLabel>
                      <Input
                        placeholder="Final MD"
                        value={proposedJob.well.final_md}
                        onChange={(e) =>
                          handleWellInputChange(
                            "final_md",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Remark</FormLabel>
                      <Input
                        placeholder="Remark"
                        value={proposedJob.well.remark}
                        onChange={(e) =>
                          handleWellInputChange("remark", e.target.value)
                        }
                      />
                    </FormControl>
                  </HStack>
                </Box>

                <Box ref={sectionRefs.current["Well Summary"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Well Summary
                  </Text>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Select
                      placeholder="Select Depth Datum"
                      value={
                        proposedJob.well.well_summary[
                          proposedJob.well.well_summary.length - 1
                        ]?.depth_datum || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_summary",
                          "depth_datum",
                          e.target.value,
                          proposedJob.well.well_summary.length - 1
                        )
                      }
                    >
                      <option value="MSL">MSL</option>
                      <option value="RT">RT</option>
                      <option value="KB">KB</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Depth</FormLabel>
                      <Input
                        placeholder="Depth"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.depth || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "depth",
                            parseFloat(e.target.value),
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Hole Diameter</FormLabel>
                      <Input
                        placeholder="Hole Diameter"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.hole_diameter || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "hole_diameter",
                            parseFloat(e.target.value),
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Bit</FormLabel>
                      <Input
                        placeholder="Bit"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.bit || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "bit",
                            e.target.value,
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Casing Outer Diameter</FormLabel>
                      <Input
                        placeholder="Casing Outer Diameter"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.casing_outer_diameter || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "casing_outer_diameter",
                            parseFloat(e.target.value),
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Logging</FormLabel>
                      <Input
                        placeholder="Logging"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.logging || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "logging",
                            e.target.value,
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Mud Program</FormLabel>
                      <Input
                        placeholder="Mud Program"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.mud_program || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "mud_program",
                            e.target.value,
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Cementing Program</FormLabel>
                      <Input
                        placeholder="Cementing Program"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.cementing_program || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "cementing_program",
                            e.target.value,
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Bottom Hole Temperature</FormLabel>
                      <Input
                        placeholder="Bottom Hole Temperature"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.bottom_hole_temperature || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "bottom_hole_temperature",
                            parseFloat(e.target.value),
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Rate of Penetration</FormLabel>
                      <Input
                        placeholder="Rate of Penetration"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.rate_of_penetration || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "rate_of_penetration",
                            parseFloat(e.target.value),
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Remarks</FormLabel>
                      <Input
                        placeholder="Remarks"
                        value={
                          proposedJob.well.well_summary[
                            proposedJob.well.well_summary.length - 1
                          ]?.remarks || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_summary",
                            "remarks",
                            e.target.value,
                            proposedJob.well.well_summary.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("well_summary")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.well.well_summary.length > 0 && (
                    <Box
                      overflowX="auto"
                      width="1400px"
                      borderWidth="1px"
                      borderRadius="lg"
                      mt={4}
                    >
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Depth Datum</Th>
                            <Th>Depth</Th>
                            <Th>Hole Diameter</Th>
                            <Th>Bit</Th>
                            <Th>Casing Outer Diameter</Th>
                            <Th>Logging</Th>
                            <Th>Mud Program</Th>
                            <Th>Cementing Program</Th>
                            <Th>Bottom Hole Temperature</Th>
                            <Th>Rate of Penetration</Th>
                            <Th>Remarks</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {proposedJob.well.well_summary.map(
                            (summary, index) => (
                              <Tr key={index}>
                                <Td>{summary.depth_datum}</Td>
                                <Td>{summary.depth}</Td>
                                <Td>{summary.hole_diameter}</Td>
                                <Td>{summary.bit}</Td>
                                <Td>{summary.casing_outer_diameter}</Td>
                                <Td>{summary.logging}</Td>
                                <Td>{summary.mud_program}</Td>
                                <Td>{summary.cementing_program}</Td>
                                <Td>{summary.bottom_hole_temperature}</Td>
                                <Td>{summary.rate_of_penetration}</Td>
                                <Td>{summary.remarks}</Td>
                              </Tr>
                            )
                          )}
                        </Tbody>
                      </Table>
                    </Box>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Well Test"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Well Test
                  </Text>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Select
                      placeholder="Select Depth Datum"
                      value={
                        proposedJob.well.well_test[
                          proposedJob.well.well_test.length - 1
                        ]?.depth_datum || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_test",
                          "depth_datum",
                          e.target.value,
                          proposedJob.well.well_test.length - 1
                        )
                      }
                    >
                      <option value="MSL">MSL</option>
                      <option value="RT">RT</option>
                      <option value="KB">KB</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Zone Name</FormLabel>
                      <Input
                        placeholder="Zone Name"
                        value={
                          proposedJob.well.well_test[
                            proposedJob.well.well_test.length - 1
                          ]?.zone_name || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_test",
                            "zone_name",
                            e.target.value,
                            proposedJob.well.well_test.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Zone Top Depth</FormLabel>
                      <Input
                        placeholder="Zone Top Depth"
                        value={
                          proposedJob.well.well_test[
                            proposedJob.well.well_test.length - 1
                          ]?.zone_top_depth || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_test",
                            "zone_top_depth",
                            parseFloat(e.target.value),
                            proposedJob.well.well_test.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Zone Bottom Depth</FormLabel>
                    <Input
                      placeholder="Zone Bottom Depth"
                      value={
                        proposedJob.well.well_test[
                          proposedJob.well.well_test.length - 1
                        ]?.zone_bottom_depth || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_test",
                          "zone_bottom_depth",
                          parseFloat(e.target.value),
                          proposedJob.well.well_test.length - 1
                        )
                      }
                      type="number"
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("well_test")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.well.well_test.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Depth Datum</Th>
                          <Th>Zone Name</Th>
                          <Th>Zone Top Depth</Th>
                          <Th>Zone Bottom Depth</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.well.well_test.map((test, index) => (
                          <Tr key={index}>
                            <Td>{test.depth_datum}</Td>
                            <Td>{test.zone_name}</Td>
                            <Td>{test.zone_top_depth}</Td>
                            <Td>{test.zone_bottom_depth}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Well Trajectory"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Well Trajectory
                  </Text>
                  <FormControl>
                    <FormLabel>Upload Well Trajectory File</FormLabel>
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "well_trajectory")}
                    />
                  </FormControl>
                  {proposedJob.well.well_trajectory.file_id && (
                    <Text mt={2}>
                      File uploaded: {proposedJob.well.well_trajectory.file_id}
                    </Text>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Well Casing"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Well Casing
                  </Text>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Select
                      value={
                        proposedJob.well.well_casing[
                          proposedJob.well.well_casing.length - 1
                        ]?.depth_datum || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_casing",
                          "depth_datum",
                          e.target.value,
                          proposedJob.well.well_casing.length - 1
                        )
                      }
                    >
                      <option value="MSL">MSL</option>
                      <option value="RT">RT</option>
                      <option value="KB">KB</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Depth</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.depth || ""
                        }
                        type="number"
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "depth",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Depth"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Length</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.length || ""
                        }
                        type="number"
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "length",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Length"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Hole Diameter</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.hole_diameter || ""
                        }
                        type="number"
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "hole_diameter",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Hole Diameter"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Casing Outer Diameter</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.casing_outer_diameter || ""
                        }
                        type="number"
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "casing_outer_diameter",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Casing Outer Diameter"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Casing Inner Diameter</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.casing_inner_diameter || ""
                        }
                        type="number"
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "casing_inner_diameter",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Casing Inner Diameter"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Casing Grade</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.casing_grade || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "casing_grade",
                            e.target.value,
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Casing Grade"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Casing Weight</FormLabel>
                      <Input
                        type="number"
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.casing_weight || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "casing_weight",
                            parseFloat(e.target.value),
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Casing Weight"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Connection</FormLabel>
                      <Input
                        value={
                          proposedJob.well.well_casing[
                            proposedJob.well.well_casing.length - 1
                          ]?.connection || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_casing",
                            "connection",
                            e.target.value,
                            proposedJob.well.well_casing.length - 1
                          )
                        }
                        placeholder="Connection"
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={
                        proposedJob.well.well_casing[
                          proposedJob.well.well_casing.length - 1
                        ]?.description || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_casing",
                          "description",
                          e.target.value,
                          proposedJob.well.well_casing.length - 1
                        )
                      }
                      placeholder="Description"
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("well_casing")}
                  >
                    Add Well Casing
                  </Button>

                  {proposedJob.well.well_casing.length > 0 && (
                    <Box
                      overflowX="auto"
                      width="1200px"
                      borderWidth="1px"
                      borderRadius="lg"
                      mt={4}
                    >
                      <Table variant="simple" size={"sm"} mt={4}>
                        <Thead>
                          <Tr>
                            <Th>Depth Datum</Th>
                            <Th>Depth</Th>
                            <Th>Length</Th>
                            <Th>Hole Diameter</Th>
                            <Th>Casing Outer Diameter</Th>
                            <Th>Casing Inner Diameter</Th>
                            <Th>Casing Grade</Th>
                            <Th>Casing Weight</Th>
                            <Th>Connection</Th>
                            <Th>Description</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {proposedJob.well.well_casing.map((casing, index) => (
                            <Tr key={index}>
                              <Td>{casing.depth_datum}</Td>
                              <Td>{casing.depth}</Td>
                              <Td>{casing.length}</Td>
                              <Td>{casing.hole_diameter}</Td>
                              <Td>{casing.casing_outer_diameter}</Td>
                              <Td>{casing.casing_inner_diameter}</Td>
                              <Td>{casing.casing_grade}</Td>
                              <Td>{casing.casing_weight}</Td>
                              <Td>{casing.connection}</Td>
                              <Td>{casing.description}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Stratigraphy"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Stratigraphy
                  </Text>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Select
                      value={
                        proposedJob.well.well_stratigraphy[
                          proposedJob.well.well_stratigraphy.length - 1
                        ]?.depth_datum || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_stratigraphy",
                          "depth_datum",
                          e.target.value,
                          proposedJob.well.well_stratigraphy.length - 1
                        )
                      }
                    >
                      <option value="MSL">MSL</option>
                      <option value="RT">RT</option>
                      <option value="KB">KB</option>
                    </Select>
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Depth</FormLabel>
                      <Input
                        type="number"
                        value={
                          proposedJob.well.well_stratigraphy[
                            proposedJob.well.well_stratigraphy.length - 1
                          ]?.depth || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "well_stratigraphy",
                            "depth",
                            parseFloat(e.target.value),
                            proposedJob.well.well_stratigraphy.length - 1
                          )
                        }
                        placeholder="Depth"
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Stratigraphy ID</FormLabel>
                    <Input
                      value={
                        proposedJob.well.well_stratigraphy[
                          proposedJob.well.well_stratigraphy.length - 1
                        ]?.stratigraphy_id || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "well_stratigraphy",
                          "stratigraphy_id",
                          e.target.value,
                          proposedJob.well.well_stratigraphy.length - 1
                        )
                      }
                      placeholder="Stratigraphy ID"
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("well_stratigraphy")}
                  >
                    Add Stratigraphy
                  </Button>

                  {proposedJob.well.well_stratigraphy.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Depth Datum</Th>
                          <Th>Depth</Th>
                          <Th>Stratigraphy ID</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.well.well_stratigraphy.map(
                          (strat, index) => (
                            <Tr key={index}>
                              <Td>{strat.depth_datum}</Td>
                              <Td>{strat.depth}</Td>
                              <Td>{strat.stratigraphy_id}</Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  )}
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={8}>
                <Box ref={sectionRefs.current["Proposed Job"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Proposed Job
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>Area ID</FormLabel>
                      <Select
                        placeholder="Select Area ID"
                        value={proposedJob.area_id}
                        onChange={(e) =>
                          handleInputChange("area_id", e.target.value)
                        }
                      >
                        {utilsDb?.area &&
                          Object.entries(utilsDb.area).map(([key, value]) => (
                            <option key={key} value={value}>
                              {key}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Field ID</FormLabel>
                      <Select
                        placeholder="Select Field ID"
                        value={proposedJob.field_id}
                        onChange={(e) =>
                          handleInputChange("field_id", e.target.value)
                        }
                      >
                        {utilsDb?.field &&
                          Object.entries(utilsDb.field).map(([key, value]) => (
                            <option key={key} value={value}>
                              {key}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>AFE Number</FormLabel>
                      <Input
                        placeholder="AFE Number"
                        value={proposedJob.afe_number}
                        onChange={(e) =>
                          handleInputChange("afe_number", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Total Budget</FormLabel>
                      <Input
                        placeholder="Total Budget"
                        value={proposedJob.total_budget}
                        onChange={(e) =>
                          handleInputChange(
                            "total_budget",
                            parseFloat(e.target.value)
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>WPB Year</FormLabel>
                      <Select
                        value={proposedJob.wpb_year}
                        onChange={(e) =>
                          handleInputChange(
                            "wpb_year",
                            parseInt(e.target.value)
                          )
                        }
                      >
                        {Array.from({ length: 12 }, (_, i) => 2019 + i).map(
                          (year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        value={proposedJob.start_date}
                        onChange={(e) =>
                          handleInputChange("start_date", e.target.value)
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="date"
                        value={proposedJob.end_date}
                        onChange={(e) =>
                          handleInputChange("end_date", e.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Rig Name</FormLabel>
                      <Input
                        placeholder="Rig Name"
                        value={proposedJob.rig_name}
                        onChange={(e) =>
                          handleInputChange("rig_name", e.target.value)
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Rig Type</FormLabel>
                      <Select
                        placeholder="Select Rig Type"
                        value={proposedJob.rig_type}
                        onChange={(e) =>
                          handleInputChange("rig_type", e.target.value)
                        }
                      >
                        {fetchingData?.rig_type.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Rig Horse Power</FormLabel>
                      <InputGroup size="md">
                        <Input
                          placeholder="Rig Horse Power"
                          value={proposedJob.rig_horse_power}
                          type="number"
                          min={0}
                          onChange={(e) =>
                            handleInputChange(
                              "rig_horse_power",
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <InputRightAddon
                          children="HorsePower"
                          bg="gray.400"
                          color="gray.700"
                          border="none"
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>
                </Box>

                <Box ref={sectionRefs.current["Work breakdown structure"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Work breakdown structure
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>Event</FormLabel>
                      <Input
                        placeholder="Event"
                        value={
                          proposedJob.work_breakdown_structure[
                            proposedJob.work_breakdown_structure.length - 1
                          ]?.event || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "work_breakdown_structure",
                            "event",
                            e.target.value,
                            proposedJob.work_breakdown_structure.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        value={
                          proposedJob.work_breakdown_structure[
                            proposedJob.work_breakdown_structure.length - 1
                          ]?.start_date || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "work_breakdown_structure",
                            "start_date",
                            e.target.value,
                            proposedJob.work_breakdown_structure.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="date"
                        value={
                          proposedJob.work_breakdown_structure[
                            proposedJob.work_breakdown_structure.length - 1
                          ]?.end_date || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "work_breakdown_structure",
                            "end_date",
                            e.target.value,
                            proposedJob.work_breakdown_structure.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Remarks</FormLabel>
                      <Input
                        placeholder="Remarks"
                        value={
                          proposedJob.work_breakdown_structure[
                            proposedJob.work_breakdown_structure.length - 1
                          ]?.remarks || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "work_breakdown_structure",
                            "remarks",
                            e.target.value,
                            proposedJob.work_breakdown_structure.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("work_breakdown_structure")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.work_breakdown_structure.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Event</Th>
                          <Th>Start Date</Th>
                          <Th>End Date</Th>
                          <Th>Remarks</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.work_breakdown_structure.map(
                          (item, index) => (
                            <Tr key={index}>
                              <Td>{item.event}</Td>
                              <Td>{item.start_date}</Td>
                              <Td>{item.end_date}</Td>
                              <Td>{item.remarks}</Td>
                            </Tr>
                          )
                        )}
                      </Tbody>
                    </Table>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Job document"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Job Document
                  </Text>
                  <HStack>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        placeholder="Title"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.title || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "title",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Creator Name</FormLabel>
                      <Input
                        placeholder="Creator Name"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.creator_name || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "creator_name",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Create Date</FormLabel>
                      <Input
                        type="date"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.create_date || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "create_date",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Document Type</FormLabel>
                      <Input
                        placeholder="Document Type"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.document_type || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "document_type",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Item Category</FormLabel>
                      <Input
                        placeholder="Item Category"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.item_category || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "item_category",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Item Sub Category</FormLabel>
                      <Input
                        placeholder="Item Sub Category"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.item_sub_category || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "item_sub_category",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Digital Format</FormLabel>
                      <Input
                        placeholder="Digital Format"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.digital_format || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "digital_format",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Original File Name</FormLabel>
                      <Input
                        placeholder="Original File Name"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.original_file_name || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "original_file_name",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Digital Size</FormLabel>
                      <Input
                        placeholder="Digital Size"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.digital_size || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "digital_size",
                            parseFloat(e.target.value),
                            proposedJob.job_documents.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Remark</FormLabel>
                      <Input
                        placeholder="Remark"
                        value={
                          proposedJob.job_documents[
                            proposedJob.job_documents.length - 1
                          ]?.remark || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_documents",
                            "remark",
                            e.target.value,
                            proposedJob.job_documents.length - 1
                          )
                        }
                      />
                    </FormControl>
                  </HStack>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("job_documents")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.job_documents.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Title</Th>
                          <Th>Creator Name</Th>
                          <Th>Create Date</Th>
                          <Th>Document Type</Th>
                          <Th>Item Category</Th>
                          <Th>Item Sub Category</Th>
                          <Th>Digital Format</Th>
                          <Th>Original File Name</Th>
                          <Th>Digital Size</Th>
                          <Th>Remark</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.job_documents.map((doc, index) => (
                          <Tr key={index}>
                            <Td>{doc.title}</Td>
                            <Td>{doc.creator_name}</Td>
                            <Td>{doc.create_date}</Td>
                            <Td>{doc.document_type}</Td>
                            <Td>{doc.item_category}</Td>
                            <Td>{doc.item_sub_category}</Td>
                            <Td>{doc.digital_format}</Td>
                            <Td>{doc.original_file_name}</Td>
                            <Td>{doc.digital_size}</Td>
                            <Td>{doc.remark}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Job Operation Days"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Job Operation Days
                  </Text>
                  <FormControl>
                    <FormLabel>Phase</FormLabel>
                    <Input
                      placeholder="Phase"
                      value={
                        proposedJob.job_operation_days[
                          proposedJob.job_operation_days.length - 1
                        ]?.phase || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_operation_days",
                          "phase",
                          e.target.value,
                          proposedJob.job_operation_days.length - 1
                        )
                      }
                    />
                  </FormControl>
                  <HStack>
                    <FormControl>
                      <FormLabel>Depth Datum</FormLabel>
                      <Select
                        placeholder="Select Depth Datum"
                        value={
                          proposedJob.job_operation_days[
                            proposedJob.job_operation_days.length - 1
                          ]?.depth_datum || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_operation_days",
                            "depth_datum",
                            e.target.value,
                            proposedJob.job_operation_days.length - 1
                          )
                        }
                      >
                        <option value="RT">RT</option>
                        <option value="KB">KB</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <HStack>
                    <FormControl>
                      <FormLabel>Depth In</FormLabel>
                      <Input
                        placeholder="Depth In"
                        value={
                          proposedJob.job_operation_days[
                            proposedJob.job_operation_days.length - 1
                          ]?.depth_in || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_operation_days",
                            "depth_in",
                            parseFloat(e.target.value),
                            proposedJob.job_operation_days.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Depth Out</FormLabel>
                      <Input
                        placeholder="Depth Out"
                        value={
                          proposedJob.job_operation_days[
                            proposedJob.job_operation_days.length - 1
                          ]?.depth_out || ""
                        }
                        onChange={(e) =>
                          handleArrayInputChange(
                            "job_operation_days",
                            "depth_out",
                            parseFloat(e.target.value),
                            proposedJob.job_operation_days.length - 1
                          )
                        }
                        type="number"
                      />
                    </FormControl>
                  </HStack>
                  <FormControl>
                    <FormLabel>Operation Days</FormLabel>
                    <Input
                      placeholder="Operation Days"
                      value={
                        proposedJob.job_operation_days[
                          proposedJob.job_operation_days.length - 1
                        ]?.operation_days || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_operation_days",
                          "operation_days",
                          parseFloat(e.target.value),
                          proposedJob.job_operation_days.length - 1
                        )
                      }
                      type="number"
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("job_operation_days")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.job_operation_days.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Phase</Th>
                          <Th>Depth Datum</Th>
                          <Th>Depth In</Th>
                          <Th>Depth Out</Th>
                          <Th>Operation Days</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.job_operation_days.map((op, index) => (
                          <Tr key={index}>
                            <Td>{op.phase}</Td>
                            <Td>{op.depth_datum}</Td>
                            <Td>{op.depth_in}</Td>
                            <Td>{op.depth_out}</Td>
                            <Td>{op.operation_days}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </Box>

                <Box ref={sectionRefs.current["Job Hazard"]}>
                  <Text fontWeight="bold" fontSize="xl">
                    Drilling Hazard
                  </Text>
                  <FormControl>
                    <FormLabel>Hazard Type</FormLabel>
                    <Select
                      placeholder="Select Hazard Type"
                      value={
                        proposedJob.job_hazards[
                          proposedJob.job_hazards.length - 1
                        ]?.hazard_type || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_hazards",
                          "hazard_type",
                          e.target.value,
                          proposedJob.job_hazards.length - 1
                        )
                      }
                    >
                      {fetchingData?.hazard_type.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Hazard Description</FormLabel>
                    <Input
                      placeholder="Hazard Description"
                      value={
                        proposedJob.job_hazards[
                          proposedJob.job_hazards.length - 1
                        ]?.hazard_description || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_hazards",
                          "hazard_description",
                          e.target.value,
                          proposedJob.job_hazards.length - 1
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Severity</FormLabel>
                    <Select
                      placeholder="Select Severity"
                      value={
                        proposedJob.job_hazards[
                          proposedJob.job_hazards.length - 1
                        ]?.severity || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_hazards",
                          "severity",
                          e.target.value,
                          proposedJob.job_hazards.length - 1
                        )
                      }
                    >
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Mitigation</FormLabel>
                    <Input
                      placeholder="Mitigation"
                      value={
                        proposedJob.job_hazards[
                          proposedJob.job_hazards.length - 1
                        ]?.mitigation || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_hazards",
                          "mitigation",
                          e.target.value,
                          proposedJob.job_hazards.length - 1
                        )
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Remark</FormLabel>
                    <Input
                      placeholder="Remark"
                      value={
                        proposedJob.job_hazards[
                          proposedJob.job_hazards.length - 1
                        ]?.remark || ""
                      }
                      onChange={(e) =>
                        handleArrayInputChange(
                          "job_hazards",
                          "remark",
                          e.target.value,
                          proposedJob.job_hazards.length - 1
                        )
                      }
                    />
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={() => handleAddBatch("job_hazards")}
                  >
                    Tambah Batch
                  </Button>

                  {proposedJob.job_hazards.length > 0 && (
                    <Table variant="simple" mt={4}>
                      <Thead>
                        <Tr>
                          <Th>Hazard Type</Th>
                          <Th>Hazard Description</Th>
                          <Th>Severity</Th>
                          <Th>Mitigation</Th>
                          <Th>Remark</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {proposedJob.job_hazards.map((hazard, index) => (
                          <Tr key={index}>
                            <Td>{hazard.hazard_type}</Td>
                            <Td>{hazard.hazard_description}</Td>
                            <Td>{hazard.severity}</Td>
                            <Td>{hazard.mitigation}</Td>
                            <Td>{hazard.remark}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  )}
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box>
        <NavigationMenu
          completedSections={completedSections}
          activeTab={activeTab === 0 ? "teknis" : "operasional"}
          onNavigate={handleNavigate}
        />
      </Box>
    </Grid>
  );
};

export default PengajuanDrillingForm;
