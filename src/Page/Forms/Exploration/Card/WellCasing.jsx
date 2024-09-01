import React from "react";
import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

const WellCasing = ({ dataWellCasing }) => {
  const handleWellCasing = () => {
    const newEntry = { ...wellCasing };
    const updatedTable = [...tableWellCasing, newEntry];
    setTableWellCasing((prevData) => [...prevData, newEntry]);

    dataWellCasing(updatedTable);
    // Reset currentEntry after adding
    setWellCasing({
      unit_type: "Metrics",
      depth_datum: "RT",
      depth: 0,
      length: 0,
      hole_diameter: 0,
      casing_outer_diameter: 0,
      casing_inner_diameter: 0,
      casing_grade: "",
      casing_weight: 0,
      connection: "",
      description: "",
    });
  };
  const handleInputChangeWellCasing = (e) => {
    const { name, value } = e.target;
    const processedValue = isNaN(value) ? value : parseInt(value, 10);
    setWellCasing((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };
  const [tableWellCasing, setTableWellCasing] = useState([]);
  const [wellCasing, setWellCasing] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    length: 0,
    hole_diameter: 0,
    casing_outer_diameter: 0,
    casing_inner_diameter: 0,
    casing_grade: "",
    casing_weight: 0,
    connection: "",
    description: "",
  });
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
      <GridItem colSpan={1} width={"100%"}>
        <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading size="lg">Well Casing</Heading>
            <Box
              display={"grid"}
              gridTemplateColumns={"repeat(2, 1fr)"}
              gap={2}
            >
              <Box></Box>
            </Box>
          </Flex>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <FormControl>
                <FormLabel>Depth</FormLabel>
                <Input
                  name="depth"
                  type="number"
                  value={wellCasing.depth}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Depth"
                />
              </FormControl>
              <FormControl>
                <FormLabel>length</FormLabel>
                <Input
                  name="length"
                  type="number"

                  value={wellCasing.length}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Depth"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Hole Diameter</FormLabel>
                <Input
                  name="hole_diameter"
                  value={wellCasing.hole_diameter}
                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Hole Diameter"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Casing Outer Diameter</FormLabel>
                <Input
                  name="casing_outer_diameter"
                  value={wellCasing.casing_outer_diameter}
                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Casing Outer Diameter"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Casing Inner Diameter</FormLabel>
                <Input
                  name="casing_inner_diameter"
                  value={wellCasing.casing_inner_diameter}
                  onChange={handleInputChangeWellCasing}
                  type="number"
                  placeholder="Casing Outer Diameter"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Casing Grade</FormLabel>
                <Input
                  name="casing_grade"
                  value={wellCasing.casing_grade}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Casing Grade"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Casing Weight</FormLabel>
                <Input
                  name="casing_weight"
                  value={wellCasing.casing_weight}

                  type="number"
                  onChange={handleInputChangeWellCasing}
                  placeholder="Casing Weight"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Logging Program</FormLabel>
                <Input
                  name="connection"
                  value={wellCasing.connection}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Logging Program"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={wellCasing.description}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Cementing Program"
                />
              </FormControl>
            </Grid>
            <Button colorScheme="blue" onClick={handleWellCasing}>
              Add
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem overflowX={"auto"}>
        <Box
          borderWidth="1px"
          overflowX={"auto"}
          h={"590px"}
          borderRadius="lg"
          p={6}
          boxShadow="md"
        >
          <Tabs>
            <TabList>
              <Tab>Table</Tab>
              <Tab>Casing</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Heading size="md" mb={4}>
                  Table Well Casing
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Depth</Th>
                      <Th>Hole Diameter</Th>

                      <Th>Length</Th>
                      <Th>Casing Outer </Th>
                      <Th>Casing Inner</Th>
                      <Th>Casing Grade</Th>
                      <Th>Casing Weight</Th>

                      <Th>Description</Th>
                      {/* Tambahkan header lain sesuai kebutuhan */}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableWellCasing.map((row, index) => (
                      <Tr key={index}>
                        <Td>{row.depth}</Td>
                        <Td>{row.hole_diameter}</Td>
                        <Td>{row.length}</Td>
                        <Td>{row.casing_outer_diameter}</Td>
                        <Td>{row.casing_inner_diameter}</Td>
                        <Td>{row.casing_grade}</Td>
                        <Td>{row.casing_weight}</Td>
                        <Td>{row.description}</Td>
                        {/* Tambahkan sel lain sesuai kebutuhan */}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default WellCasing;
