import React, { useEffect, useState } from "react";
import CardFormWell from "./Workover/TeknisForms";
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
import axios from "axios";
import ExistingWell from "./Planning/ExistingWell";
import TecnicalForm from "./WellService/TeknisForms";
import PostWorkover from "../API/PostKkks";

const PlanWorkOverForm = () => {
  const [jobPlan, setJobPlan] = useState({
    area_id: "string",
    field_id: "string",
    contract_type: "COST-RECOVERY",
    afe_number: "string",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-09-07",
      end_date: "2024-09-07",
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
    setLoading(true);
    try {
      const submit = await PostWorkover(jobPlan);
      if (submit) {
        setLoading(false);
        toast({
          title: "Success",
          description: "Data Berhasil",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        <Heading>New Workover</Heading>
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
              <TecnicalForm
                dataExistingWell={(e) =>
                  setJobPlan((prev) => ({ ...prev, job_plan: {
                    ...prev.job_plan,
                    ...e   
                  } }))
                }
              />
            </TabPanel>
            <TabPanel>
              <Operasional
                TypeOperasionalJob={"WORKOVER"}
                onData={(e) =>
                  setJobPlan((prevData) => ({
                    ...prevData,
                    ...e,
                  }))
                }
                dataWRM={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...data,
                    },
                  }));
                }}
                jobPlanData={(e) =>
                  setJobPlan((prev) => ({
                    ...prev,
                    job_plan: {
                      ...prev.job_plan,
                      ...e,
                    },
                  }))
                }
                WBSdata={(e) =>
                  setJobPlan((prev) => ({
                    ...prev,
                    job_plan: {
                      ...prev.job_plan,
                      work_breakdown_structure: e,
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
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default PlanWorkOverForm;
