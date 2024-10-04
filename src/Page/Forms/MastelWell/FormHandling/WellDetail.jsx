import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  HStack,
  Grid,
  GridItem,
  InputGroup,
  InputRightAddon,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";

const WellDetail = ({ onChange }) => {
  const [formData, setFormData] = useState({
    uwi: null,
    well_name: null,
    alias_long_name: null,
    well_type: null,
    well_profile_type: null,
    environment_type: null,
    well_directional_type: null,
    kick_off_point: null,
    maximum_inclination: null,
    azimuth: null,
  });

  const wellType = [
    "DEALINATION",
    "WILDCAT",
    "INFILL",
    "PRODUCER",
    "INJECTION",
    "STEPOUT",
  ];

  const profileType = [
    { name: "VERTICAL", value: "VERTICAL" },
    { name: "DIRECTIONAL", value: "DIRECTIONAL" },
  ];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value; // Pastikan input numerik disimpan sebagai angka
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  useEffect(() => {
    onChange(formData); // Mengirim data ke parent setiap kali formData berubah
  }, [formData, onChange]);

  return (
    <VStack spacing={6} align="stretch" fontFamily="Montserrat">
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center">
          <Icon as={IconInfoCircle} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection="column">
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              Well Detail
            </Text>
            <Text fontSize="md" color="gray.600">
              Subtitle
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>UWI</FormLabel>
              <Input
                name="uwi"
                type="text"
                value={formData.uwi}
                onChange={handleChange}
                placeholder="UWI"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Well Name</FormLabel>
              <Input
                name="well_name"
                type="text"
                value={formData.well_name}
                onChange={handleChange}
                placeholder="Nama Sumur"
              />
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Alias Long Name</FormLabel>
              <Input
                name="alias_long_name"
                type="text"
                value={formData.alias_long_name}
                onChange={handleChange}
                placeholder="Nama Lengkap Sumur"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Well Type</FormLabel>
              <Select
                name="well_type"
                value={formData.well_type}
                onChange={handleChange}
                placeholder="Select Well Type"
              >
                {wellType.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Well Profile Type</FormLabel>
              <Select
                name="well_profile_type"
                value={formData.well_profile_type}
                onChange={handleChange}
                placeholder="Select Profile Type"
              >
                {profileType.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Environment Type</FormLabel>
              <Select
                name="environment_type"
                value={formData.environment_type}
                onChange={handleChange}
                placeholder="Select Environment Type"
              >
                <option value="SWAMP">SWAMP</option>
                <option value="MARINE">MARINE</option>
                <option value="LAND">LAND</option>
              </Select>
            </FormControl>
          </HStack>

          {/* Menambahkan Maximum Inclination dan Azimuth di form utama */}
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Maximum Inclination</FormLabel>
                <InputGroup>
                  <Input
                    name="maximum_inclination"
                    placeholder="Maximum inclination"
                    type="number"
                    value={formData.maximum_inclination}
                    onChange={handleChange}
                  />
                  <InputRightAddon>°</InputRightAddon>
                </InputGroup>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Azimuth</FormLabel>
                <InputGroup>
                  <Input
                    name="azimuth"
                    type="number"
                    placeholder="Azimuth"
                    value={formData.azimuth}
                    onChange={handleChange}
                  />
                  <InputRightAddon>°</InputRightAddon>
                </InputGroup>
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </Box>

      {/* Form tambahan jika Well Profile Type adalah "DIRECTIONAL" */}
      {formData.well_profile_type === "DIRECTIONAL" && (
        <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="md" bg="white">
          <VStack align="stretch" spacing={4}>
            <Flex alignItems="center">
              <Icon as={IconInfoCircle} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection="column">
                <Text fontSize="xl" fontWeight="bold" color="gray.700">
                  Directional Type
                </Text>
                <Text fontSize="md" color="gray.600">
                  *Required
                </Text>
              </Flex>
            </Flex>

            <FormControl>
              <FormLabel>Directional Type</FormLabel>
              <Select
                name="well_directional_type"
                value={formData.well_directional_type}
                onChange={handleChange}
                placeholder="Select Directional Type"
              >
                <option value="J-TYPE">J-TYPE</option>
                <option value="S-TYPE">S-TYPE</option>
                <option value="HORIZONTAL">HORIZONTAL</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Kick Off Point</FormLabel>
              <InputGroup>
                <Input
                  name="kick_off_point"
                  placeholder="Kick off point"
                  type="number"
                  value={formData.kick_off_point}
                  onChange={handleChange}
                />
                <InputRightAddon>m</InputRightAddon>
              </InputGroup>
            </FormControl>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default WellDetail;
