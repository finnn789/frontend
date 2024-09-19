import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
  Heading,
  Flex,
  useToast,
  Select,
} from "@chakra-ui/react";
import Operasional from "./Workover/Operasioal";
import TeknisForm from "./WellService/TeknisForms"; // Sesuaikan path sesuai dengan struktur folder Anda
import {PostWellService} from "../API/PostKkks"; // Sesuaikan path sesuai dengan struktur folder Anda

const PlanWellServiceForm = () => {
  const [jobPlan, setJobPlan] = useState({
    area_id: "string",
    field_id: "string",
    contract_type: "COST-RECOVERY",
    afe_number: "string",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-09-18",
      end_date: "2024-09-18",
      total_budget: 0,
      job_operation_days: [],
      work_breakdown_structure: [],
      job_hazards: [],
      job_documents: [],
      equipment: "string",
      equipment_sepesifications: "string",
      well_id: "string",
      job_category: "Acid Fracturing",
      job_description: "string",
      onstream_oil: 0,
      onstream_gas: 0,
      onstream_water_cut: 0,
      target_oil: 0,
      target_gas: 0,
      target_water_cut: 0,
    },
  });

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const validateForm = (formData, parentKey = "") => {
    let errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (value && typeof value === "object" && !Array.isArray(value)) {
        errors = { ...errors, ...validateForm(value, fullKey) };
      } else if (Array.isArray(value) && value.length === 0) {
        errors[fullKey] = `${fullKey.replace(/_/g, " ")} cannot be empty.`;
      } else if (!value || (typeof value === "string" && value.trim() === "")) {
        errors[fullKey] = `${fullKey.replace(/_/g, " ")} is required.`;
      }
    });

    return errors;
  };

  const PostDatanya = async () => {
    // const errors = validateForm(jobPlan);

    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   toast({
    //     title: "Terjadi kesalahan.",
    //     description: "Tolong isi semua field yang diperlukan.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   console.log("formErrors", errors)
    //   console.log("formErrors", formErrors)
    //   return;
    // }

    setLoading(true);
    try {
      const response = await PostWellService(jobPlan);

      if (response) {
        toast({
          title: "Data berhasil dikirim.",
          description: "Data telah berhasil disimpan ke database.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error Dalam Kirim Data", error);

      toast({
        title: "Terjadi kesalahan.",
        description: "Data gagal dikirim ke server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeJobPlan = (name) => (newData) => {
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        [name]: newData,
      },
    }));
  };

  console.log("jobPlan", jobPlan)

  return (
    <>
      <Flex justify={"space-between"} mr={5} my={5} gap={5}>
        <Heading>Planning Well Service</Heading>
        <Select width={"auto"} fontSize={"xl"}>
          <option value="Metrics">Metrics</option>
          <option value="Imperial">Imperial</option>
        </Select>
      </Flex>
      <Box borderRadius="lg">
        <Tabs variant={"soft-rounded"}>
          <TabList>
            <Tab>Teknis</Tab>
            <Tab>Operasional</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TeknisForm
                formErrors={formErrors}
                dataExistingWell={(e) =>
                  setJobPlan((prev) => ({
                    ...prev,
                    job_plan: {
                      ...prev.job_plan,
                      ...e,
                    },
                  }))
                }
              />
            </TabPanel>
            <TabPanel>
              <Operasional
                formErrors={formErrors}
                TypeOperasionalJob={"WORKOVER"}
                onData={(e) =>
                  setJobPlan((prevData) => ({
                    ...prevData,
                    ...e,
                  }))
                }
                jobPlanData={(e) =>
                  setJobPlan((prev) => ({
                    ...prev,
                    job_plan: {
                      ...prev.job_plan,
                      ...e,
                    },
                  }))
                }
                jobOperationData={handleChangeJobPlan("job_operation_days")}
                HazardTypeData={handleChangeJobPlan("job_hazards")}
                jobDocumentsData={handleChangeJobPlan("job_documents")}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Flex mt={4}>
        <Button
          colorScheme="blue"
          w={"100%"}
          isLoading={loading}
          onClick={PostDatanya}
        >
          Save
        </Button>
      </Flex>
    </>
  );
};

export default PlanWellServiceForm;
