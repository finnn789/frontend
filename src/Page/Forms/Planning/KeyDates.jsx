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
} from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";
const KeyDates = ({ handleChange, formData }) => {
  return (
    <VStack spacing={6} align="stretch" fontFamily={"Montserrat"} mt={5}>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <Flex alignItems="center">
          <Icon as={IconBriefcase} boxSize={12} color="gray.800" mr={3} />
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
            <FormControl>
              <FormLabel>Spud Date</FormLabel>
              <Input name="spud_date" type="date" placeholder="Spud Date" />
            </FormControl>
            <FormControl>
              <FormLabel>Final Drill Date</FormLabel>
              <Input
                name="final_drill_date"
                type="date"
                placeholder="Final Drill Date"
              />
            </FormControl>
          </HStack>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Completion Date</FormLabel>
              <Input
                type="date"
                name="completion_date"
                placeholder="Completion Date"
              />
            </FormControl>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
};

export default KeyDates;
