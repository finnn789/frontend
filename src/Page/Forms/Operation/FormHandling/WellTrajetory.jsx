import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  Text,
  SimpleGrid,
  Flex,
  Icon,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { IconRoute2 } from "@tabler/icons-react";
import Plot from "react-plotly.js";

const WellTrajectory = ({ data, onChange, errorForms = {} }) => {
  const datas = data?.data;
  const toast = useToast();
  const fileInputRef = useRef(null);

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
  const [dataParent, setDataParent] = useState({
    file_id: null,
    data_format: null,
  });

  // Mengisi form ketika menerima data dari parent
  useEffect(() => {
    if (datas?.job_plan?.well?.well_trajectory) {
      setDataParent({
        file_id: datas.job_plan.well.well_trajectory?.file_id || "",
        data_format: datas.job_plan.well.well_trajectory?.data_format || "",
      });
      setFileType(datas.job_plan.well.well_trajectory?.data_format || "");
    }
  }, [datas]);

  // Mengupdate state di parent ketika dataParent berubah
  useEffect(() => {
    if (dataParent) {
      onChange("job_plan.well.well_trajectory", dataParent);
    }
  }, [dataParent, onChange]);

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
    setDataParent((prev) => ({
      ...prev,
      data_format: e.target.value,
    }));
  };

  const handleFileChange = useCallback(async (e) => {
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
        setCsvData({
          fileinfo: response.data.data.fileinfo,
          plot: {
            data: response.data.data.plot.data,
            layout: response.data.data.plot.layout,
          },
        });

        toast({
          title: "File read successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setDataParent({
          file_id: response.data.data.fileinfo.id,
          data_format: fileType,
        });
      } catch (error) {
        console.error("Error reading file:", error);
        toast({
          title: "Error reading file",
          description: error.response?.data?.message || "Header File Tidak Cocok",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [fileType, toast]);

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

      setDataParent({
        file_id: response.data.data.file_info.id,
        data_format: fileType,
      });

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
        <SimpleGrid columns={3} spacing={4} mt={5}>
          <Box>
            <FormControl
              isRequired
              isInvalid={!!errorForms["job_plan.well.well_trajectory?.file_id"]}
            >
              <FormLabel>Upload File</FormLabel>
              <Input
                hidden
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              />
              {errorForms["job_plan.well.well_trajectory?.file_id"] && (
                <FormErrorMessage>File is required</FormErrorMessage>
              )}
            </FormControl>
            {file && <Text>Selected file: {file.name}</Text>}
          </Box>
          <Flex width={"full"} justifyContent={"end"} alignItems={"end"}>
            <Button
              colorScheme="blue"
              onClick={() => fileInputRef.current.click()}
            >
              Choose File
            </Button>
          </Flex>

          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"end"}
            gap={4}
          >
            <FormControl
              isRequired
              isInvalid={
                !!errorForms["job_plan.well.well_trajectory?.data_format"]
              }
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
              {errorForms["job_plan.well.well_trajectory?.data_format"] && (
                <FormErrorMessage>File Type is required</FormErrorMessage>
              )}
            </FormControl>
            <Button w={"full"} type="submit" colorScheme="blue">
              Upload
            </Button>
          </Box>
        </SimpleGrid>
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
