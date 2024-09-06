import React, { useState, useCallback } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";

const ExistingWell = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    onstream_oil: 0,
    onstream_gas: 0,
    onstream_water_cut: 0,
    target_oil: 0,
    target_gas: 0,
    target_water_cut: 0,
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const newData = { ...prevData, [name]: value };
        onSubmit(newData); // Kirim data ke parent component setiap kali ada perubahan
        return newData;
      });
    },
    [formData]
  );

  return (
    <Box as="form" borderWidth="1px" borderRadius="lg" p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel fontWeight="bold">Existing Well</FormLabel>
          <Input
            name="wellName"
            value={formData.wellName}
            onChange={handleChange}
            placeholder="Well Name"
          />
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Onstream Oil</FormLabel>
            <Input
              name="onstream_oil"
              value={formData.onstream_oil}
              onChange={handleChange}
              placeholder="Onstream Oil"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Onstream Gas</FormLabel>
            <Input
              name="onstream_gas"
              value={formData.onstream_gas}
              onChange={handleChange}
              placeholder="Onstream Gas"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Onstream Water Cut</FormLabel>
            <Input
              name="onstream_water_cut"
              value={formData.onstream_water_cut}
              onChange={handleChange}
              placeholder="Onstream Water Cut"
            />
          </FormControl>
        </HStack>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Target Oil</FormLabel>
            <Input
              name="target_oil"
              value={formData.target_oil}
              onChange={handleChange}
              placeholder="Target Oil"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Target Gas</FormLabel>
            <Input
              name="target_gas"
              value={formData.target_gas}
              onChange={handleChange}
              placeholder="Target Gas"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Target Water Cut</FormLabel>
            <Input
              name="target_water_cut"
              value={formData.target_water_cut}
              onChange={handleChange}
              placeholder="Target Water Cut"
            />
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ExistingWell;
