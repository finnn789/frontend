import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";
import React from "react";
import { Select } from "@chakra-ui/react";

const HoriontalStack = ({ children }) => {
  return (
    <VStack spacing={4} align="stretch" mt={5}>
      {children}
    </VStack>
  );
};

const SelectOptionRender = ({ options = [],handleChange }) => {
  if (options.length === 0) return null;

  return (
    <Select width="auto" onChange={(e) => handleChange(e.target.value)}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const CardFormK3 = ({
  children,
  title = "Title",
  subtitle = "subtitle",
  icon = IconBriefcase,
  padding = "18px",
  
  OptionDepth,
  OptionValue,
  ...props
}) => {

  const HandleOptionValue  = React.useCallback((value) => {
    OptionValue(value)
  },[OptionValue])
  
  const { color, colorTitle, bgColor, iconColor, colorSubtitle } = props;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={padding}
      bgColor={bgColor ? bgColor : "white"}
    >
      <Flex justifyContent={"space-between"}>
        <Flex alignItems="center">
          {icon && (
            <Icon
              as={icon}
              boxSize={12}
              color={iconColor ? iconColor : "gray.600"}
              mr={3}
            />
          )}

          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorTitle ? colorTitle : "gray.700"}
              fontFamily="Montserrat"
            >
              {title}
            </Text>
            <Text
              fontSize="md"
              color={colorSubtitle ? colorSubtitle : "gray.600"}
              fontFamily="Montserrat"
            >
              {subtitle}
            </Text>
          </Flex>
        </Flex>

        {OptionDepth && <SelectOptionRender options={OptionDepth} handleChange={HandleOptionValue} />}
      </Flex>

      <VStack spacing={4} align="stretch" mt={5}>
        {children}
      </VStack>
    </Box>
  );
};

CardFormK3.HoriontalStack = HoriontalStack;

export default CardFormK3;
