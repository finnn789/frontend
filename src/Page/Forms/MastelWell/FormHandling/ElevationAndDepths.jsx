import React from "react";
import {
  VStack,
  Text,
  Flex,
  Icon,
  Box,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IconRuler2 } from "@tabler/icons-react";

const ElevationsAndDepths = ({ handleChange, unittype = "Metrics", errorForms = {} }) => {
  // Fungsi untuk menangani perubahan nilai input dan memanggil handleChange dengan nama dan nilai input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === "" ? 0 : parseFloat(value); // Konversi nilai menjadi angka, atau 0 jika kosong
    handleChange({ [name]: parsedValue }); // Kirimkan hanya nama dan nilai input sebagai number
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mt={4} bg="white" fontFamily={"Montserrat"}>
      <VStack align="stretch" spacing={4}>
        <Flex alignItems="center">
          <Icon as={IconRuler2} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
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
            <FormControl isInvalid={!!errorForms.rotary_table_elev}>
              <FormLabel>Rotary Table Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="rotary_table_elev"
                  type="number"
                  placeholder="Rotary table elev"
                  onChange={handleInputChange} // Panggil handleInputChange yang sudah diperbarui
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.rotary_table_elev && (
                <FormErrorMessage>Rotary Table Elevation is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms.kb_elev}>
              <FormLabel>Kelly Bushing Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="kb_elev"
                  placeholder="Kelly bushing elev"
                  onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
                  type="number"
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.kb_elev && <FormErrorMessage>Kelly Bushing Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>

        {/* Derrick Floor Elevation and Ground Elevation */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms.derrick_floor_elev}>
              <FormLabel>Derrick Floor Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="derrick_floor_elev"
                  placeholder="Derrick floor elev"
                  type="number"
                  onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.derrick_floor_elev && (
                <FormErrorMessage>Derrick Floor Elevation is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms.ground_elev}>
              <FormLabel>Ground Elevation</FormLabel>
              <InputGroup>
                <Input
                  name="ground_elev"
                  placeholder="Ground elev"
                  type="number"
                  onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.ground_elev && <FormErrorMessage>Ground Elevation is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>

        {/* Mean Sea Level */}
        <FormControl isInvalid={!!errorForms.mean_sea_level}>
          <FormLabel>Mean Sea Level</FormLabel>
          <InputGroup>
            <Input
              name="mean_sea_level"
              placeholder="Mean sea level"
              type="number"
              onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
            />
            <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
          </InputGroup>
          {errorForms.mean_sea_level && <FormErrorMessage>Mean Sea Level is required</FormErrorMessage>}
        </FormControl>

        {/* Final MD and Maximum TVD */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms.final_md}>
              <FormLabel>Final MD</FormLabel>
              <InputGroup>
                <Input
                  name="final_md"
                  type="number"
                  placeholder="Final MD"
                  onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.final_md && <FormErrorMessage>Final MD is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms.maximum_tvd}>
              <FormLabel>Maximum TVD</FormLabel>
              <InputGroup>
                <Input
                  name="maximum_tvd"
                  placeholder="Maximum TVD"
                  onChange={handleInputChange} // Gunakan handleInputChange yang sudah diperbarui
                  type="number"
                />
                <InputRightAddon>{unittype === "Metrics" ? "m" : "ft"}</InputRightAddon>
              </InputGroup>
              {errorForms.maximum_tvd && <FormErrorMessage>Maximum TVD is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default ElevationsAndDepths;
