import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  Text,
  Icon,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { getAreaID, GetFieldID } from "../../../API/APIKKKS";

const WellGeneralInfo = ({ handleChange, errorForms }) => {
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const [areaID, setAreaID] = useState([]);
  const [fieldID, setFieldID] = useState([]);
  const [formData, setFormData] = useState({
    hydrocarbon_target: "OIL", // Default value set to "OIL"
    line_name: "",
    depth_datum: "RT", // Default value set to "RT"
    well_status: "Active", // Default value set to "Active"
    remark: "",
    area_id: "",
    field_id: "",
    kkks_id: `${userID}`,
    well_schematic: {
      file_id: null,
    },
    well_ppfg: {
      file_id: null,
    },
  });
  const [wellSchematicFile, setWellSchematicFile] = useState(null);
  const [wellPPFGFile, setWellPPFGFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    handleChange(formData);
  }, [formData, handleChange]);

  useEffect(() => {
    const GetAreaID = async () => {
      try {
        const response = await getAreaID();
        setAreaID(response);
      } catch (error) {
        console.error("Error get Area ID", error);
      }
    };
    const getFieldID = async () => {
      try {
        const response = await GetFieldID();
        setFieldID(response);
      } catch (error) {
        console.error("Error get Field ID", error);
      }
    };
    getFieldID();
    GetAreaID();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setFileState) => {
    const file = e.target.files[0];
    setFileState(file);
  };

  const uploadFile = async (file, fieldName) => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const fileId = response.data.data.file_info.id;
        setFormData((prev) => ({
          ...prev,
          [fieldName]: { file_id: fileId },
        }));

        toast({
          title: "File uploaded",
          description: `File for ${fieldName} uploaded successfully.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("File upload failed:", error);
      toast({
        title: "Upload Error",
        description: "Failed to upload file. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // "Input should be 'Active', 'Suspended', 'Abandoned', 'Temporary P&A' or 'P&A'"

const selectWellStatus = [
  "Active",
  "Suspended",
  "Abandoned",
  "Temporary P&A",
  "P&A",
]

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} fontFamily={"Montserrat"}>
      <VStack spacing={4} align="stretch">
        {/* Area ID and Field ID */}
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["area_id"]}>
            <FormLabel>Area ID</FormLabel>
            <Select
              name="area_id"
              value={formData.area_id}
              onChange={handleInputChange}
              placeholder="Select Area"
            >
              {areaID.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errorForms["field_id"]}>
            <FormLabel>Field ID</FormLabel>
            <Select
              name="field_id"
              value={formData.field_id}
              onChange={handleInputChange}
              placeholder="Select Field"
            >
              {fieldID.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        {/* Hydrocarbon Target and Line Name */}
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["hydrocarbon_target"]}>
            <FormLabel>Hydrocarbon Target</FormLabel>
            <Select
              name="hydrocarbon_target"
              value={formData.hydrocarbon_target}
              onChange={handleInputChange}
              placeholder="Select Hydrocarbon Target"
            >
              <option value="OIL">OIL</option>
              <option value="GAS">GAS</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errorForms["line_name"]}>
            <FormLabel>Line Name</FormLabel>
            <Input
              name="line_name"
              value={formData.line_name}
              onChange={handleInputChange}
              placeholder="Line Name"
            />
          </FormControl>
        </HStack>

        {/* Depth Datum and Well Status */}
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["depth_datum"]}>
            <FormLabel>Depth Datum</FormLabel>
            <Select name="depth_datum" value={formData.depth_datum} onChange={handleInputChange}>
              <option value="" disabled>
                Select Depth Datum
              </option>
              <option value="RT">RT</option>
              <option value="KB">KB</option>
              <option value="MSL">MSL</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={!!errorForms["well_status"]}>
            <FormLabel>Well Status</FormLabel>
            <Select
              name="well_status"
              value={formData.well_status}
              onChange={handleInputChange}
              placeholder="Select Well Status"
            >
              {selectWellStatus.map((item) => (
                <option key={item} value={item}>{item}</option>  
              ))}
            </Select>
          </FormControl>
        </HStack>

        {/* Remark */}
        <FormControl isInvalid={!!errorForms["remark"]}>
          <FormLabel>Remark</FormLabel>
          <Textarea
            name="remark"
            value={formData.remark}
            onChange={handleInputChange}
            placeholder="Remark"
          />
        </FormControl>

        {/* Upload Well Schematic and Well PPFG */}
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Upload Well Schematic</FormLabel>
            <InputGroup>
              <Input type="file" onChange={(e) => handleFileChange(e, setWellSchematicFile)} />
              <Button
                onClick={() => uploadFile(wellSchematicFile, "well_schematic")}
                leftIcon={<Icon as={IconUpload} />}
                colorScheme="blue"
              >
                Upload
              </Button>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Upload Well PPFG</FormLabel>
            <InputGroup>
              <Input type="file" onChange={(e) => handleFileChange(e, setWellPPFGFile)} />
              <Button
                onClick={() => uploadFile(wellPPFGFile, "well_ppfg")}
                leftIcon={<Icon as={IconUpload} />}
                colorScheme="blue"
              >
                Upload
              </Button>
            </InputGroup>
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WellGeneralInfo;
