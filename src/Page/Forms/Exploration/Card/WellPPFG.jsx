import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";

const WellPorePressureForm = () => {
  const [formData, setFormData] = useState({
    depth: "",
    temperature: "",
    porosity: "",
    fluidDensity: "",
  });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server or perform calculations
    console.log("Form submitted with data:", formData);
    console.log("File uploaded:", fileName);
    toast({
      title: "Form Submitted",
      description:
        "Your well pore pressure prediction data and file have been submitted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Reset form after submission
    setFormData({
      depth: "",
      temperature: "",
      porosity: "",
      fluidDensity: "",
    });
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Box margin="auto" mt={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Well Pore Pressure Prediction
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Depth (m)</FormLabel>
            <Input
              type="number"
              name="depth"
              value={formData.depth}
              onChange={handleInputChange}
              placeholder="Enter depth"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Temperature (°C)</FormLabel>
            <Input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              placeholder="Enter temperature"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Porosity (%)</FormLabel>
            <Input
              type="number"
              name="porosity"
              value={formData.porosity}
              onChange={handleInputChange}
              placeholder="Enter porosity"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Fluid Density (kg/m³)</FormLabel>
            <Input
              type="number"
              name="fluidDensity"
              value={formData.fluidDensity}
              onChange={handleInputChange}
              placeholder="Enter fluid density"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Upload File</FormLabel>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".txt,.csv,.xlsx"
            />
            {fileName && <Text mt={2}>File selected: {fileName}</Text>}
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default WellPorePressureForm;
