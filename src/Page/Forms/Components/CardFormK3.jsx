import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";
import React from "react";

const HoriontalStack = ({ children }) => {
  return (
    <VStack spacing={4} align="stretch" mt={5}>
      {children}
    </VStack>
  );
};

const CardFormK3 = ({
  children,
  title = "Title",
  subtitle = "subtitle",
  icon = IconBriefcase,
  ...props
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Flex alignItems="center">
        {icon && <Icon as={icon} boxSize={12} color="gray.800" mr={3} />}
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
            {title}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {subtitle}
          </Text>
        </Flex>
      </Flex>
      <VStack spacing={4} align="stretch" mt={5}>
        {children}
      </VStack>
    </Box>
  );
};

CardFormK3.HoriontalStack = HoriontalStack;

export default CardFormK3;
