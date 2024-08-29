import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

const PerhitunganCard = ({ number, label, subLabel, icon = FaFileAlt,bgIcon="blue.100",iconColor="blue.500" }) => {
  return (
    <Box bg="white" boxShadow="md" borderRadius="2xl" p={4} width={"100%"}>
      <Flex alignItems="center" mb={2} gap={5}>
        <Flex  borderRadius="full" bg={bgIcon} p={4} mr={2}>
          <Icon as={icon} boxSize={10} color={iconColor}  />
        </Flex>
        <Flex flexDirection={"column"}>
          <Text fontSize="2rem" color={'gray.600'} fontWeight="bold" lineHeight="1">
            {number}
          </Text>
          {label}
          <Text fontSize="28px" fontWeight="medium" color="gray.700"></Text>
        </Flex>
      </Flex>

      <Text fontSize="xs" color="gray.500">
          {subLabel}
      </Text>
    </Box>
  );
};

export default PerhitunganCard;
