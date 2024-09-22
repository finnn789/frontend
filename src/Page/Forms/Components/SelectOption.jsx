import React, { useCallback } from "react";
import {
  FormControl as ChakraFormControl,
  FormLabel,
  Select as ChakraSelect,
  Flex,
} from "@chakra-ui/react";

// Rename Option to SelectOption to avoid conflict with DOM API
const SelectOption = ({ value, label }) => {
  return <option value={value}>{label}</option>;
};

// Select Component
const SelectComponent = ({
  label = "Select Label",
  name,
  value,
  onChange,
  placeholder = "Select an option",
  align = "Vertical", // Determines if the layout is horizontal or vertical
  children,
  type,
  selected,
  ...props
}) => {
  // Memoize the onChange handler to avoid unnecessary re-renders
  const memoizedHandleChange = useCallback(
    (data) => {
      onChange(data);
    },
    [onChange]
  );

  return (
    <ChakraFormControl>
      {align === "Horizontal" ? (
        <Flex alignItems="center" gap={4}>
          <FormLabel width={"50%"} m={0}>
            {label}
          </FormLabel>
          <ChakraSelect
            name={name}
            value={value ? value : ""}
            onChange={memoizedHandleChange}
            flex="1"
            {...props}
          >
            <option disabled selected>
              {placeholder}
            </option>
            {children}
          </ChakraSelect>
        </Flex>
      ) : (
        <>
          <FormLabel>{label}</FormLabel>
          <ChakraSelect
            name={name}
            value={value ? value : ""}
            onChange={memoizedHandleChange}
            {...props}
          >
            <option disabled value="" selected>
              {placeholder}
            </option>
            {children}
          </ChakraSelect>
        </>
      )}
    </ChakraFormControl>
  );
};

export { SelectComponent, SelectOption };
