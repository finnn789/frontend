import React, { useState } from "react";
import {
  Box,
  VStack,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

const WellCasing = ({ dataWellCasing }) => {
  const [showWellCasing, setShowWellCasing] = useState({
    names: [],
    top_depths: [],
    bottom_depths: [],
    diameters: [],
  });

  const [imageUrl, setImageUrl] = useState(null);
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

  const handleWellCasing = () => {
    const calculationBottomDepth = (depth, length) => {
      return depth - length;
    };
    const newEntry = { ...wellCasing };
    const updatedTable = [...tableWellCasing, newEntry];
    setTableWellCasing(updatedTable);
    setShowWellCasing((prevData) => ({
      names: [...prevData.names, newEntry.description],
      bottom_depths: [...prevData.bottom_depths, newEntry.depth],
      top_depths: [
        ...prevData.top_depths,
        calculationBottomDepth(newEntry.depth, newEntry.length),
      ],
      diameters: [...prevData.diameters, newEntry.casing_outer_diameter],
    }));

    dataWellCasing(updatedTable);
    resetWellCasing();
  };

  const handleInputChangeWellCasing = (e) => {
    const { name, value, type } = e.target;

    let processedValue;

    switch (type) {
      case "number":
        processedValue = parseFloat(value);
        break;
      case "checkbox":
        processedValue = e.target.checked;
        break;
      case "text":
      default:
        processedValue = value;
        break;
    }

    setWellCasing((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  };

  const resetWellCasing = () => {
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
        const sessionId = response.data.session_id;
        try {
          const visualizationResponse = await axios.get(
            `${
              import.meta.env.VITE_APP_URL
            }/visualize/casing-visualization/${sessionId}`,
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

    // Update showWellCasing state
    setShowWellCasing((prevData) => ({
      names: prevData.names.filter((_, i) => i !== index),
      top_depths: prevData.top_depths.filter((_, i) => i !== index),
      bottom_depths: prevData.bottom_depths.filter((_, i) => i !== index),
      diameters: prevData.diameters.filter((_, i) => i !== index),
    }));
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
      <GridItem colSpan={1} width={"100%"}>
        <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading size="lg">Well Casing</Heading>
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
                <FormLabel>Length</FormLabel>
                <Input
                  name="length"
                  type="number"
                  value={wellCasing.length}
                  onChange={handleInputChangeWellCasing}
                  placeholder="Length"
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
                  placeholder="Casing Inner Diameter"
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
              Add Data
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
                      <Th>Length</Th>
                      <Th>Hole Diameter</Th>
                      <Th>Casing Outer</Th>
                      <Th>Casing Inner</Th>
                      <Th>Casing Grade</Th>
                      <Th>Casing Weight</Th>
                      <Th>Description</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableWellCasing.map((row,index) => (
                      <Tr key={index}>
                        <Td>{row.depth}</Td>
                        <Td>{row.length}</Td>
                        <Td>{row.hole_diameter}</Td>
                        <Td>{row.casing_outer_diameter}</Td>
                        <Td>{row.casing_inner_diameter}</Td>
                        <Td>{row.casing_grade}</Td>
                        <Td>{row.casing_weight}</Td>
                        <Td>{row.description}</Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleDeleteRow(index)}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
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
      </GridItem>
    </Grid>
  );
};

export default WellCasing;
