import React, { useEffect, useState } from "react";
import TecnicalForm from "./WellService/TeknisForms";
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
import Operasional from "./WellService/Operasioal";
import axios from "axios";

const PlanWellServiceForm = () => {
  const [jobPlan, setJobPlan] = useState({
    area_id: "string",
    field_id: "string",
    contract_type: "COST-RECOVERY",
    afe_number: "string",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-09-08",
      end_date: "2024-09-08",
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
  console.log(jobPlan);

  const handleWellDataChange = (wellData) => {
    console.log("Previous Job Plan:", jobPlan);
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        well_plan: {
          ...wellData,
        },
      },
    }));
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

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const PostDatanya = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/job/planning/create/wellservice`,
        jobPlan,
        {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
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

  return (
    <>
      <Flex
        justify={"flex-start"}
        mr={5}
        my={5}
        gap={5}
        justifyContent={"space-between"}
      >
        <Heading>New Well Service</Heading>
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
              {/* <CardFormWell onFormChange={handleWellDataChange} /> */}
            </TabPanel>
            <TabPanel>
              <Operasional
                WBSdata={handleChangeJobPlan("work_breakdown_structure")}
                jobPlanData={(e) =>
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...e,
                    },
                  }))
                }
                onData={(operasional) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    ...operasional,
                  }));
                }}
                dataWRM={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...data,
                    },
                  }));
                }}
                TypeOperasionalJob={"WELLSERVICE"}
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
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default PlanWellServiceForm;
