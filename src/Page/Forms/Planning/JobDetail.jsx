import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
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
import { IconBriefcase } from "@tabler/icons-react";

const JobDetail = ({ handleChange, formData }) => {
  return (
    <VStack spacing={6} align="stretch" fontFamily={"Montserrat"}>
      <Box borderWidth="1px" borderRadius="lg" p={6} >
        <Flex alignItems="center">
          <Icon as={IconBriefcase} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Well Profile"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>UWI</FormLabel>
              <Input
                name="uwi"
                value={formData.uwi}
                onChange={handleChange}
                placeholder="UWI"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Well Name</FormLabel>
              <Input
                name="well_name"
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
              >
                <option value="" disabled>
                  Select Well Type
                </option>
                <option value="DELINEATION">DELINEATION</option>
                <option value="WILDCAT">WILDCAT</option>
                <option value="INFILL">INFILL</option>
                <option value="PRODUCER">PRODUCER</option>
                <option value="INJECTION">INJECTION</option>
                <option value="STEPOUT">STEPOUT</option>
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
              >
                <option value="">Select Profile Type</option>
                <option value="DIRECTIONAL">DIRECTIONAL</option>
                <option value="HORIZONTAL">HORIZONTAL</option>
                <option value="VERTICAL">VERTICAL</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Environment Type</FormLabel>
              <Select
                name="environment_type"
                value={formData.environment_type}
                onChange={handleChange}
              >
                <option value="">Select Environment Type</option>
                <option value="SWAMP">SWAMP</option>
                <option value="MARINE">MARINE</option>
                <option value="LAND">LAND</option>
              </Select>
            </FormControl>
          </HStack>
        </VStack>
      </Box>
      {formData.well_profile_type === "DIRECTIONAL" && (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="md"
          bg="white"
        >
          <VStack align="stretch" spacing={4}>
            <Heading size="md" display="flex" alignItems="center">
              <IconBriefcase style={{ marginRight: "0.5rem" }} />
              Directional
            </Heading>

            <FormControl>
              <FormLabel>Directional Type</FormLabel>
              <Select
                name="directionalType"
                value={formData.directionalType}
                onChange={handleChange}
              >
                <option value="">Select Directional Type</option>
                <option value="J-TYPE">J-TYPE</option>
                <option value="S-TYPE">S-TYPE</option>
                <option value="horizontal">Horizontal</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Kick Off Point</FormLabel>
              <InputGroup>
                <Input
                  name="kick_off_point"
                  placeholder="Kick off point"
                  onChange={handleChange}
                  type="number"
                  value={formData.kick_off_point}
                />
                <InputRightAddon>M</InputRightAddon>
              </InputGroup>
            </FormControl>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Maximum Inclination</FormLabel>
                  <InputGroup>
                    <Input
                      name="maximum_inclination"
                      placeholder="Maximum inclination"
                      onChange={handleChange}
                      type="number"
                      value={formData.maximum_inclination}
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
                      onChange={handleChange}
                      value={formData.azimuth}
                    />
                    <InputRightAddon>°</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>
          </VStack>
        </Box>
      )}
    </VStack>
  );
};

export default JobDetail;
