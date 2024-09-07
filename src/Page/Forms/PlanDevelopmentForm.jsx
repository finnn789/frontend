import React, { useCallback, useEffect, useState } from "react";
import CardFormWell from "./Exploration/TeknisForms";
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
  Select,
  useToast,
} from "@chakra-ui/react";
import Operasional from "./Exploration/Operasioal";
import { PostPlanningDevelopment } from "../API/APISKK";

const PlanDevelopmentForm = () => {
  const [jobPlan, setJobPlan] = useState({
    area_id: "string",
    field_id: "string",
    contract_type: "COST-RECOVERY",
    afe_number: "string",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-08-31",
      end_date: "2024-08-31",
      total_budget: 0,
      job_operation_days: [
      ],
      work_breakdown_structure: [
        {
          event: "string",
          start_date: "2024-08-31",
          end_date: "2024-08-31",
          remarks: "string",
        },
      ],
      job_hazards: [
        {
          hazard_type: "GAS KICK",
          hazard_description: "string",
          severity: "LOW",
          mitigation: "string",
          remark: "string",
        },
      ],
      job_documents: [
        {
          file_id: "string",
          document_type: "Drilling Plan",
          remark: "string",
        },
      ],
      rig_name: "string",
      rig_type: "JACK-UP",
      rig_horse_power: 0,
      well: {
        unit_type: "Metrics",
        uwi: "string",
        field_id: "string",
        area_id: "string",
        kkks_id: "string",
        well_name: "string",
        alias_long_name: "string",
        well_type: "WILDCAT",
        well_status: "Active",
        well_profile_type: "DIRECTIONAL",
        hydrocarbon_target: "OIL",
        environment_type: "MARINE",
        surface_longitude: 0,
        surface_latitude: 0,
        bottom_hole_longitude: 0,
        bottom_hole_latitude: 0,
        maximum_inclination: 0,
        azimuth: 0,
        line_name: "string",
        spud_date: "2024-08-31T16:27:35.697Z",
        final_drill_date: "2024-08-31T16:27:35.697Z",
        completion_date: "2024-08-31T16:27:35.697Z",
        rotary_table_elev: 0,
        kb_elev: 0,
        derrick_floor_elev: 0,
        ground_elev: 0,
        mean_sea_level: 0,
        depth_datum: "RT",
        kick_off_point: 0,
        maximum_tvd: 0,
        final_md: 0,
        remark: "string",
        well_documents: [
          {
            file_id: "string",
            document_type: "Well Report",
            remark: "string",
          },
        ],
        well_summary: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            depth: 0,
            hole_diameter: 0,
            bit: "string",
            casing_outer_diameter: 0,
            logging: "string",
            mud_program: "string",
            cementing_program: "string",
            bottom_hole_temperature: 0,
            rate_of_penetration: 0,
            remarks: "string",
          },
        ],
        well_test: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            zone_name: "string",
            zone_top_depth: 0,
            zone_bottom_depth: 0,
          },
        ],
        well_trajectory: {
          file_id: "string",
          data_format: "IMAGE",
        },
        well_ppfg: {
          file_id: "string",
          data_format: "IMAGE",
        },
        well_logs: [
          {
            file_id: "string",
            data_format: "IMAGE",
          },
        ],
        well_drilling_parameter: {
          file_id: "string",
          data_format: "IMAGE",
        },
        well_casing: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            depth: 0,
            length: 0,
            hole_diameter: 0,
            casing_outer_diameter: 0,
            casing_inner_diameter: 0,
            casing_grade: "string",
            casing_weight: 0,
            connection: "string",
            description: "string",
          },
        ],
        well_stratigraphy: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            depth: 0,
            stratigraphy_id: "string",
          },
        ],
      },
      wrm_pembebasan_lahan: true,
      wrm_ippkh: true,
      wrm_ukl_upl: true,
      wrm_amdal: true,
      wrm_cutting_dumping: true,
      wrm_pengadaan_rig: true,
      wrm_pengadaan_drilling_services: true,
      wrm_pengadaan_lli: true,
      wrm_persiapan_lokasi: true,
      wrm_internal_kkks: true,
      wrm_evaluasi_subsurface: true,
    },
  });
  console.log(jobPlan);

  const [dataMetricImperial, setDataMetricImperial] = useState("Metrics");
  const metricImperialChange = (e) => {
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        job_operation_days: {
          ...prevJobPlan.job_plan.job_operation_days,
          unit_type: e.target.value,
        },
        well_plan: {
          ...prevJobPlan.job_plan.well_plan,
          unit_type: e.target.value,
        },
      },
    }));

    setDataMetricImperial(e.target.value);
  };

  const handleWellDataChange = (wellData) => {
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        well: {
          ...wellData,
        },
      },
    }));
  };

  const handleJobDocuments = (jobDocuments) => {
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        job_documents: jobDocuments,
      },
    }));
  };

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onClickSubmitForm = async () => {
    setLoading(true);
    try {
      const post = await PostPlanningDevelopment(jobPlan, toast);
      setLoading(false);

      if (post) {
        return post.data;
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan.",
        description: "Data gagal dikirim ke server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        <Heading>New Exploration Well</Heading>
        <Select width={"auto"} fontSize={"xl"} onChange={metricImperialChange}>
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
              <CardFormWell
                onFormChange={handleWellDataChange}
                unitType={dataMetricImperial}
              />
            </TabPanel>
            <TabPanel>
              <Operasional
                CuttingDumping={true}
                onData={(operasional) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    ...operasional,
                  }));
                }}
                handleChangeRigType={useCallback((e) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...e,
                    },
                  }));
                })}
                dataWRM={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...data,
                    },
                  }));
                }}
                handleChangeJobPlan={useCallback((e) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...e,
                    },
                  }));
                })}
                jobDocuments={handleJobDocuments}
                WBSData={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      ...data,
                    },
                  }));
                }}
                JobOperationData={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      job_operation_days: [
                        ...prevJobPlan.job_plan.job_operation_days,
                        ...data,
                      ],
                    },
                  }));  
                }}

                HazardTypeData={(data) => { 
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      job_hazards: [
                        ...data
                      ]
                    },
                  }));
                }}
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
          onClick={onClickSubmitForm}
        >
          Submit
        </Button>
      </Flex>
    </>
  );
};

export default PlanDevelopmentForm;
