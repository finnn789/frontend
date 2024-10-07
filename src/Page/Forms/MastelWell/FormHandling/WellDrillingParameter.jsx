import React, { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Icon,
  Grid,
  GridItem,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IconFile, IconTrash } from "@tabler/icons-react";
import axios from "axios";

const WellDrillingParameter = ({ onParameterChange }) => {
  const [file, setFile] = useState(null); // State untuk menyimpan file yang dipilih
  const [uploadedFile, setUploadedFile] = useState(null); // State untuk menyimpan file_id dari respons API

  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Hanya mengambil file pertama
    setFile(selectedFile);
  };

  // Fungsi untuk menghapus file yang belum di-upload
  const handleRemoveFile = () => {
    setFile(null);
  };

  // Fungsi untuk menghapus file yang sudah di-upload
  const handleRemoveUploadedFile = () => {
    setUploadedFile(null);
    onParameterChange(null); // Menghapus file dari parent component state
  };

  // Fungsi untuk meng-handle upload file
  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    const url = `${import.meta.env.VITE_APP_URL}/utils/upload/file`;
    const formData = new FormData();
    formData.append("file", file); // Tambahkan file ke dalam formData

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        const uploadedFileInfo = {
          file_id: response.data.data.file_info.id,
        };

        setUploadedFile(uploadedFileInfo); // Set file yang telah di-upload
        onParameterChange(uploadedFileInfo); // Kirim file yang di-upload ke parent component
        setFile(null); // Reset input file setelah upload berhasil
      } else {
        console.error("File upload failed with response:", response);
      }
    } catch (error) {
      console.error("File upload failed. Error details:", error.response?.data || error.message || error);
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} fontFamily={"Montserrat"}>
      <GridItem>
        <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Flex alignItems="center" flexDirection={"row"}>
              <Icon as={IconFile} boxSize={12} color="gray.800" mr={3} />
              <Flex flexDirection="column">
                <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                  Well Drilling Parameters
                </Text>
                <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                  Upload Well Drilling Parameters
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <VStack spacing={4} align="stretch">
            {/* Input untuk memilih file */}
            <FormControl>
              <FormLabel>Select Parameter File</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>

            {/* Menampilkan file yang dipilih */}
            {file && (
              <Box borderWidth="1px" borderRadius="md" p={4}>
                <Text fontWeight="bold" mb={2}>Selected File:</Text>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>{file.name}</Text>
                  <IconButton
                    icon={<Icon as={IconTrash} />}
                    colorScheme="red"
                    size="sm"
                    onClick={handleRemoveFile}
                    aria-label="Remove file"
                  />
                </Flex>
              </Box>
            )}

            {/* Tombol untuk upload file */}
            <Flex justifyContent="flex-end">
              <Button colorScheme="blue" onClick={handleUpload} isDisabled={!file}>
                Upload Parameter
              </Button>
            </Flex>
          </VStack>
        </Box>
      </GridItem>

      {/* Menampilkan file yang sudah di-upload */}
      {uploadedFile && (
        <GridItem>
          <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
            <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat" mb={4}>
              Uploaded Parameter
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>{uploadedFile.filename}</Text>
              <IconButton
                icon={<Icon as={IconTrash} />}
                colorScheme="red"
                size="sm"
                onClick={handleRemoveUploadedFile}
                aria-label="Remove uploaded parameter"
              />
            </Flex>
          </Box>
        </GridItem>
      )}
    </Grid>
  );
};

export default WellDrillingParameter;
