import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  HStack,
  GridItem,
  Heading,
  Grid,
} from "@chakra-ui/react";

const WellTest = ({ onData }) => {
  const [formData, setFormData] = useState([]);
  const [wellTest, setWellTest] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    zone_name: "",
    zone_top_depth: 0,
    zone_bottom_depth: 0,
    depth_uom: "FEET",
  });

  useEffect(() => {
    onData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWellTest((prev) => ({
      ...prev,
      [name]: name.includes('depth') ? parseFloat(value) : value,
    }));
  };

  const handleAddClick = () => {
    const newData = { ...wellTest };
    setFormData((prev) => [...prev, newData]);
    setWellTest({
      unit_type: "Metrics",
      depth_datum: "RT",
      zone_name: "",
      zone_top_depth: 0,
      zone_bottom_depth: 0,
      depth_uom: "FEET",
    });
  };

  return (
    <div>
      <Grid templateColumns={"repeat(2, 1fr)"} mt={4} gap={4}>
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md">
            <Heading size="lg" mb={6}>
              Well Test
            </Heading>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Zone Name</FormLabel>
                  <Input
                    name="zone_name"
                    value={wellTest.zone_name}
                    onChange={handleChange}
                    placeholder="Zone Name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Zone Top Depth</FormLabel>
                  <Input
                    name="zone_top_depth"
                    type="number"
                    value={wellTest.zone_top_depth}
                    onChange={handleChange}
                    placeholder="Zone Top Depth"
                  />
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Zone Bottom Depth</FormLabel>
                  <Input
                    name="zone_bottom_depth"
                    type="number"
                    value={wellTest.zone_bottom_depth}
                    onChange={handleChange}
                    placeholder="Zone Bottom Depth"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Depth UOM</FormLabel>
                  <Select
                    name="depth_uom"
                    value={wellTest.depth_uom}
                    onChange={handleChange}
                  >
                    <option value="FEET">FEET</option>
                    <option value="METER">METER</option>
                  </Select>
                </FormControl>
              </HStack>
              <Button colorScheme="blue" onClick={handleAddClick}>
                Add
              </Button>
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            borderWidth="1px"
            h={"325px"}
            borderRadius="lg"
            p={6}
            boxShadow="md"
            overflowY="auto"
          >
            <Heading size="lg" mb={6}>
              Table Well Test
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Depth Datum</Th>
                  <Th>Zone Name</Th>
                  <Th>Zone Top Depth</Th>
                  <Th>Zone Bottom Depth</Th>
                  <Th>Depth UOM</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.map((data, index) => (
                  <Tr key={index}>
                    <Td>{data.depth_datum}</Td>
                    <Td>{data.zone_name}</Td>
                    <Td>{data.zone_top_depth}</Td>
                    <Td>{data.zone_bottom_depth}</Td>
                    <Td>{data.depth_uom}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
};

export default WellTest;