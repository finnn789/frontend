import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import TeknisForms from "./ChildForms/TeknisForms";

const WellForm = () => {



  const [allEnum, setAllEnum] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [handlingSendData, setHandlingSendData] = useState({
    id: "string",
    job: {
      field_id: "string",
      contract_type: "COST-RECOVERY",
      afe_number: "string",
      wpb_year: 0,
      plan_start: "2024-08-22T00:01:22.270Z",
      plan_end: "2024-08-22T00:01:22.270Z",
      plan_total_budget: "string",
      rig_name: "string",
      rig_type: "JACK-UP",
      rig_horse_power: 0,
      job_activity: [
        {
          time: "2024-08-22T00:01:22.270Z",
          measured_depth: 0,
          measured_depth_uoum: "FEET",
          measured_depth_datum: "RT",
          true_vertical_depth: 0,
          true_vertical_depth_uoum: "FEET",
          true_vertical_depth_sub_sea: 0,
          true_vertical_depth_sub_sea_uoum: "FEET",
          daily_cost: "string",
          summary: "string",
          current_operations: "string",
          next_operations: "string"
        }
      ],
      work_breakdown_structure: [
        {
          event: "string",
          start_date: "2024-08-22T00:01:22.270Z",
          end_data: "2024-08-22T00:01:22.270Z",
          remarks: "string"
        }
      ],
      drilling_hazard: [
        {
          hazard_type: "GAS KICK",
          hazard_description: "string",
          severity: "LOW",
          mitigation: "string",
          remark: "string"
        }
      ],
      job_documents: [
        {
          title: "string",
          creator_name: "string",
          create_date: "2024-08-22T00:01:22.270Z",
          media_type: "EXTERNAL_HARDDISK",
          document_type: "string",
          item_category: "string",
          item_sub_category: "string",
          digital_format: "string",
          original_file_name: "string",
          digital_size: 0,
          digital_size_uom: "BYTE",
          remark: "string"
        }
      ],
      drilling_class: "EXPLORATION",
      id: "string",
      planned_well: {
        uwi: "string",
        field_id: "string",
        well_name: "string",
        alias_long_name: "string",
        well_type: "OIL",
        well_class: "WILDCAT",
        well_status: "Active",
        profile_type: "DIRECTIONAL",
        environment_type: "MARINE",
        surface_longitude: 0,
        surface_latitude: 0,
        bottom_hole_longitude: 0,
        bottom_hole_latitude: 0,
        maximum_inclination: 0,
        maximum_azimuth: 0,
        line_name: "string",
        spud_date: "2024-08-22T00:01:22.270Z",
        final_drill_date: "2024-08-22T00:01:22.270Z",
        completion_date: "2024-08-22T00:01:22.270Z",
        rotary_table_elev: 0,
        rotary_table_elev_ouom: "FEET",
        kb_elev: 0,
        kb_elev_ouom: "FEET",
        derrick_floor_elev: 0,
        derrick_floor_elev_ouom: "FEET",
        ground_elev: 0,
        ground_elev_ouom: "FEET",
        mean_sea_level: 0,
        mean_sea_level_ouom: "RT",
        depth_datum: "RT",
        kick_off_point: 0,
        kick_off_point_ouom: "FEET",
        drill_td: 0,
        drill_td_ouom: "FEET",
        log_td: 0,
        log_td_ouom: "FEET",
        max_tvd: 0,
        max_tvd_ouom: "FEET",
        projected_depth: 0,
        projected_depth_ouom: "FEET",
        final_td: 0,
        final_td_ouom: "FEET",
        remark: "string",
        id: "string",
        well_documents: [
          {
            id: "string"
          }
        ],
        well_casings: [
          {
            id: "string"
          }
        ],
        well_trajectories: [
          {
            id: "string"
          }
        ],
        well_ppfgs: [
          {
            id: "string"
          }
        ],
        well_logs: [
          {
            id: "string"
          }
        ],
        well_drilling_parameters: [
          {
            id: "string"
          }
        ],
        well_strat: [
          {
            id: "string"
          }
        ]
      }
    }
  });
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/utils/enum/all', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllEnum(response.data);


      setLoading(false);
    } catch (error) {
      setError('Terjadi kesalahan saat mengambil data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setAllEnum]);








  return (
    <Box maxWidth="100%" margin="auto" padding={5}>
      <Tabs variant="enclosed" colorScheme="blue">
        <TabList mb={4}>
          <Tab
            _selected={{
              color: 'blue.500',
              bg: 'white',
              borderColor: 'blue.500',
              borderBottom: 'none',
            }}
            borderTopRadius="md"
            border="1px solid"
            borderColor="gray.200"
            mr="-1px"
          >
            Teknis
          </Tab>
          <Tab
            _selected={{
              color: 'green.500',
              bg: 'white',
              borderColor: 'green.500',
              borderBottom: 'none',
            }}
            borderTopRadius="md"
            border="1px solid"
            borderColor="gray.200"
            mr="-1px"
          >
            Operasional
          </Tab>
          <Tab
            _selected={{
              color: 'purple.500',
              bg: 'white',
              borderColor: 'purple.500',
              borderBottom: 'none',
            }}
            borderTopRadius="md"
            border="1px solid"
            borderColor="gray.200"
            mr="-1px"
          >
            Well Summary
          </Tab>
          <Tab
            _selected={{
              color: 'red.500',
              bg: 'white',
              borderColor: 'red.500',
              borderBottom: 'none',
            }}
            borderTopRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            Trajectory + Hazard
          </Tab>
        </TabList>

        <TabPanels
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <TabPanel>
            <TeknisForms />
          </TabPanel>

          <TabPanel>
            <VStack spacing={6} align="stretch">
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>area id</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>field id</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>contract type</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>afe number</FormLabel>
                  <Input placeholder="afe number" />
                </FormControl>
                <FormControl>
                  <FormLabel>wpb year</FormLabel>
                  <Input placeholder="wpb year" />
                </FormControl>
                <FormControl>
                  <FormLabel>total budget</FormLabel>
                  <Input placeholder="total budget" />
                </FormControl>
                <FormControl>
                  <FormLabel>start date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>end date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <Box></Box> {/* Empty box for alignment */}
                <FormControl>
                  <FormLabel>Rig name</FormLabel>
                  <Input placeholder="Rig name" />
                </FormControl>
                <FormControl>
                  <FormLabel>rig type</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Rig horse power</FormLabel>
                  <Input placeholder="Rig horse power" />
                </FormControl>
                <FormControl>
                  <FormLabel>Job document title</FormLabel>
                  <Input placeholder="Job document title" />
                </FormControl>
                <FormControl>
                  <FormLabel>creator name</FormLabel>
                  <Input placeholder="creator name" />
                </FormControl>
                <FormControl>
                  <FormLabel>create date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>media type</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>document type</FormLabel>
                  <Input placeholder="document type" />
                </FormControl>
                <FormControl>
                  <FormLabel>item category</FormLabel>
                  <Input placeholder="item category" />
                </FormControl>
                <FormControl>
                  <FormLabel>item sub category</FormLabel>
                  <Input placeholder="item sub category" />
                </FormControl>
                <FormControl>
                  <FormLabel>digital format</FormLabel>
                  <Input placeholder="digital format" />
                </FormControl>
                <FormControl>
                  <FormLabel>original file name</FormLabel>
                  <Input placeholder="original file name" />
                </FormControl>
                <FormControl>
                  <FormLabel>digital size</FormLabel>
                  <Input placeholder="digital size" />
                </FormControl>
                <FormControl>
                  <FormLabel>digital size uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>remark</FormLabel>
                <Textarea placeholder="remark" />
              </FormControl>

              <Box fontWeight="bold">Work breakdown structure</Box>
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>event</FormLabel>
                  <Input placeholder="event" />
                </FormControl>
                <FormControl>
                  <FormLabel>start date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>end date</FormLabel>
                  <Input type="date" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>remark</FormLabel>
                <Textarea placeholder="remark" />
              </FormControl>

              <Box fontWeight="bold">Operation days</Box>
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>phase</FormLabel>
                  <Input placeholder="phase" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth in</FormLabel>
                  <Input placeholder="depth in" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth out</FormLabel>
                  <Input placeholder="depth out" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth datum</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>depth uoum</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>operation days</FormLabel>
                  <Input placeholder="operation days" />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box fontWeight="bold">Well Summary</Box>
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>stratigraphy id</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>depth datum</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>depth</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>depth uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>hole diameter</FormLabel>
                  <Input placeholder="hole diameter" />
                </FormControl>
                <FormControl>
                  <FormLabel>hole diameter uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>bit</FormLabel>
                  <Input placeholder="bit" />
                </FormControl>
                <FormControl>
                  <FormLabel>casing diameter</FormLabel>
                  <Input placeholder="casing diameter" />
                </FormControl>
                <FormControl>
                  <FormLabel>casing diameter uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>casing grade</FormLabel>
                  <Input placeholder="casing grade" />
                </FormControl>
                <FormControl>
                  <FormLabel>casing weight</FormLabel>
                  <Input placeholder="casing weight" />
                </FormControl>
                <FormControl>
                  <FormLabel>casing weight uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>logging</FormLabel>
                  <Input placeholder="logging" />
                </FormControl>
                <FormControl>
                  <FormLabel>mud program</FormLabel>
                  <Input placeholder="mud program" />
                </FormControl>
                <FormControl>
                  <FormLabel>cementing program</FormLabel>
                  <Input placeholder="cementing program" />
                </FormControl>
                <FormControl>
                  <FormLabel>bottom hole temperatur</FormLabel>
                  <Input placeholder="bottom hole temperatur" />
                </FormControl>
                <FormControl>
                  <FormLabel>bottom hole temperatur uom</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>rate of penetration</FormLabel>
                  <Input placeholder="rate of penetration" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>remark</FormLabel>
                <Textarea placeholder="remark" />
              </FormControl>

              <Box fontWeight="bold">Work breakdown structure</Box>
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>event</FormLabel>
                  <Input placeholder="event" />
                </FormControl>
                <FormControl>
                  <FormLabel>start date</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>end date</FormLabel>
                  <Input type="date" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>remark</FormLabel>
                <Textarea placeholder="remark" />
              </FormControl>

              <Box fontWeight="bold">Operation days</Box>
              <SimpleGrid columns={3} spacing={4}>
                <FormControl>
                  <FormLabel>phase</FormLabel>
                  <Input placeholder="phase" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth in</FormLabel>
                  <Input placeholder="depth in" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth out</FormLabel>
                  <Input placeholder="depth out" />
                </FormControl>
                <FormControl>
                  <FormLabel>depth datum</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>depth uoum</FormLabel>
                  <Select placeholder="Dropdown Get API">
                    {/* Options would be populated from API */}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>operation days</FormLabel>
                  <Input placeholder="operation days" />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Box>Content for Trajectory + Hazard tab</Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default WellForm;
