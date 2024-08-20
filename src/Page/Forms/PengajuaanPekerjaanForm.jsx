import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Radio,
  RadioGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";

const PengajuanPekerjaanForm = () => {
  return (
    <Box maxWidth="100%" margin="auto" p={5}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Pengajuan Pekerjaan / Input Data
      </Text>
      <Tabs>
        <TabList>
          <Tab>Data Sumur</Tab>
          <Tab>Pekerjaan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <VStack align="stretch" spacing={4}>
                  <FormControl>
                    <FormLabel>UWI</FormLabel>
                    <Input placeholder="UWI" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Nama Sumur</FormLabel>
                    <Input placeholder="Nama Lengkap Sumur" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Well Class</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Well Status</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Environment_Type</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Final_drill_date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Surface Longitude</FormLabel>
                    <Input placeholder="Surface Longitude" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bottom hole longitude</FormLabel>
                    <Input placeholder="Bottom hole longitude" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Rotary Table Elev</FormLabel>
                    <Input placeholder="Rotary Table Elev" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kb Elev</FormLabel>
                    <Input placeholder="Kb Elev" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Derrick Floor Elev</FormLabel>
                    <Input placeholder="derrick Floor Elev" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Depth Datum</FormLabel>
                    <Input placeholder="depth datum" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Drill TD</FormLabel>
                    <Input placeholder="drill td" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>LOG TD</FormLabel>
                    <Input placeholder="log td" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>MAX TVD</FormLabel>
                    <Input placeholder="max tvd" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Projected Depth</FormLabel>
                    <Input placeholder="projected depth" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>FINAL TD</FormLabel>
                    <Input placeholder="final td" />
                  </FormControl>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack align="stretch" spacing={4}>
                  <FormControl>
                    <FormLabel>Field</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Well Type</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Profile_Type</FormLabel>
                    <Select placeholder="Select option">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Spud_date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Completion date</FormLabel>
                    <Input type="date" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Surface Latitude</FormLabel>
                    <Input placeholder="Surface Latitude" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Line name</FormLabel>
                    <Input placeholder="Line name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Rotary Table Elev Ouom</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kb Elev Ouom</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Derrick Floor Elev Ouom</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Drill TD UOM</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>LOG TD UOM</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>MAX TVD UOM</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>PROJECTED DEPTH UOM</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>FINAL TD UOM</FormLabel>
                    <RadioGroup defaultValue="feet">
                      <HStack spacing={4}>
                        <Radio value="feet">Feet</Radio>
                        <Radio value="meter">Meter</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                </VStack>
              </GridItem>
            </Grid>
            <VStack spacing={6} align="stretch" mt={8}>
              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Trajectory</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>

              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Logging</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>

              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Casing</FormLabel>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Inside Diameter</FormLabel>
                        <Input placeholder="Inside Diameter" />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Inside Diameter ouom</FormLabel>
                        <RadioGroup>
                          <HStack spacing={4}>
                            <Radio value="feet">Feet</Radio>
                            <Radio value="meter">Meter</Radio>
                            <Radio value="inch">Inch</Radio>
                          </HStack>
                        </RadioGroup>
                      </FormControl>
                    </GridItem>
                    {/* ... (field Casing lainnya) ... */}
                  </Grid>
                  <Button mt={4} colorScheme="blue">
                    Upload File
                  </Button>
                </FormControl>
                <Box bg="red.500" h="100px" mt={4}></Box>
                <Box bg="yellow.300" h="100px" mt={4}></Box>
              </Box>

              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Stratigrafi</FormLabel>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Depth datum</FormLabel>
                        <Input placeholder="Depth datum" />
                      </FormControl>
                    </GridItem>
                    {/* ... (field Stratigrafi lainnya) ... */}
                  </Grid>
                  <Button mt={4} colorScheme="blue">
                    Upload File
                  </Button>
                </FormControl>
                <Box bg="red.500" h="100px" mt={4}></Box>
                <Box bg="yellow.300" h="100px" mt={4}></Box>
              </Box>

              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Drilling Parameter</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={6} align="stretch">
              <Box bg="" p={4}>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Field</FormLabel>
                      <Select placeholder="Select field">
                        <option value="field1">Field 1</option>
                        <option value="field2">Field 2</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl>
                      <FormLabel>Contract Type</FormLabel>
                      <Input placeholder="Contract Type" />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>AFE Number</FormLabel>
                      <Select placeholder="Select AFE">
                        <option value="afe1">AFE 1</option>
                        <option value="afe2">AFE 2</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Job type</FormLabel>
                      <Input placeholder="Job type" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Total Afe Number Approve</FormLabel>
                      <Input placeholder="Total Afe Number Approve" />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>WP&B</FormLabel>
                      <Select placeholder="Select year">
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Status Afe Reject/Proses/Validasi</FormLabel>
                      <Input placeholder="Status" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}></GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Plan Start</FormLabel>
                      <Input type="date" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Plan end</FormLabel>
                      <Input type="date" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Plan Total Budget</FormLabel>
                      <Input placeholder="Plan Total Budget" />
                    </FormControl>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Rig Name</FormLabel>
                      <Input placeholder="Rig Name" />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Rig type</FormLabel>
                      <Select placeholder="Select rig type">
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormControl>
                      <FormLabel>Rig HP(Horse power)</FormLabel>
                      <Input placeholder="Rig HP" />
                    </FormControl>
                  </GridItem>
                </Grid>
              </Box>

              <Box bg="" p={4}>
                <FormControl>
                  <FormLabel>Trajectory</FormLabel>
                  <Input type="file" />
                </FormControl>
              </Box>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PengajuanPekerjaanForm;
