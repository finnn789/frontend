import React from "react";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  Heading,
    GridItem,
  Flex,
    Text,
  Icon
} from "@chakra-ui/react";
import { IconDropCircle } from "@tabler/icons-react"; // Import Tabler Icons

const WellLocation = ({ handleChange }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mt={4} fontFamily={"Montserrat"}>
      <VStack align="stretch" spacing={4}>
      <Flex alignItems="center">
        <Icon as={IconDropCircle} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
            {"Well Location"}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {"subtitle"}
          </Text>
        </Flex>
      </Flex>
        

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Surface Longitude</FormLabel>
              <InputGroup>
                <Input
                  name="surface_longitude"
                  placeholder="Surface longitude"
                  type="number"
                  onChange={handleChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Surface Latitude</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  name="surface_latitude"
                  placeholder="Surface latitude"
                  onChange={handleChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl>
              <FormLabel>Bottom Hole Longitude</FormLabel>
              <InputGroup>
                <Input
                  name="bottom_hole_longitude"
                  placeholder="bottom hole longitude"
                  onChange={handleChange}
                  type="number"
                />

                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Bottom Hole Latitude</FormLabel>
              <InputGroup>
                <Input
                  name="bottom_hole_latitude"
                  placeholder="bottom hole latitude"
                  onChange={handleChange}
                  type="number"
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default WellLocation;
