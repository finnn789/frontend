import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  VStack,
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Text,
  HStack,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { IconLayersSubtract, IconTrash } from "@tabler/icons-react";
import { GetDataStratigraphy } from "../../../API/APISKK";

const Stratigraphy = ({ handleChange, unittype = "Metrics", errorForms, codeAreaId }) => {
  const [stratInfo, setStratInfo] = useState(null);
  const [WellStratigraphy, setLocalWellStratigraphy] = useState([]);
  const [formData, setFormData] = useState({
    unit_type: unittype,
    depth_datum: "RT",
    top_depth: null,
    bottom_depth: null,
    formation_name: null,
    lithology: null
  });

  // Mengirim data WellStratigraphy ke parent setiap kali berubah
  useEffect(() => {
    handleChange(WellStratigraphy);
  }, [WellStratigraphy, handleChange]);

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "top_depth" || name === "bottom_depth" ? parseFloat(value) : value,
    }));
  };

  // Tambah data stratigraphy ke tabel
  const handleAddStratigraphy = () => {
    if (!formData.formation_name || formData.top_depth === "" || formData.bottom_depth === "") {
      alert("Please fill in all fields.");
      return;
    }

    setLocalWellStratigraphy((prev) => [
      ...prev,
      { ...formData, top_depth: parseFloat(formData.top_depth), bottom_depth: parseFloat(formData.bottom_depth) },
    ]);

    // Reset form data setelah menambahkan
    setFormData({
      ...formData,
      formation_name: null,
      lithology: null,
      top_depth: null,
      bottom_depth: null,
    });
  };

  // Hapus data stratigraphy dari tabel
  const handleDeleteRow = (index) => {
    setLocalWellStratigraphy((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={7} fontFamily="Montserrat">
      <GridItem colSpan={1} height="100%">
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Flex alignItems="center">
              <Icon as={IconLayersSubtract} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection="column">
                <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                  Stratigraphy
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  Subtitle
                </Text>
              </Flex>
            </Flex>
            <Select
              width="auto"
              value={formData.depth_datum}
              onChange={(e) => setFormData({ ...formData, depth_datum: e.target.value })}
            >
              <option value="RT">RT</option>
              <option value="KB">KB</option>
              <option value="MSL">MSL</option>
            </Select>
          </Flex>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              {/* Form Input for Depth */}
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Top Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="top_depth"
                      type="number"
                      value={formData.top_depth}
                      onChange={handleInputChange}
                      placeholder="Top Depth"
                    />
                    <InputRightAddon>{unittype === "Metrics" ? "METER" : "FEET"}</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Bottom Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="bottom_depth"
                      type="number"
                      value={formData.bottom_depth}
                      onChange={handleInputChange}
                      placeholder="Bottom Depth"
                    />
                    <InputRightAddon>{unittype === "Metrics" ? "METER" : "FEET"}</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>

              {/* Form Input for Formation Name */}
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Formation Name</FormLabel>
                  <Input
                    name="formation_name"
                    type="text"
                    value={formData.formation_name}
                    onChange={handleInputChange}
                    placeholder="Formation Name"
                  />
                </FormControl>
              </GridItem>

              {/* Form Input for Lithology */}
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Lithology</FormLabel>
                  <Input
                    name="lithology"
                    type="text"
                    value={formData.lithology}
                    onChange={handleInputChange}
                    placeholder="Lithology"
                  />
                </FormControl>
              </GridItem>
            </Grid>
            <Flex justifyContent="flex-end">
              <Button colorScheme="blue" onClick={handleAddStratigraphy}>
                Add
              </Button>
            </Flex>
          </VStack>
        </Box>
      </GridItem>

      <GridItem height="100%">
        <Box borderWidth="1px" height="325px" borderRadius="lg" p={6}>
          {WellStratigraphy.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Top Depth</Th>
                  <Th>Bottom Depth</Th>
                  <Th>Formation Name</Th>
                  <Th>Lithology</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {WellStratigraphy.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.top_depth}</Td>
                    <Td>{row.bottom_depth}</Td>
                    <Td>{row.formation_name}</Td>
                    <Td>{row.lithology}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<Icon as={IconTrash} />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleDeleteRow(index)}
                          aria-label="Delete row"
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Flex justifyContent="center" flexDirection="column" alignItems="center" height="100%">
              <Heading fontFamily="Montserrat">Tidak Ada Data</Heading>
              {!!errorForms["job_plan.well.well_stratigraphy"] && (
                <Text color="red.500" fontSize="sm" mt={2}>
                  Well Stratigraphy cannot be empty.
                </Text>
              )}
            </Flex>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Stratigraphy;
