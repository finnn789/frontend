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
const KeyDates = ({ handleChange, formData, errorForms }) => {

  
  return (
    <VStack spacing={6} align="stretch" fontFamily={"Montserrat"} mt={5}>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center">
          <Icon as={IconCalendarDue} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Key Dates"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <HStack spacing={4}>
            <FormControl isInvalid={!!errorForms["job_plan.well.spud_date"]}>
              <FormLabel>Spud Date</FormLabel>
              <Input name="spud_date" type="date" placeholder="Spud Date" value={formData.spud_date} onChange={handleChange} />
              {errorForms["job_plan.well.spud_date"] && <FormErrorMessage>Rotary Table Elevation is required</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errorForms["job_plan.well.final_drill_date"]}>
              <FormLabel>Final Drill Date</FormLabel>
              <Input
                name="final_drill_date"
                type="date"
                value={formData.final_drill_date}
                onChange={handleChange}
                placeholder="Final Drill Date"
              />
              {errorForms["job_plan.well.final_drill_date"] && <FormErrorMessage>Final Drill Date is required</FormErrorMessage>}
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl isInvalid={!!errorForms["job_plan.well.completion_date"]}>
              <FormLabel>Completion Date</FormLabel>
              <Input
                type="date"
                value={formData.completion_date}
                name="completion_date"
                placeholder="Completion Date"
                onChange={handleChange}
              />
              {errorForms["job_plan.well.completion_date"] && <FormErrorMessage>Completion Date is required</FormErrorMessage>}
            </FormControl>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default KeyDates;
