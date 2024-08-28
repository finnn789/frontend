import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

import { FaRegClock } from "react-icons/fa";

const HeaderCard = ({children, title ,subtitle, icon}) => {
  return (
    <Box bg="gray.100" p={4} borderRadius="md" boxShadow="sm">
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={icon} w={12} h={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              {title}
            </Text>
            <Text fontSize="md" color="gray.600">
              {subtitle}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {children}
    </Box>
  );
};

export default HeaderCard;
