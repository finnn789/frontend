import React from "react";
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
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
} from "@chakra-ui/react";
import { IconLayersSubtract } from "@tabler/icons-react";
const Stratigraphy = ({
  setWellStratigraphy,
  WellStratigraphy,
  handleInputChangeWellStraigraphy,
  handleWellStratichy,
  TablewellStratigraphy,
  errorForms,
}) => {
  const selectType = [
    {
      name: "RT",
      value: "RT",
    },
    {
      name: "KB",
      value: "KB",
    },
    {
      name: "MSL",
      value: "MSL",
    },
  ];
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={3}
      mt={7}
      fontFamily={"Montserrat"}
    >
      <GridItem colSpan={1} height={"100%"}>
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Flex alignItems="center">
              <Icon
                as={IconLayersSubtract}
                boxSize={12}
                color="gray.800"
                mr={3}
              />
              <Flex flexDirection="column">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.700"
                  fontFamily="Montserrat"
                >
                  Stratigraphy
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  subtitle
                </Text>
              </Flex>
            </Flex>
            <Select
              width={"auto"}
              onChange={(e) =>
                setWellStratigraphy({
                  ...WellStratigraphy,
                  depth_datum: e.target.value,
                })
              }
            >
              {selectType.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Flex>
          <VStack spacing={4} align="stretch">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem gap={2} colSpan={2}>
                <FormControl>
                  <FormLabel>Stratigraphy</FormLabel>
                  <Select
                    name="stratigraphy_id"
                    value={WellStratigraphy.stratigraphy_id}
                    onChange={handleInputChangeWellStraigraphy}
                    placeholder="Stratigraphy"
                  >
                    <option value="LITHOSTRATIGRAPHIC">
                      LITHOSTRATIGRAPHIC
                    </option>
                    <option value="CHRONOSTRATIGRAPHIC">
                      CHRONOSTRATIGRAPHIC
                    </option>
                    <option value="OTHER">OTHER</option>
                    <option value="RADIOMETRIC">RADIOMETRIC</option>
                    <option value="BIOSTRATIGRAPHIC">BIOSTRATIGRAPHIC</option>
                  </Select>
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Bottom Depth</FormLabel>
                  <InputGroup>
                    <Input
                      name="depth"
                      type="number"
                      value={WellStratigraphy.depth}
                      onChange={handleInputChangeWellStraigraphy}
                      placeholder="Depth"
                    />
                    <InputRightAddon>123</InputRightAddon>
                  </InputGroup>
                </FormControl>
              </GridItem>
            </Grid>
            <Button colorScheme="blue" onClick={handleWellStratichy}>
              Add
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem height={"100%"}>
        <Box borderWidth="1px" height={"325px"} borderRadius="lg" p={6}>
          {TablewellStratigraphy.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Depth</Th>
                  <Th>Hole Diameter</Th>

                  {/* Tambahkan header lain sesuai kebutuhan */}
                </Tr>
              </Thead>
              <Tbody>
                {TablewellStratigraphy.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.depth}</Td>
                    <Td>{row.stratigraphy_id}</Td>

                    {/* Tambahkan sel lain sesuai kebutuhan */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Flex
              justifyContent="center"
              flexDirection={"column"}
              alignItems="center"
              height="100%"
            >
              <Heading fontFamily={"Montserrat"}>Tidak Ada Data</Heading>
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
