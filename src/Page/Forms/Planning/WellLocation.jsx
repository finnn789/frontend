import React, { useState } from "react";
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

const WellLocation = ({ handleChange ,errorForms }) => {
  // State lokal untuk menangani input sebelum diformat dan dikirim ke parent
  const [localValues, setLocalValues] = useState({
    surface_longitude: '',
    surface_latitude: '',
    bottom_hole_longitude: '',
    bottom_hole_latitude: '',
  });

  // Fungsi untuk menangani perubahan input
  const handleLocalChange = (e) => {
    const { name, value } = e.target;

    // Konversi value menjadi string untuk memastikan operasi string dapat dilakukan
    let formattedValue = String(value).replace(/[^0-9.]/g, ''); // Hanya izinkan angka dan titik desimal

    // Mencegah lebih dari satu titik desimal
    const parts = formattedValue.split('.');
    if (parts.length > 2) {
      formattedValue = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Batasi angka desimal menjadi maksimal 6 angka di belakang koma
    if (parts[1] && parts[1].length > 6) {
      formattedValue = `${parts[0]}.${parts[1].substring(0, 6)}`;
    }

    // Update state lokal
    setLocalValues((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Kirim nilai yang sudah diformat ke parent sebagai float
    handleChange({
      target: {
        name,
        value: formattedValue !== '' ? parseFloat(formattedValue) : '', // Pastikan tipe float
        type: 'number',
      },
    });
  };

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
                  type="text"
                  value={localValues.surface_longitude}
                  onChange={handleLocalChange} // Gunakan handleLocalChange untuk menangani input
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.surface_longitude"] && <FormErrorMessage>Surface longitude is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.surface_latitude"]}>
              <FormLabel>Surface Latitude</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="surface_latitude"
                  placeholder="Surface latitude"
                  value={localValues.surface_latitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.surface_latitude"] && <FormErrorMessage>Surface latitude is required</FormErrorMessage>}
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
                  type="text"
                  value={localValues.bottom_hole_longitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.bottom_hole_longitude"] && <FormErrorMessage>Bottom hole longitude is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isInvalid={!!errorForms["job_plan.well.bottom_hole_latitude"]}>
              <FormLabel>Bottom Hole Latitude</FormLabel>
              <InputGroup>
                <Input
                  name="bottom_hole_latitude"
                  placeholder="Bottom hole latitude"
                  type="text"
                  value={localValues.bottom_hole_latitude}
                  onChange={handleLocalChange}
                />
                <InputRightAddon>°</InputRightAddon>
              </InputGroup>
              {errorForms["job_plan.well.bottom_hole_latitude"] && <FormErrorMessage>Bottom hole latitude is required</FormErrorMessage>}
            </FormControl>
          </GridItem>
        </Grid>
      </VStack>
    </Box>
  );
};

export default WellLocation;
