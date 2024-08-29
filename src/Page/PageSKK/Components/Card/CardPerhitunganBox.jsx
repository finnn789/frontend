import React from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

const PerhitunganCard = ({
  number,
  label,
  subLabel,
  icon = FaFileAlt,
  bgIcon = "blue.100",
  iconColor = "blue.500",
  percentage,
}) => {
  return (
    <Box bg="white" boxShadow="md" borderRadius="2xl" p={4} width={"100%"}>
      <Flex alignItems="center" mb={2} gap={5}>
        <Flex borderRadius="full" bg={bgIcon} p={4} mr={2}>
          <Icon as={icon} boxSize={10} color={iconColor} />
        </Flex>
        <Flex flexDirection={"column"}>
          <Text
            fontSize="4rem"
            color={"gray.600"}
            fontWeight="bold"
            lineHeight="1"
          >
            {number}
          </Text>
          <Text fontSize="xl" fontWeight="medium" color="gray.700">
          {label}

          </Text>
        </Flex>
      </Flex>
      <Flex gap={5}>
        {percentage}
        <Text fontSize="xl" color="gray.500">
          {subLabel}
        </Text>
      </Flex>
    </Box>
  );
};

export default PerhitunganCard;
