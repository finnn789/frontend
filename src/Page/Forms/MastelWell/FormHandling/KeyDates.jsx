import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IconCalendarDue } from "@tabler/icons-react";

const KeyDates = ({ handleChange, errorForms }) => {
  // State lokal untuk menyimpan nilai input sebelum dikirim ke parent
  const [localValues, setLocalValues] = useState({
    spud_date: null,
    final_drill_date: null,
    completion_date: null,
  });

  // Fungsi untuk menangani perubahan input dan mengubah state lokal
  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Setiap kali state lokal berubah, kirimkan ke parent melalui handleChange
  useEffect(() => {
    handleChange(localValues);
  }, [localValues, handleChange]);

  return (
    <VStack spacing={6} align="stretch" fontFamily={"Montserrat"} mt={5}>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center">
          <Icon as={IconCalendarDue} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              {"Key Dates"}
            </Text>
            <Text fontSize="md" color="gray.600">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <HStack spacing={4}>
            <FormControl isInvalid={!!errorForms["spud_date"]}>
              <FormLabel>Spud Date</FormLabel>
              <Input
                name="spud_date"
                type="date"
                placeholder="Spud Date"
                value={localValues.spud_date}
                onChange={handleLocalChange}
              />
              {errorForms["spud_date"] && (
                <FormErrorMessage>Spud Date is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errorForms["final_drill_date"]}>
              <FormLabel>Final Drill Date</FormLabel>
              <Input
                name="final_drill_date"
                type="date"
                value={localValues.final_drill_date}
                onChange={handleLocalChange}
                placeholder="Final Drill Date"
              />
              {errorForms["final_drill_date"] && (
                <FormErrorMessage>Final Drill Date is required</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl isInvalid={!!errorForms["completion_date"]}>
              <FormLabel>Completion Date</FormLabel>
              <Input
                type="date"
                value={localValues.completion_date}
                name="completion_date"
                placeholder="Completion Date"
                onChange={handleLocalChange}
              />
              {errorForms["completion_date"] && (
                <FormErrorMessage>Completion Date is required</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default KeyDates;
