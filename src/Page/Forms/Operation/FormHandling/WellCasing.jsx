import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  InputGroup,
  InputRightAddon,
  Icon,
  Text,
  Image,
  HStack,
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import { IconCylinder, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";

const WellCasing = ({ data, onChange, errorForms = false, unittype = "Metrics" }) => {
  const datas = data?.data;
  const [tableWellCasing, setTableWellCasing] = useState([]);
  const [wellCasing, setWellCasing] = useState({
    unit_type: unittype,
    depth_datum: "RT",
    depth: "",
    length: "",
    hole_diameter: "",
    casing_outer_diameter: "",
    casing_inner_diameter: "",
    casing_grade: "",
    casing_weight: "",
    connection: "",
    description: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (datas?.job_plan?.well?.well_casing) {
      setTableWellCasing(datas.job_plan.well.well_casing);
    }
  }, [datas]);

  const updateWellCasing = (key, value) => {
    setWellCasing(prev => ({ ...prev, [key]: value }));
  };

  const handleAddCasing = () => {
    const updatedTable = [...tableWellCasing, wellCasing];
    setTableWellCasing(updatedTable);
    onChange("job_plan.well.well_casing", updatedTable);
    resetForm();
  };

  const handleEditChange = (key, value) => {
    setEditFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveEdit = (index) => {
    const updatedTable = [...tableWellCasing];
    updatedTable[index] = editFormData;
    setTableWellCasing(updatedTable);
    setEditIndex(null);
    onChange("job_plan.well.well_casing", updatedTable);
  };

  const handleDeleteRow = (index) => {
    const updatedTable = tableWellCasing.filter((_, i) => i !== index);
    setTableWellCasing(updatedTable);
    onChange("job_plan.well.well_casing", updatedTable);
  };

  const resetForm = () => {
    setWellCasing({
      unit_type: unittype,
      depth_datum: "RT",
      depth: "",
      length: "",
      hole_diameter: "",
      casing_outer_diameter: "",
      casing_inner_diameter: "",
      casing_grade: "",
      casing_weight: "",
      connection: "",
      description: "",
    });
  };

  const clickShowCasing = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/visualize/visualize-casing`,
        {
          names: tableWellCasing.map(entry => entry.description),
          top_depths: tableWellCasing.map(entry => entry.depth - entry.length),
          bottom_depths: tableWellCasing.map(entry => entry.depth),
          diameters: tableWellCasing.map(entry => entry.casing_outer_diameter),
        },
        {  
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }},
      );
      try {
        const visualizationResponse = await axios.get(
          `${
            import.meta.env.VITE_APP_URL
          }/visualize/casing-visualization/${response.data.data.session_id}`,
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
      }
      catch (error) {
        console.error("Error downloading visualization", error);
      }
    } catch (error) {
      console.error("Error generating visualization", error);
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} >
      <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Flex alignItems="center">
            <Icon as={IconCylinder} boxSize={12} color="gray.800" mr={3} />
            <Text fontSize="xl" fontWeight="bold">Well Casing</Text>
          </Flex>
          <Select width="auto" value={wellCasing.depth_datum} onChange={e => updateWellCasing("depth_datum", e.target.value)}>
            <option value="RT">RT</option>
            <option value="KB">KB</option>
            <option value="MSL">MSL</option>
          </Select>
        </Flex>

        <VStack spacing={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {[
              { label: "Depth", key: "depth", type: "number", addon: wellCasing.unit_type === "Metrics" ? "m" : "ft" },
              { label: "Length", key: "length", type: "number", addon: wellCasing.unit_type === "Metrics" ? "m" : "ft" },
              { label: "Hole Diameter", key: "hole_diameter", type: "number", addon: "INCH" },
              { label: "Casing Outer Diameter", key: "casing_outer_diameter", type: "number", addon: "INCH" },
              { label: "Casing Inner Diameter", key: "casing_inner_diameter", type: "number", addon: "INCH" },
              { label: "Casing Weight", key: "casing_weight", type: "number", addon: unittype === "Metrics" ? "kg/m3" : "ppf" },
            ].map(({ label, key, type, addon }) => (
              <GridItem key={key}>
                <FormControl>
                  <FormLabel>{label}</FormLabel>
                  <InputGroup>
                    <Input isDisabled name={key} type={type} value={wellCasing[key]} onChange={e => updateWellCasing(key, e.target.value)} />
                    <InputRightAddon>{addon}</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
            ))}

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input isDisabled name="description" type="text" value={wellCasing.description} onChange={e => updateWellCasing("description", e.target.value)} />
              </FormControl>
            </GridItem>
          </Grid>

          <Button colorScheme="blue" isDisabled onClick={handleAddCasing}>
            {editIndex !== null ? "Update Data" : "Add Data"}
          </Button>
        </VStack>
      </Box>

      <Box borderWidth="1px" w={"100%"} borderRadius="lg" p={0} height="100%">
        <Tabs height="100%">
          <TabList>
            <Tab>Table</Tab>
            <Tab>Casing</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Setting a fixed height and overflowY to enable scroll inside the tab panel */}
              <Box maxHeight="400px" overflowY="auto">
                <Table variant="simple">
                  <Thead position="sticky" top={0} bg="white" zIndex={1}>
                    <Tr>
                      {["Depth", "Length", "Hole Diameter", "Casing Outer", "Casing Inner", "Casing Grade", "Casing Weight", "Description", "Actions"].map(header => (
                        <Th key={header}>{header}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tableWellCasing.map((row, index) => (
                      <Tr key={index}>
                        {editIndex === index ? (
                          <>
                            {["depth", "length", "hole_diameter", "casing_outer_diameter", "casing_inner_diameter", "casing_grade", "casing_weight", "description"].map(key => (
                              <Td key={key}>
                                <Input isDisabled name={key} value={editFormData[key]} onChange={e => handleEditChange(key, e.target.value)} />
                              </Td>
                            ))}
                            <Td>
                              <HStack spacing={2}>
                                <IconButton icon={<IconCheck />} colorScheme="green" size="sm" onClick={() => handleSaveEdit(index)} />
                                <IconButton icon={<IconX />} colorScheme="red" size="sm" onClick={() => setEditIndex(null)} />
                              </HStack>
                            </Td>
                          </>
                        ) : (
                          <>
                            {["depth", "length", "hole_diameter", "casing_outer_diameter", "casing_inner_diameter", "casing_grade", "casing_weight", "description"].map(key => (
                              <Td key={key}>{row[key]}</Td>
                            ))}
                            <Td>
                              <HStack spacing={2}>
                                <IconButton icon={<IconEdit />} colorScheme="blue" size="sm" onClick={() => handleEditRow(index)} />
                                <IconButton icon={<IconTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteRow(index)} />
                              </HStack>
                            </Td>
                          </>
                        )}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>

            <TabPanel>
              <Button colorScheme="blue" onClick={clickShowCasing}>
                Show Casing
              </Button>
              {imageUrl && <Image height={"100%"} src={imageUrl} alt="Casing Visualization" />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

export default WellCasing;
