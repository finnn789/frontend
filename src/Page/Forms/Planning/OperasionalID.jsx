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
  Textarea,
  FormErrorMessage
} from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";
import { setDate } from "date-fns";

const ProposedJob = ({
  onData,
  children,
  handleChangeRigType,
  handleChangeJobPlan,
  TypeOperasional,
  errorForms
}) => {
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
  const WorkOverCategory = [
    { label: "Acid Fracturing", value: "Acid Fracturing" },
    { label: "Add Perforation", value: "Add Perforation" },
    {
      label: "Aditional Perfor & New Perfo",
      value: "Aditional Perfor & New Perfo",
    },
    { label: "CTG", value: "CTG" },
    { label: "CTI", value: "CTI" },
    { label: "CTO", value: "CTO" },
    { label: "Change Layer", value: "Change Layer" },
    {
      label: "Conversion from Injector to Producer",
      value: "Conversion from Injector to Producer",
    },
    { label: "Convert to Injector", value: "Convert to Injector" },
    { label: "ESP Installation", value: "ESP Installation" },
    { label: "Fract Pack", value: "Fract Pack" },
    { label: "Fracturing", value: "Fracturing" },
    { label: "GLV Installation", value: "GLV Installation" },
    { label: "GTO", value: "GTO" },
    { label: "HPU Installation", value: "HPU Installation" },
    { label: "Hydraulic Fracturing", value: "Hydraulic Fracturing" },
    { label: "Install ESP", value: "Install ESP" },
    { label: "Install HPU", value: "Install HPU" },
    { label: "New Perforation", value: "New Perforation" },
    { label: "New Zone Behind Pipe", value: "New Zone Behind Pipe" },
    { label: "P&A", value: "P&A" },
    { label: "PCTGL", value: "PCTGL" },
    { label: "POP", value: "POP" },
    { label: "Put On Production", value: "Put On Production" },
    {
      label: "Re-perforation & Acid Fracturing",
      value: "Re-perforation & Acid Fracturing",
    },
    { label: "Reactivation Well", value: "Reactivation Well" },
    {
      label: "Reactivation and Recompletion",
      value: "Reactivation and Recompletion",
    },
    { label: "Recompletion", value: "Recompletion" },
    {
      label: "Recompletion and Reperforation",
      value: "Recompletion and Reperforation",
    },
    { label: "Retubing", value: "Retubing" },
    { label: "SCON", value: "SCON" },
    { label: "SRP Installation", value: "SRP Installation" },
    {
      label: "Sand Cleanout - Add Perforation - Sand Screen",
      value: "Sand Cleanout - Add Perforation - Sand Screen",
    },
    {
      label: "Stimulation & Change Layer",
      value: "Stimulation & Change Layer",
    },
    { label: "Stimulation / Acidizing", value: "Stimulation / Acidizing" },
    { label: "Thru Tubing Perforation", value: "Thru Tubing Perforation" },
    {
      label: "Water Shut Off & Change Layer",
      value: "Water Shut Off & Change Layer",
    },
  ];

  const [formData, setFormData] = useState({
    area_id: "",
    field_id: "",
    contract_type: "",
    afe_number: "",
    wpb_year: null,
  });
  const [DateChange, setDateChange] = useState({
    start_date: null,
    end_date: null,
    rig_type: null,
    rig_name: null,
    rig_horse_power: 0,
    total_budget: 0,
    well_name: null,
  });

  // console.log(DateChange);

  // Send formData to parent component whenever formData changes
  useEffect(() => {
    onData(formData);
    handleChangeJobPlan(DateChange);
  }, [formData, DateChange]);

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

    handleChangeRigType({
      [name]: processedValue,
    });
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDateChange((prev) => ({
      ...prev,
      [name]: value,
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
          <FormControl isInvalid={!!errorForms["area_id"]}>
            <FormLabel>Area</FormLabel>
            <Select name="area_id" onChange={handleChange}>
              <option value="" disabled selected> Select Area</option>
              {areaId.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
            {errorForms["area_id"] && <FormErrorMessage>Area ID is required</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errorForms["field_id"]}>
            <FormLabel>Field</FormLabel>
            <Select name="field_id" onChange={handleChange}>
              <option value="" disabled selected>
                Select Field
              </option>
              {fieldId.map((item) => (
                <option value={item.value}>{item.name}</option>
              ))}
            </Select>
            {errorForms["field_id"] && <FormErrorMessage>Field ID is required</FormErrorMessage>}
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["contract_type"]}>
            <FormLabel>Contract Type</FormLabel>
            <Select
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
            >
              <option value="" disabled selected>Select Contract Type</option>
              <option value="COST-RECOVERY">COST-RECOVERY</option>
              <option value="GROSS-SPLIT">GROSS-SPLIT</option>
            </Select>
            {errorForms["contract_type"] && (
              <FormErrorMessage>Contract Type is required</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errorForms["afe_number"]}>
            <FormLabel>AFE Number</FormLabel>
            <Input
              name="afe_number"
              value={formData.afe_number}
              onChange={handleChange}
              placeholder="AFE Number"
            />
            {errorForms["afe_number"] && (
              <FormErrorMessage>AFE Number is required</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["wpb_year"]}>
            <FormLabel>WPNB Year</FormLabel>
            <InputGroup>
              <Input
                name="wpb_year"
                type="number"
                
                onChange={handleChange}
                placeholder="WPNB Year"
              />
              
            </InputGroup>
            {errorForms["wpb_year"] && (
              <FormErrorMessage>WPNB Year is required</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
      </VStack>
      <Divider my={10} borderWidth="1px" borderColor={"gray.200"} />

      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <FormControl isInvalid={!!errorForms["job_plan.start_date"]}>
            <FormLabel>Start Date</FormLabel>
            <Input
              name="start_date"
              type="date"
              value={DateChange.start_date}
              onChange={handleDateChange}
              placeholder="Start Date"
            />
            {errorForms["job_plan.start_date"] && (
              <FormErrorMessage>Start Date is required</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errorForms["job_plan.end_date"]}>
            <FormLabel>End Date</FormLabel>
            <Input
              name="end_date"
              type="date"
              min={DateChange.start_date}
              value={DateChange.end_date}
              disabled={DateChange.start_date ? false : true}
              onChange={handleDateChange}
              placeholder="End Date"
            />
            {errorForms["job_plan.end_date"] && (
              <FormErrorMessage>End Date is required</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        {TypeOperasional === "WORKOVER" || TypeOperasional === "WELLSERVICE" ? (
          <>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>
                  {(TypeOperasional === "WORKOVER" && "Workover Job Type") ||
                    (TypeOperasional === "WELLSERVICE" &&
                      "Well Service Job Type")}
                </FormLabel>
                <Select
                  name="job_category"
                  value={DateChange.job_category}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      job_category: e.target.value,
                    }));
                  }}
                >
                  <option value="Select Work Over Job Tyoe" disabled></option>
                  {WorkOverCategory.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Job Description</FormLabel>
                <Textarea
                  name="job_description"
                  type="text"
                  value={DateChange.job_description}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      job_description: e.target.value,
                    }));
                  }}
                  placeholder="Job Description"
                />
              </FormControl>
            </VStack>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Equipment</FormLabel>
                <Input
                  name="equipment"
                  type="text"
                  value={DateChange.equipment}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      equipment: e.target.value,
                    }));
                  }}
                  placeholder="Equipment"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Equipment Spesification</FormLabel>
                <Input
                  name="equipment_sepesifications"
                  type="text"
                  value={DateChange.equipment_sepesifications}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      equipment_sepesifications: e.target.value,
                    }));
                  }}
                  placeholder="Equipment Spesification"
                />
              </FormControl>
            </HStack>
          </>
        ) : (
          <>
            <HStack spacing={4}>
              <FormControl isInvalid={!!errorForms["job_plan.rig_type"]}>
                <FormLabel>Rig Type</FormLabel>
                <Select
                  name="rig_type"
                  value={DateChange.rig_type}
                  placeholder="Select Rig Type"
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      rig_type: e.target.value,
                    }));
                  }}
                >
                  
                  {rigType.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                  </Select>
                {errorForms["job_plan.rig_type"] && (
                  <FormErrorMessage>Rig Type is required</FormErrorMessage> 
                )}
              </FormControl>
              <FormControl isInvalid={!!errorForms["job_plan.rig_name"]}>
                <FormLabel>Rig Name</FormLabel>
                <Input
                  name="rig_name"
                  type="text"
                  value={DateChange.rig_name}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      rig_name: e.target.value,
                    }));
                  }}
                  placeholder="Rig Name"
                  />
                {errorForms["job_plan.rig_name"] && (
                  <FormErrorMessage>Rig Name is required</FormErrorMessage>
                )}
              </FormControl>
            </HStack>
            <HStack spacing={4}>
              <FormControl isInvalid={!!errorForms["job_plan.rig_horse_power"]}>
                <FormLabel>Rig Horse Power</FormLabel>
                <InputGroup>
                  <Input
                    name="rig_horse_power"
                    type="number"
                    value={DateChange.rig_horse_power}
                    onChange={(e) => {
                      setDateChange((prev) => ({
                        ...prev,
                        rig_horse_power: parseInt(e.target.value),
                      }));
                    }}
                    placeholder="Rig Horse Power"
                  />
                  <InputRightAddon>HP</InputRightAddon>
                  </InputGroup>
                {errorForms["job_plan.rig_horse_power"] && (
                  <FormErrorMessage>Rig Horse Power is required</FormErrorMessage>
                )}
              </FormControl>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProposedJob;
