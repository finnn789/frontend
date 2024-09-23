import React, { useState, useRef, useEffect } from "react";
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
  Flex,
  Select,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { IconGraph } from "@tabler/icons-react";
import axios from "axios";

const WellPorePressureForm = ({ handleDataSubmit = () => {} }) => {
  const [formData, setFormData] = useState({
    file_id: "",
    data_format: "IMAGE", // Default value
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
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // This will run whenever formData changes and call handleDataSubmit with the latest formData
  useEffect(() => {
    handleDataSubmit(formData);
  }, [formData, handleDataSubmit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current.files[0]) {
      toast({
        title: "Gagal",
        description: "Pilih file terlebih dahulu",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const file = fileInputRef.current.files[0];
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        const fileId = response.data.data.file_info.id;

        toast({
          title: "Berhasil",
          description: "File berhasil diupload",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Update file_id after successful upload
        setFormData((prevData) => ({
          ...prevData,
          file_id: fileId,
        }));
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
      w={"100%"}
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
        <HStack spacing={4}>
          <FormControl width={"50%"}>
            <Flex justifyContent={"space-between"}>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt,.csv,.xlsx"
                hidden
              />
            </Flex>
            {fileName && (
              <Text bg={"blue.100"} fontSize={"xl"} mt={2}>
                Name File: {fileName}
              </Text>
            )}
          </FormControl>
          <Box gap={4} display={"flex"} flexDirection={"row"} w={"50%"}>
            <Select
              placeholder="Select Format"
              name="data_format"
              value={formData.data_format}
              onChange={handleInputChange}
              isRequired
            >
              <option value="IMAGE">IMAGE</option>
              <option value="PDF">PDF</option>
              <option value="PLAIN TEXT">PLAIN TEXT</option>
            </Select>
            <Button
              onClick={() => fileInputRef.current.click()}
              colorScheme="blue"
              width={"100%"}
            >
              Choose File
            </Button>

            <Button type="submit" colorScheme="blue" width="100%">
              Upload
            </Button>
          </Box>
        </HStack>
      </form>
    </Box>
  );
};

export default WellPorePressureForm;
