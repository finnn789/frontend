import React, { useCallback } from "react";
import {
  FormControl as ChakraFormControl,
  FormLabel,
  Input,
  InputGroup,
  FormErrorMessage,
  Flex,
  InputRightAddon,
  Textarea,
} from "@chakra-ui/react";

const FormControlCard = ({
  labelForm = "title label Form",
  name,
  placeholder = "placeholder",
  value,
  type,
  handleChange,
  alignInput = "Vertical",
  inputRightOn = null,
  isTextArea = false,
  isDisabled = false,
  isInvalid = false,  // New prop for error state
  errorMessage = "",  // New prop for error message
  ...props
}) => {
  // Memoize the handleChange function to avoid unnecessary renders
  const memoizedHandleChange = useCallback(
    (event) => {
      handleChange(event);
    },
    [handleChange]
  );

  // Function to render the correct input type based on isTextArea prop
  const renderInput = () => {
    if (isTextArea) {
      return (
        <Textarea
          name={name}
          value={value}
          onChange={memoizedHandleChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isInvalid={isInvalid}  // Apply error state to Textarea
          {...props}
        />
      );
    } else {
      return (
        <Input
          name={name}
          type={type}
          value={value}
          onChange={memoizedHandleChange}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isInvalid={isInvalid}  // Apply error state to Input
          {...props}
        />
      );
    }
  };

  return (
    <ChakraFormControl isInvalid={isInvalid}>
      {alignInput === "Horizontal" ? (
        <Flex alignItems="center" gap={0}>
          <FormLabel minWidth="120px" m={0}>
            {labelForm}
          </FormLabel>
          <InputGroup flex="1">
            {renderInput()}
            {inputRightOn && <InputRightAddon>{inputRightOn}</InputRightAddon>}
          </InputGroup>
        </Flex>
      ) : (
        <>
          <FormLabel>{labelForm}</FormLabel>
          <InputGroup>
            {renderInput()}
            {inputRightOn && <InputRightAddon>{inputRightOn}</InputRightAddon>}
          </InputGroup>
        </>
      )}
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </ChakraFormControl>
  );
};

export default FormControlCard;
