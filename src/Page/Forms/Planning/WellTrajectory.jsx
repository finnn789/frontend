import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Heading,
  Flex,
  Icon,
  FormErrorMessage
} from "@chakra-ui/react";
import Papa from "papaparse"; // You'll need to install this: npm install papaparse
import axios from "axios";
import { IconRoute2 } from "@tabler/icons-react";
import Plot from "react-plotly.js";

const WellTrajectory = ({ ondata, errorForms }) => {
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [csvData, setCsvData] = useState({
    fileinfo: {},

    plot: {
      data: [],
      layout: null,
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();
  const [msg, setMsg] = React.useState("");
  const fileInputRef = React.useRef(null);
  const [dataParent, setDataParent] = React.useState({
    file_id: null,
    data_format: null,
  });

  React.useEffect(() => {
    ondata(dataParent);
  }, [dataParent]);

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };
  // console.log(csvData);

  const handleFileChange = useCallback(
    async (e) => {
      const selectedFile = e.target.files[0];
      setSelectedFile(selectedFile);
      if (selectedFile) {
        setFile(selectedFile);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_URL}/utils/upload/trajectory`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setCsvData((prevData) => ({
            ...prevData,
            fileinfo: response.data.data.fileinfo,
            plot: {
              data: response.data.data.plot.data,
              layout: response.data.data.plot.layout,
            },
          }));

          toast({
            title: "File read successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error("Error reading file:", error);
          toast({
            title: "Error reading file",
            description:
              error.response?.data?.message || "Header File Tidak Cocok",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
    [] // dependencies
  );

  const parseCsvFile = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Please select a file first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response);

      setDataParent({
        file_id: response.data.data.file_info.id,
        data_format: fileType,
      });

      setMsg(response.data.message);

      toast({
        title: "Berhasil Upload File",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "File Error to Upload",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      mt={6}
      padding={5}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      fontFamily={"Montserrat"}
    >
      <form onSubmit={handleSubmit}>
        <Flex alignItems="center">
          <Icon as={IconRoute2} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Trajectory"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch" mt={5}>
          <FormControl isRequired isInvalid={!!errorForms["job_plan.well.well_trajectory.data_format"]}
          >
            <FormLabel>File Type</FormLabel>
            <Select
              placeholder="Select file type"
              value={fileType}
              onChange={handleFileTypeChange}
            >
              <option value="PDF">PDF</option>
              <option value="IMAGE">IMAGE</option>
              <option value="PLAIN TEXT">PLAIN TEXT</option>
            </Select>
            {errorForms["job_plan.well.well_trajectory.data_format"] && <FormErrorMessage>File Type is required</FormErrorMessage>}
            
          </FormControl>

          <FormControl isRequired isInvalid={!!errorForms["job_plan.well.well_trajectory.file_id"]}>
            <FormLabel>Upload File</FormLabel>
            <Input
              hidden
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
            <Button onClick={() => fileInputRef.current.click()}>
              Upload File
            </Button>
            {errorForms["job_plan.well.well_trajectory.file_id"] && <FormErrorMessage>File is required</FormErrorMessage>}
          </FormControl>

          {file && <Text>Selected file: {file.name}</Text>}

          <Button type="submit" colorScheme="blue">
            Upload
          </Button>
        </VStack>
      </form>

      {csvData && csvData.plot.data.length > 0 && (
        <Plot
          data={csvData.plot.data || []}
          layout={csvData.plot.layout || {}}
        />
      )}
    </Box>
  );
};

export default WellTrajectory;
