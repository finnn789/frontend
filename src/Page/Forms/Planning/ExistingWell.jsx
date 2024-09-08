import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { all } from "axios";

const ExistingWell = ({ onSubmit }) => {
  const allWells = [
    {
      id: 1,
      name: "Well 1",
      value: "Well 1",
    },
    {
      id: 2,
      name: "Well 2",
      value: "Well 2",
    },
    {
      id: 3,
      name: "Well 3",
      value: "Well 3",
    },
    {
      id: 4,
      name: "Well 4",
      value: "Well 4",
    },
  ];
  const [formData, setFormData] = useState({
    onstream_oil: 0,
    onstream_gas: 0,
    onstream_water_cut: 0,
    target_oil: 0,
    target_gas: 0,
    target_water_cut: 0,
  });

  useEffect(() => {
    onSubmit(formData);
  }, [formData]);
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

          <Select
            name="well_id"
            value={formData.well_id}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                well_id: e.target.value,
              }))
            }
          >
            {allWells.map((well) => (
              <option key={well.id} value={well.value}>
                {well.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Onstream Oil</FormLabel>
            <Input
              name="onstream_oil"
              value={formData.onstream_oil}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  onstream_oil: parseInt(e.target.value),
                }));
              }}
              placeholder="Onstream Oil"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Onstream Gas</FormLabel>
            <Input
              name="onstream_gas"
              value={formData.onstream_gas}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  onstream_gas: parseInt(e.target.value),
                }));
              }}
              placeholder="Onstream Gas"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Onstream Water Cut</FormLabel>
            <Input
              name="onstream_water_cut"
              value={formData.onstream_water_cut}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  onstream_water_cut: parseInt(e.target.value),
                }));
              }}
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
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  target_oil: parseInt(e.target.value),
                }));
              }}
              placeholder="Target Oil"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Target Gas</FormLabel>
            <Input
              name="target_gas"
              value={formData.target_gas}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  target_gas: parseInt(e.target.value),
                }));
              }}
              placeholder="Target Gas"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Target Water Cut</FormLabel>
            <Input
              name="target_water_cut"
              value={formData.target_water_cut}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  target_water_cut: parseInt(e.target.value),
                }));
              }}
              placeholder="Target Water Cut"
            />
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ExistingWell;
