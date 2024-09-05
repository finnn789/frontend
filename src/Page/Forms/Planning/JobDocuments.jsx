import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  VStack,
  Select,
  useToast,
  Text,
  Icon,
} from "@chakra-ui/react";
import { IconTable,  IconFiles } from "@tabler/icons-react";
const JobDocuments = ({ data }) => {
  const [onChangeData, setOnChangeData] = useState([]);

  React.useEffect(() => {
    data(onChangeData);
  }, [onChangeData]);
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file_id: "",
    document_type: "DRILLING_PLAN",
    remark: "",
    fileName: "",
  });
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (allowedTypes.includes(file.type)) {
        setFiles(file);
        setFormData((prevData) => ({
          ...prevData,
          fileName: file.name,
        }));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or Excel file.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        event.target.value = null;
      }
    }
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!files) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    const formFile = new FormData();
    formFile.append("file", files);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        formFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const newData = {
        ...formData,
        file_id: response.data.file_info.id,
        fileName: response.data.file_info.filename,
      };

      setOnChangeData([...onChangeData, newData]);

      setFormData({
        file_id: "",
        document_type: "DRILLING_PLAN",
        remark: "",
        fileName: "",
      });

      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast({
        title: "File uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.response?.data || error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex gap={6}>
      <Card width="50%">
        <Flex alignItems="center" mb={6}>
          <Icon as={IconFiles} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Job Documents"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Document Type</FormLabel>
              <Select
                name="document_type"
                value={formData.document_type}
                onChange={handleInputChange}
              >
                <option value="DRILLING_PLAN">Drilling Plan</option>
                <option value="COMPLETION_PLAN">Completion Plan</option>
                <option value="WELL_DESIGN">Well Design</option>
                <option value="MUD_PLAN">Mud Plan</option>
                <option value="CEMENTING_PLAN">Cementing Plan</option>
                <option value="WELL_TRAJECTORY_PLAN">
                  Well Trajectory Plan
                </option>
                <option value="RISK_ASSESSMENT_PLAN">
                  Risk Assessment Plan
                </option>
                <option value="SAFETY_PLAN">Safety Plan</option>
                <option value="ENVIRONMENTAL_PLAN">Environmental Plan</option>
                <option value="LOGGING_PLAN">Logging Plan</option>
                <option value="PORE_PRESSURE_PREDICTION">
                  Pore Pressure Prediction
                </option>
                <option value="HYDRAULICS_PLAN">Hydraulics Plan</option>
                <option value="CASING_PLAN">Casing Plan</option>
                <option value="CONTINGENCY_PLAN">Contingency Plan</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                onChange={handleFileChange}
                accept=".csv, .xls, .xlsx"
                ref={fileInputRef}
              />
              {formData.fileName && (
                <Text mt={2} fontSize="sm">
                  Selected file: {formData.fileName}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Remarks</FormLabel>
              <Textarea
                name="remark"
                placeholder="Enter remarks"
                value={formData.remark}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={handleAddClick}
              loadingText="Uploading..."
            >
              Add
            </Button>
          </VStack>
        </CardBody>
      </Card>
      <Card width="50%">
        <Flex alignItems="center" mb={6}>
          <Icon as={IconTable} boxSize={12} color="gray.800" mr={3} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.700"
              fontFamily="Montserrat"
            >
              {"Table"}
            </Text>
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
              {"subtitle"}
            </Text>
          </Flex>
        </Flex>
        <CardBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Document Type</Th>
                <Th>File Name</Th>
                <Th>Remarks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {onChangeData.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.document_type}</Td>
                  <Td>{row.fileName}</Td>
                  <Td>{row.remark}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default JobDocuments;
