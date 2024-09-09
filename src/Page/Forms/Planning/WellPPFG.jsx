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
  InputRightAddon,
  InputGroup,
  Flex,
  Select,
  Icon,
} from "@chakra-ui/react";

import { IconGraph } from "@tabler/icons-react";
import axios from "axios";

const WellPorePressureForm = ({handleDataSubmit}) => {
  const [formData, setFormData] = useState({
    file_id: "",
    data_format: "IMAGE",
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
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  React.useEffect(() => {
    handleDataSubmit(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,

          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Berhasil",
          description: "File berhasil diupload",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        setFormData((prevData) => ({
          ...prevData,
          file_id: response.data.file_info.id,
        }))
      } else {
        toast({
          title: "Gagal",
          description: "Gagal mengupload file",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // console.error(error);
      toast({
        title: "Gagal",
        description: "Gagal mengupload file",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      margin="auto"
      mt={6}
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      fontFamily={"Montserrat"}
    >
      <Flex alignItems="center" mb={6}>
        <Icon as={IconGraph} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
            {"Well Pore Pressure & Fracture Gradient"}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {"WPPFG"}
          </Text>
        </Flex>
      </Flex>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <Flex justifyContent={"space-between"}>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.csv,.xlsx"
                hidden
              />
              <Flex flexDir={"row"} gap={2}>
                <Select placeholder="Select Format"  name="data_format" onChange={handleInputChange} isRequired>
                  <option value="IMAGE">IMAGE</option>
                  <option value="CSV">CSV</option>
                  <option value="XLSX">XLSX</option>
                </Select>
                <Button
                  onClick={() => fileInputRef.current.click()}
                  colorScheme="blue"
                  width={"100%"}
                >
                  Choose File
                </Button>
              </Flex>
            </Flex>
            {fileName && <Text bg={"blue.100"} fontSize={"xl"}  mt={2}>Name File: {fileName}</Text>}
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Upload
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default WellPorePressureForm;
