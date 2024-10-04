import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  VStack,
  Flex,
  Text,
  Icon,
  FormErrorMessage,
  GridItem,
} from "@chakra-ui/react";
import { IconDropCircle } from "@tabler/icons-react";

const WellLocation = ({ handleChange, errorForms }) => {
  // State lokal untuk menangani input sebelum diformat dan dikirim ke parent
  const [localValues, setLocalValues] = useState({
    surface_longitude: null,
    surface_latitude: null,
    bottom_hole_longitude: null,
    bottom_hole_latitude: null,
  });

  // Fungsi untuk menangani perubahan input
  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // Izinkan angka, titik desimal, dan tanda minus di awal
    let formattedValue = String(value).replace(/[^0-9.-]/g, ''); // Izinkan angka, minus, dan titik

    // Pastikan minus hanya ada di awal
    if (formattedValue.includes('-') && formattedValue[0] !== '-') {
      formattedValue = formattedValue.replace(/-/g, '');
    }

    // Mencegah lebih dari satu titik desimal
    const parts = formattedValue.split('.');
    if (parts.length > 2) {
      formattedValue = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Batasi angka desimal menjadi maksimal 6 angka di belakang koma
    if (parts[1] && parts[1].length > 6) {
      formattedValue = `${parts[0]}.${parts[1].substring(0, 6)}`;
    }

    // Mengonversi nilai yang diformat menjadi angka (integer atau float)
    const numericValue = formattedValue !== '' ? parseFloat(formattedValue) : null;

    // Update state lokal dengan nilai numerik
    setLocalValues((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // Kirim data ke parent setiap kali localValues berubah
  useEffect(() => {
    handleChange(localValues); // Kirim state lokal yang sudah berupa angka ke parent
  }, [localValues, handleChange]);

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} mt={4} fontFamily={"Montserrat"}>
      <VStack align="stretch" spacing={4}>
        <Flex alignItems="center">
          <Icon as={IconDropCircle} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
              {"Well Location"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.surface_longitude"]}>
              <FormLabel>Surface Longitude</FormLabel>
              <InputGroup>
                <Input
                  name="surface_longitude"
                  placeholder="Surface longitude"
                  type="number"
                  value={localValues.surface_longitude}
                  onChange={handleLocalChange} // Gunakan handleLocalChange untuk menangani input
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.surface_longitude"] && (
                <FormErrorMessage>Surface longitude is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.surface_latitude"]}>
              <FormLabel>Surface Latitude</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  name="surface_latitude"
                  placeholder="Surface latitude"
                  value={localValues.surface_latitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.surface_latitude"] && (
                <FormErrorMessage>Surface latitude is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.bottom_hole_longitude"]}>
              <FormLabel>Bottom Hole Longitude</FormLabel>
              <InputGroup>
                <Input
                  name="bottom_hole_longitude"
                  placeholder="Bottom hole longitude"
                  type="number"
                  value={localValues.bottom_hole_longitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.bottom_hole_longitude"] && (
                <FormErrorMessage>Bottom hole longitude is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.bottom_hole_latitude"]}>
              <FormLabel>Bottom Hole Latitude</FormLabel>
              <InputGroup>
                <Input
                  name="bottom_hole_latitude"
                  placeholder="Bottom hole latitude"
                  type="number"
                  value={localValues.bottom_hole_latitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.bottom_hole_latitude"] && (
                <FormErrorMessage>Bottom hole latitude is required</FormErrorMessage>
              )}
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default WellLocation;
