import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  VStack,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Select,
  InputGroup,
  InputRightAddon,
  Icon,
  Text,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import {
  IconFile,
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

const WellDocuments = ({ onDocumentChange }) => {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("");
  const [remark, setRemark] = useState("");
  const [tableDocuments, setTableDocuments] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const prevTableRef = useRef(); // Ref untuk menyimpan state sebelumnya

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    const url = `${import.meta.env.VITE_APP_URL}/utils/upload/file`;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const fileId = response?.data?.data?.file_info?.id;
      if (!fileId) {
        throw new Error("File ID not found in response");
      }

      const newDocument = {
        file_id: fileId,
        document_type: documentType,
        remark: remark,
      };

      const updatedTable = [...tableDocuments, newDocument];
      setTableDocuments(updatedTable);
      onDocumentChange(updatedTable);
      resetForm();
    } catch (error) {
      console.error(
        "File upload failed. Error details:",
        error.response?.data || error.message || error
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editIndex !== null) {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDeleteRow = (index) => {
    const updatedTable = tableDocuments.filter((_, i) => i !== index);
    setTableDocuments(updatedTable);
    onDocumentChange(updatedTable);
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setEditFormData(tableDocuments[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedTable = [...tableDocuments];
    updatedTable[index] = editFormData;
    setTableDocuments(updatedTable);
    setEditIndex(null);
    onDocumentChange(updatedTable);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const resetForm = () => {
    setFile(null);
    setDocumentType("");
    setRemark("");
  };

  // Periksa apakah `tableDocuments` berubah sebelum memanggil `onDocumentChange`
  useEffect(() => {
    if (
      JSON.stringify(tableDocuments) !== JSON.stringify(prevTableRef.current)
    ) {
      onDocumentChange(tableDocuments);
      prevTableRef.current = tableDocuments;
    }
  }, [tableDocuments, onDocumentChange]);

  const docType = [
    "Well Report",
    "Drilling Log",
    "Completion Report",
    "Wellbore Diagram",
    "Well Test Report",
    "Production Log",
    "Well Workover Report",
    "Wellhead Inspection",
    "Casing Report",
    "Cementing Report",
    "Pore Pressure Prediction",
    "Fracture Gradient Report",
    "Well Trajectory",
    "Logging Report",
    "Mud Logging Report",
    "Well Site Survey",
    "Geomechanical Report",
    "Reservoir Characterization",
    "Core Analysis Report",
    "Well Completion Summary",
    "Drilling Fluid Report",
    "Well Abandonment Report",
    "HSE Report",
  ];

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      mt={4}
      fontFamily={"Montserrat"}
    >
      <Box borderWidth="1px" borderRadius="lg" p={6} height="100%">
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Flex alignItems="center" flexDirection={"row"}>
            <Icon as={IconFile} boxSize={12} color="gray.800" mr={3} />
            <Flex flexDirection="column">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.700"
                fontFamily="Montserrat"
              >
                Well Documents
              </Text>
              <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                Upload and Manage Well Documents
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <VStack spacing={4} align="stretch">
          <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
            <FormControl>
              <FormLabel>Document Type</FormLabel>
              <Select
                name="document_type"
                value={
                  editIndex !== null ? editFormData.document_type : documentType
                }
                onChange={(e) =>
                  editIndex !== null
                    ? setEditFormData({
                        ...editFormData,
                        document_type: e.target.value,
                      })
                    : setDocumentType(e.target.value)
                }
              >
                {docType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Remark</FormLabel>
              <Input
                name="remark"
                value={editIndex !== null ? editFormData.remark : remark}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditFormData({
                        ...editFormData,
                        remark: e.target.value,
                      })
                    : setRemark(e.target.value)
                }
                placeholder="Enter remark"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Upload Document</FormLabel>
              <Input
                type="file"
                onChange={handleFileChange}
                placeholder="Choose file"
                isDisabled={editIndex !== null}
              />
            </FormControl>
          </Grid>
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="blue"
              onClick={handleUpload}
              isDisabled={editIndex !== null}
            >
              {editIndex !== null ? "Editing..." : "Upload Document"}
            </Button>
          </Flex>
        </VStack>
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        height="100%"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Tabs display="flex" flexDirection="column" height="100%">
          <TabList position="sticky" top={0} bg="white" zIndex={1}>
            <Tab>Table</Tab>
          </TabList>
          <TabPanels flex={1} overflowY="auto">
            <TabPanel height="100%" p={0}>
              <Box overflowX="auto" height="100%">
                {tableDocuments.length > 0 ? (
                  <Table variant="simple">
                    <Thead position="sticky" top={0} bg="white" zIndex={1}>
                      <Tr>
                        <Th>Document Type</Th>
                        <Th>Remark</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableDocuments.map((row, index) => (
                        <Tr key={index}>
                          {editIndex === index ? (
                            <>
                              <Td>
                                <Select
                                  name="document_type"
                                  value={editFormData.document_type}
                                  onChange={handleInputChange}
                                >
                                  {docType.map((type, index) => (
                                    <option key={index} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </Select>
                              </Td>
                              <Td>
                                <Input
                                  name="remark"
                                  type="text"
                                  value={editFormData.remark}
                                  onChange={handleInputChange}
                                />
                              </Td>
                              <Td>
                                <HStack spacing={2}>
                                  <IconButton
                                    icon={<Icon as={IconCheck} />}
                                    colorScheme="green"
                                    size="sm"
                                    onClick={() => handleSaveEdit(index)}
                                    aria-label="Save"
                                  />
                                  <IconButton
                                    icon={<Icon as={IconX} />}
                                    colorScheme="red"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                    aria-label="Cancel"
                                  />
                                </HStack>
                              </Td>
                            </>
                          ) : (
                            <>
                              <Td>{row.document_type}</Td>
                              <Td>{row.remark}</Td>
                              <Td>
                                <HStack spacing={2}>
                                  <IconButton
                                    icon={<Icon as={IconEdit} />}
                                    colorScheme="blue"
                                    size="sm"
                                    onClick={() => handleEditRow(index)}
                                    aria-label="Edit row"
                                  />
                                  <IconButton
                                    icon={<Icon as={IconTrash} />}
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDeleteRow(index)}
                                    aria-label="Delete row"
                                  />
                                </HStack>
                              </Td>
                            </>
                          )}
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Flex
                    justifyContent="center"
                    flexDirection={"column"}
                    alignItems="center"
                    height="100%"
                  >
                    <Heading fontFamily={"Montserrat"}>
                      No Documents Available
                    </Heading>
                  </Flex>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

export default WellDocuments;
