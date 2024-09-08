import {
  VStack,
  Text,
  Flex,
  Icon,
  Heading,
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";
import { IconRuler2 } from "@tabler/icons-react"; // Import Tabler Icons

const ElevationsAndDepths = ({ handleChange ,unittype}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      mt={4}
      bg="white"
      fontFamily={"Montserrat"}
    >
      <VStack align="stretch" spacing={4}>
        <Flex alignItems="center">
          <Icon as={IconRuler2} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Elevations and Depths"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        {/* Rotary Table Elevation and Kelly Bushing Elevation */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Rotary Table Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="rotary_table_elev"
                  type="number"
                  placeholder="rotary table elev"
                  onChange={handleChange}
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Kelly Bushing Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="kb_elev"
                  placeholder="kelly bushing elev"
                  onChange={handleChange}
                  type="number"
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Derrick Floor Elevation and Ground Elevation */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Derrick Floor Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="derrick_floor_elev"
                  placeholder="derrick floor elev"
                  type="number"
                  onChange={handleChange}
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Ground Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="ground_elev"
                  placeholder="ground elev"
                  type="number"
                  onChange={handleChange}
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        {/* Mean Sea Level */}
        <FormControl>
          <FormLabel>Mean Sea Level</FormLabel>
          <InputGroup>
            <Input
              name="mean_sea_level"
              placeholder="mean sea level"
              type="number"
              onChange={handleChange}
            />
            <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
          </InputGroup>
        </FormControl>

        {/* Final MD and Maximum TVD */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Final MD</FormLabel>
              <InputGroup>
                <Input
                  name="final_md"
                  type="number"
                  placeholder="final md"
                  onChange={handleChange}
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Maximum TVD</FormLabel>
              <InputGroup>
                <Input
                  name="maximum_tvd"
                  placeholder="maximum tvd"
                  onChange={handleChange}
                  type="number"
                />
                <InputRightAddon>{unittype === "Metrics" && "METER" || unittype === "Imperial" && "FEET"}</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default ElevationsAndDepths;
