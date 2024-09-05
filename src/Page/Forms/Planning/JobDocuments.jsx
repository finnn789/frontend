import React, { useState, useRef, useEffect } from "react";
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
} from "@chakra-ui/react";

const JobDocuments = ({ data }) => {
  const [onData, setOnData] = useState([]);
  const [formData, setFormData] = useState({
    file_id: "",
    document_type: "DRILLING_PLAN",
    remark: "",
  });
  
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    data(onData);
  }, [onData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFormData(prevState => ({
      ...prevState,
      file_id: selectedFile?.name || ""
    }));
  };

  const handleAdd = () => {
    if (formData.document_type && file) {
      const newDocument = {
        ...formData,
        file: file // Include the file object itself
      };
      setOnData(prevData => {
        const updatedData = [...prevData, newDocument];
        // data(updatedData); // Call the data prop function with the updated data
        return updatedData;
      });
      setFormData({
        file_id: "",
        document_type: "DRILLING_PLAN",
        remark: "",
      });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Flex gap={6}>
      <Card width="50%">
        <CardHeader>
          <Heading size="md">Job Documents</Heading>
        </CardHeader>
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
                <option value="WELL_TRAJECTORY_PLAN">Well Trajectory Plan</option>
                <option value="RISK_ASSESSMENT_PLAN">Risk Assessment Plan</option>
                <option value="SAFETY_PLAN">Safety Plan</option>
                <option value="ENVIRONMENTAL_PLAN">Environmental Plan</option>
                <option value="LOGGING_PLAN">Logging Plan</option>
                <option value="PORE_PRESSURE_PREDICTION">Pore Pressure Prediction</option>
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
            <Button colorScheme="blue" onClick={handleAdd}>
              Add
            </Button>
          </VStack>
        </CardBody>
      </Card>
      <Card width="50%">
        <CardHeader>
          <Heading size="md">Table</Heading>
        </CardHeader>
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
              {onData.map((doc, index) => (
                <Tr key={index}>
                  <Td>{doc.document_type}</Td>
                  <Td>{doc.file_id}</Td>
                  <Td>{doc.remark}</Td>
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