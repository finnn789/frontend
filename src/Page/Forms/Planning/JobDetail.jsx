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
  FormErrorMessage,
} from "@chakra-ui/react";
import { IconBriefcase, IconInfoCircle } from "@tabler/icons-react";

const JobDetail = ({
  handleChange,
  formData,
  unittype,
  errorForms,
  wellType = [
    "DEALINATION",
    "WILDCAT",
    "INFILL",
    "PRODUCER",
    "INJECTION",
    "STEPOUT",
  ],
}) => {
  const profileType = [
    {
      name: "VERTICAL",
      value: "VERTICAL",
    },

    {
      name: "DIRECTIONAL",
      value: "DIRECTIONAL",
    },
  ];

  return (
    <VStack spacing={6} align="stretch" fontFamily={"Montserrat"}>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center">
          <Icon as={IconInfoCircle} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Well Detail"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <HStack spacing={4}>
            <FormControl isInvalid={!!errorForms["job_plan.well.uwi"]}>
              <FormLabel>UWI</FormLabel>
              <Input
                name="uwi"
                type="text"
                value={formData.uwi}
                onChange={handleChange}
                placeholder="UWI"
              />
              {errorForms["job_plan.well.uwi"] && (
                <FormErrorMessage>UWI is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errorForms["job_plan.well.well_name"]}>
              <FormLabel>Well Name</FormLabel>
              <Input
                name="well_name"
                type="text"
                value={formData.well_name}
                onChange={handleChange}
                placeholder="Nama Sumur"
              />
              {errorForms["job_plan.well.well_name"] && (
                <FormErrorMessage>Well Name is required</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl
              isInvalid={!!errorForms["job_plan.well.alias_long_name"]}
            >
              <FormLabel>Alias Long Name</FormLabel>
              <Input
                name="alias_long_name"
                type="text"
                value={formData.alias_long_name}
                onChange={handleChange}
                placeholder="Nama Lengkap Sumur"
              />
              {errorForms["job_plan.well.alias_long_name"] && (
                <FormErrorMessage>Alias Long Name is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errorForms["job_plan.well.well_type"]}>
              <FormLabel>Well Type</FormLabel>
              <Select
                name="well_type"
                type="text"
                value={formData.well_type}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Well Type
                </option>
                {wellType.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
              {errorForms["job_plan.well.well_type"] && (
                <FormErrorMessage>Well Type is required</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl
              isInvalid={!!errorForms["job_plan.well.well_profile_type"]}
            >
              <FormLabel>Well Profile Type</FormLabel>
              <Select
                name="well_profile_type"
                value={formData.well_profile_type}
                onChange={handleChange}
              >
                <option value="">Select Profile Type</option>
                {profileType.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </Select>
              {errorForms["job_plan.well.well_profile_type"] && (
                <FormErrorMessage>
                  Well Profile Type is required
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={!!errorForms["job_plan.well.environment_type"]}
            >
              <FormLabel>Environment Type</FormLabel>
              <Select
                name="environment_type"
                value={formData.environment_type}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Environment Type
                </option>
                <option value="SWAMP">SWAMP</option>
                <option value="MARINE">MARINE</option>
                <option value="LAND">LAND</option>
              </Select>
              {errorForms["job_plan.well.environment_type"] && (
                <FormErrorMessage>
                  Environment Type is required
                </FormErrorMessage>
              )}
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
            <Flex alignItems="center">
              <Icon as={IconInfoCircle} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection={"column"}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.700"
                  fontFamily="Montserrat"
                >
                  {"Directional Type"}
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  {"*Required"}
                </Text>
              </Flex>
            </Flex>

            <FormControl fontSize={"lg"}>
              <FormLabel>Directional Type</FormLabel>
              <Select
                name="well_directional_type"
                value={formData.well_directional_type}
                onChange={handleChange}
              >
                <option value="">Select Directional Type</option>
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
                  onChange={handleChange}
                  type="number"
                  value={formData.kick_off_point}
                />
                <InputRightAddon>m</InputRightAddon>
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
