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
  FormErrorMessage
} from "@chakra-ui/react";
import { IconRuler2 } from "@tabler/icons-react"; // Import Tabler Icons

const ElevationsAndDepths = ({ handleChange ,unittype, errorForms}) => {
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
            <FormControl isInvalid={!!errorForms["job_plan.well.rotary_table_elev"]}>
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
              {errorForms["job_plan.well.rotary_table_elev"] && <FormErrorMessage>Rotary Table Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.kb_elev"]}>
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
              {errorForms["job_plan.well.kb_elev"] && <FormErrorMessage>Kelly Bushing Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>

        {/* Derrick Floor Elevation and Ground Elevation */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.derrick_floor_elev"]}>
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
              {errorForms["job_plan.well.derrick_floor_elev"] && <FormErrorMessage>Derrick Floor Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.ground_elev"]}>
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
              {errorForms["job_plan.well.ground_elev"] && <FormErrorMessage>Ground Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>

        {/* Mean Sea Level */}
        <FormControl isInvalid={!!errorForms["job_plan.well.mean_sea_level"]}>
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
          {errorForms["job_plan.well.mean_sea_level"] && <FormErrorMessage>Mean Sea Level is required</FormErrorMessage>}
        </FormControl>

        {/* Final MD and Maximum TVD */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.final_md"]}>
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
              {errorForms["job_plan.well.final_md"] && <FormErrorMessage>Final MD is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.maximum_tvd"]}>
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
              {errorForms["job_plan.well.maximum_tvd"] && <FormErrorMessage>Maximum TVD is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default ElevationsAndDepths;
