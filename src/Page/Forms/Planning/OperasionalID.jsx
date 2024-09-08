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
} from "@chakra-ui/react";
import { IconBriefcase } from "@tabler/icons-react";
import { setDate } from "date-fns";

const ProposedJob = ({
  onData,
  children,
  handleChangeRigType,
  handleChangeJobPlan,
  TypeOperasional,
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
  const WorkOverCategory = [
    {
      name: "ACID FACTURING",
      value: "Acid Fracturing",
    },
    {
      name: "CATEGORY2",
      value: "CATEGORY2",
    },
    {
      name: "CATEGORY 3",
      value: "CATEGORY 3",
    },
    {
      name: "CATEGORY 4",
      value: "CATEGORY 4",
    },
    {
      name: "CATEGORY 5",
      value: "CATEGORY 5",
    },
  ];
  const [formData, setFormData] = useState({
    area_id: "",
    field_id: "",
    contract_type: "COST-RECOVERY",
    afe_number: "",
    wpb_year: null,
  });
  const [DateChange, setDateChange] = useState({
    total_budget: 0,
    rig_name: null,
    rig_type: null,
    rig_horse_power: 0,
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
              value={DateChange.start_date}
              onChange={handleDateChange}
              placeholder="Start Date"
            />
          </FormControl>
          <FormControl>
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
          </FormControl>
        </HStack>
        {TypeOperasional === "WORKOVER" ? (
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
                      {item.name}
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
              <FormControl>
                <FormLabel>Rig Type</FormLabel>
                <Select
                  name="rig_type"
                  value={DateChange.rig_type}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      rig_type: e.target.value,
                    }));
                  }}
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
                  value={DateChange.rig_name}
                  onChange={(e) => {
                    setDateChange((prev) => ({
                      ...prev,
                      rig_name: e.target.value,
                    }));
                  }}
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
                    value={DateChange.rig_horse_power}
                    onChange={(e) => {
                      setDateChange((prev) => ({
                        ...prev,
                        rig_horse_power: parseInt(e.target.value),
                      }));
                    }}
                    placeholder="Rig Horse Power"
                  />
                  <InputRightAddon>METERS</InputRightAddon>
                </InputGroup>
              </FormControl>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProposedJob;
