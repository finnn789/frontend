import React, { useState } from "react";
import {
  Box,
  VStack,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  IconButton,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/react";
import axios from "axios";
import { IconFile, IconTrash } from "@tabler/icons-react";

const WellLogs = ({ onLogChange }) => {
  const [files, setFiles] = useState([]); // State untuk menyimpan file yang dipilih
  const [uploadedLogs, setUploadedLogs] = useState([]); // State untuk menyimpan file_id dari respons API

  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Ubah FileList menjadi array
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Gabungkan file baru dengan file yang sudah ada
  };

  // Fungsi untuk menghapus file yang belum di-upload
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // Fungsi untuk menghapus file yang sudah di-upload (berdasarkan file_id)
  const handleRemoveUploadedFile = (fileId) => {
    const updatedUploadedLogs = uploadedLogs.filter((log) => log.id !== fileId);
    setUploadedLogs(updatedUploadedLogs);
    onLogChange(updatedUploadedLogs); // Perbarui log di parent component setelah menghapus
  };

  // Fungsi untuk meng-handle upload file
  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected for upload.");
      return;
    }

    const url = `${import.meta.env.VITE_APP_URL}/utils/upload/files`;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // Tambahkan setiap file ke dalam formData

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        const uploadedFileData = response.data.data.files_info.map((file) => ({
          file_id: file.id,
        }));

        const updatedLogs = [...uploadedLogs, ...uploadedFileData];
        setUploadedLogs(updatedLogs);
        onLogChange(updatedLogs); // Perbarui log di parent component setelah upload berhasil
        setFiles([]); // Reset file setelah upload berhasil
      } else {
        console.error("File upload failed with response:", response);
      }
    } catch (error) {
      console.error("File upload failed. Error details:", error.response?.data || error.message || error);
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} fontFamily={"Montserrat"}>
          <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Flex alignItems="center" flexDirection={"row"}>
            <Icon as={IconFile} boxSize={12} color="gray.800" mr={3} />
            <Flex flexDirection="column">
              <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                Well logs
              </Text>
              <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                Upload and Manage Well Logs
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Select Logs</FormLabel>
            <Input type="file" onChange={handleFileChange} multiple />
          </FormControl>

          {files.length > 0 && (
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontWeight="bold" mb={2}>
                Selected Files:
              </Text>
              <List spacing={2}>
                {files.map((file, index) => (
                  <ListItem key={index}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text>{file.name}</Text>
                      <IconButton
                        icon={<Icon as={IconTrash} />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                        aria-label="Remove file"
                      />
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={handleUpload} isDisabled={files.length === 0}>
              Upload Logs
            </Button>
          </Flex>
        </VStack>
      </Box>

      {uploadedLogs.length > 0 && (
        <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
          <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat" mb={4}>
            Uploaded Logs
          </Text>
          <List spacing={4}>
            {uploadedLogs.map((log) => (
              <ListItem key={log.id} borderWidth="1px" borderRadius="md" p={4} display="flex" justifyContent="space-between" alignItems="center">
                <Text>{log.filename}</Text>
                <IconButton
                  icon={<Icon as={IconTrash} />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveUploadedFile(log.id)}
                  aria-label="Remove uploaded log"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Grid>
  );
};

export default WellLogs;
