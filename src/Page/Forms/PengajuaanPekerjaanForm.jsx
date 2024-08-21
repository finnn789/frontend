import React from "react";
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

const WellForm = () => {
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
            <Box fontWeight="bold">Well</Box>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>UWI</FormLabel>
                <Input placeholder="Well UWI" />
              </FormControl>
              <FormControl>
                <FormLabel>Nama Sumur</FormLabel>
                <Input placeholder="Nama Sumur" />
              </FormControl>
              <FormControl>
                <FormLabel>Nama Lengkap Sumur</FormLabel>
                <Input placeholder="Nama Lengkap Sumur" />
              </FormControl>
              <FormControl>
                <FormLabel>Type Well</FormLabel>
                <Select placeholder="Dropdown Get API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Well Status</FormLabel>
                <Select placeholder="Dropdown Get API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Hydrocarbon Target</FormLabel>
                <Select placeholder="Dropdown Get API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Well Profile Type</FormLabel>
                <Select placeholder="Dropdown Get API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Environment Type</FormLabel>
                <Input placeholder="Environment Type" />
              </FormControl>
              <FormControl>
                <FormLabel>Surface Longitude</FormLabel>
                <Input placeholder="Surface Longitude" />
              </FormControl>
              <FormControl>
                <FormLabel>Surface Latitude</FormLabel>
                <Input placeholder="Surface Latitude" />
              </FormControl>
              <FormControl>
                <FormLabel>bottom hole Longitude</FormLabel>
                <Input placeholder="bottom hole Longitude" />
              </FormControl>
              <FormControl>
                <FormLabel>bottom hole Latitude</FormLabel>
                <Input placeholder="bottom hole Latitude" />
              </FormControl>
              <FormControl>
                <FormLabel>Maximum inclination</FormLabel>
                <Input placeholder="Maximum inclination" />
              </FormControl>
              <FormControl>
                <FormLabel>Azimuth</FormLabel>
                <Input placeholder="Azimuth" />
              </FormControl>
              <FormControl>
                <FormLabel>Line name</FormLabel>
                <Input placeholder="Line name" />
              </FormControl>
              <FormControl>
                <FormLabel>spud date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>final drill date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>completion date</FormLabel>
                <Input type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Rotary table elev</FormLabel>
                <Input placeholder="Rotary table elev" />
              </FormControl>
              <FormControl>
                <FormLabel>Rotary table elev uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Kb elev</FormLabel>
                <Input placeholder="Kb elev" />
              </FormControl>
              <FormControl>
                <FormLabel>Kb elev uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Derrick floor elev</FormLabel>
                <Input placeholder="Derrick floor elev" />
              </FormControl>
              <FormControl>
                <FormLabel>derrick floor elev uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Ground elev</FormLabel>
                <Input placeholder="Ground elev" />
              </FormControl>
              <FormControl>
                <FormLabel>ground elev uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Mean sea level</FormLabel>
                <Input placeholder="Mean sea level" />
              </FormControl>
              <FormControl>
                <FormLabel>mean sea level uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>depth datum</FormLabel>
                <Select placeholder="Dropdown Get API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <Box></Box> {/* Empty box for alignment */}
              <FormControl>
                <FormLabel>Kick Of point</FormLabel>
                <Input placeholder="Kick Of point" />
              </FormControl>
              <FormControl>
                <FormLabel>Kick of point uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Maximum Tvd</FormLabel>
                <Input placeholder="Maximum Tvd" />
              </FormControl>
              <FormControl>
                <FormLabel>Maximum Tvd uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Final md</FormLabel>
                <Input placeholder="Final md" />
              </FormControl>
              <FormControl>
                <FormLabel>final md uom</FormLabel>
                <Select placeholder="Dropdown gate API">
                  {/* Options would be populated from API */}
                </Select>
              </FormControl>
              <FormControl gridColumn="span 2">
                <FormLabel>Remark</FormLabel>
                <Textarea placeholder="Remark" />
              </FormControl>
            </SimpleGrid>
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
