import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Divider,
  InputRightAddon,
  InputGroup,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";

const ProposedJob = ({ onData, children }) => {
  const areaId = [
    {
      name: "AREA 2",
      value: "AREA 2",
    },
    {
      name: "AREA 3",
      value: "AREA 3",
    },
    {
      name: "AREA 4",
      value: "AREA 4",
    },
    {
      name: "AREA 5",
      value: "AREA 5",
    },
    {
      name: "AREA 6",
      value: "AREA 6",
    },
  ];
  const rigType = [
    {
      name: "GROSS-SPLIT",
      value: "GROSS-SPLIT",
    },
    {
      name: "FLOATER",
      value: "FLOATER",
    },
    {
      name: "SEMI-SUBMERSIBLE",
      value: "SEMI-SUBMERSIBLE",
    },
    {
      name: "DRILLSHIP",
      value: "DRILLSHIP",
    },
  ];

  const fieldId = [
    {
      name: "FIELD 1",
      value: "FIELD 1",
    },
    {
      name: "FIELD 2",
      value: "FIELD 2",
    },
    {
      name: "FIELD 3",
      value: "FIELD 3",
    },
    {
      name: "FIELD 4",
      value: "FIELD 4",
    },
    {
      name: "FIELD 5",
      value: "FIELD 5",
    },
  ];
  const [formData, setFormData] = useState({
    area_id: "",
    field_id: "",
    contract_type: "COST-RECOVERY",
    afe_number: "",
    wpb_year: null,
    job_plan: {
      start_date: "",
      end_date: "",
      total_budget: 0,
      rig_name: null,
      rig_type: null,
      rig_horse_power: 0,
    },
  });

  // Send formData to parent component whenever formData changes
  useEffect(() => {
    onData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let processedValue;

    // Periksa tipe input
    if (type === "number") {
      // Jika input tipe number, periksa apakah ada titik desimal untuk menentukan apakah itu float
      processedValue = value.includes(".")
        ? parseFloat(value)
        : parseInt(value, 10);

      // Jika value tidak valid atau kosong, default ke 0
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    } else {
      // Jika tipe selain number, anggap sebagai string
      processedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };
// console.log(formData);

  const handleRig = (e) => {
    const { name, value, type } = e.target;

    let processedValue;

    // Periksa tipe input
    if (type === "number") {
      // Jika input tipe number, periksa apakah ada titik desimal untuk menentukan apakah itu float
      processedValue = value.includes(".")
        ? parseFloat(value)
        : parseInt(value, 10);

      // Jika value tidak valid atau kosong, default ke 0
      if (isNaN(processedValue)) {
        processedValue = 0;
      }
    } else {
      // Jika tipe selain number, anggap sebagai string
      processedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      job_plan: {
        ...prev.job_plan,
        [name]: processedValue,
      },
    }));
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      job_plan: {
        ...prev.job_plan,
        [name]: value,
      },
    }));
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} fontFamily={"Montserrat"}>
      <Flex alignItems="center" mb={6}>
        <Icon as={IconBriefcase} boxSize={12} color="gray.800" mr={3} />
        <Flex flexDirection={"column"}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.700"
            fontFamily="Montserrat"
          >
            {"Proposed Job"}
          </Text>
          <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
            {"subtitle"}
          </Text>
        </Flex>
      </Flex>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Area</FormLabel>
            <Select name="area_id" onChange={handleChange}>
              
              {areaId.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Field</FormLabel>
            <Select name="field_id" onChange={handleChange}>
              <option value="Select Field" disabled>
                Select Are
              </option>
              {fieldId.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Contract Type</FormLabel>
            <Select
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
            >
              <option value="COST-RECOVERY">COST-RECOVERY</option>
              <option value="GROSS-SPLIT">GROSS-SPLIT</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>AFE Number</FormLabel>
            <Input
              name="afe_number"
              value={formData.afe_number}
              onChange={handleChange}
              placeholder="AFE Number"
            />
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>WPB Year</FormLabel>
            <InputGroup>
              <Input
                name="wpb_year"
                type="number"
                value={formData.wpb_year}
                onChange={handleChange}
                placeholder="WPB Year"
              />
              <InputRightAddon>METERS</InputRightAddon>
            </InputGroup>
          </FormControl>
        </HStack>
      </VStack>
      <Divider my={10} borderWidth="1px" borderColor={"gray.200"} />

      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input
              name="start_date"
              type="date"
              value={formData.job_plan.start_date}
              onChange={handleDateChange}
              placeholder="Start Date"
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input
              name="end_date"
              type="date"
              min={formData.job_plan.start_date}
              value={formData.job_plan.end_date}
              disabled={formData.job_plan.start_date ? false : true}
              onChange={handleDateChange}
              placeholder="End Date"
            />
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Rig Type</FormLabel>
            <Select
              name="rig_type"
              value={formData.job_plan.rig_type}
              onChange={handleRig}
            >
              <option value="Select Rig Type" disabled></option>
              {rigType.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Rig Name</FormLabel>
            <Input
              name="rig_name"
              type="text"
              value={formData.job_plan.rig_name}
              onChange={handleRig}
              placeholder="Rig Name"
            />
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>Rig Horse Power</FormLabel>
            <InputGroup>
              <Input
                name="rig_horse_power"
                type="number"
                value={formData.job_plan.rig_horse_power}
                onChange={handleRig}
                placeholder="Rig Horse Power"
              />
              <InputRightAddon>METERS</InputRightAddon>
            </InputGroup>
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProposedJob;
