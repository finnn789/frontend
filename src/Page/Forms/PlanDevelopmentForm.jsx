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
    area_id: null,
    field_id: null,
    contract_type: null,
    afe_number: null,
    wpb_year: null,
    job_plan: {
      start_date: null,
      end_date: null,
      total_budget: null,
      job_operation_days: [],
      work_breakdown_structure: [],
      job_hazards: [],
      job_documents: [],
      rig_name: null,
      rig_type: null,
      rig_horse_power: null,
      well: {
        unit_type: null,
        uwi: null,
        field_id: null,
        area_id: null,
        kkks_id: null,
        well_name: null,
        alias_long_name: null,
        well_type: null,
        // well_status: null,
        well_profile_type: null,
        hydrocarbon_target: null,
        environment_type: null,
        surface_longitude: null,
        surface_latitude: null,
        bottom_hole_longitude: null,
        bottom_hole_latitude: null,
        maximum_inclination: null,
        azimuth: null,
        line_name: null,
        spud_date: null,
        final_drill_date: null,
        completion_date: null,
        rotary_table_elev: null,
        kb_elev: null,
        derrick_floor_elev: null,
        ground_elev: null,
        mean_sea_level: null,
        depth_datum: null,
        kick_off_point: null,
        maximum_tvd: null,
        final_md: null,
        remark: null,
        well_documents: [],
        well_summary: [],
        well_test: [],
        well_trajectory: {},
        well_ppfg: {},
        // well_logs: [],
        // well_drilling_parameter: {},
        well_casing: [],
        well_stratigraphy: [],
      },
      wrm_pembebasan_lahan: true,
      wrm_ippkh: true,
      wrm_ukl_upl: true,
      wrm_amdal: true,
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
  const [formErrors, setFormErrors] = useState({});
  const toast = useToast();

  const validateForm = (formData, parentKey = "") => {
    let errors = {};

    // Iterasi melalui setiap key dalam formData
    Object.entries(formData).forEach(([key, value]) => {
      // Tentukan nama lengkap key termasuk parent jika ada (dot notation)
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      // Jika value adalah object dan bukan array, lakukan rekursi
      if (value && typeof value === "object" && !Array.isArray(value)) {
        errors = { ...errors, ...validateForm(value, fullKey) };
      } else if (Array.isArray(value) && value.length === 0) {
        // Jika value adalah array kosong, tambahkan pesan error
        errors[fullKey] = `${fullKey.replace(/_/g, " ")} cannot be empty.`;
      } else if (!value || (typeof value === "string" && value.trim() === "")) {
        // Tambahkan pesan error jika value kosong atau string kosong
        errors[fullKey] = `${fullKey.replace(/_/g, " ")} is required.`;
      }
    });

    return errors;
  };
  const onClickSubmitForm = async () => {
    setLoading(true);
    try {
      const post = await PostPlanningDevelopment(jobPlan, toast);
      if (post) {
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
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
                errorForms={formErrors}
                onFormChange={handleWellDataChange}
                unitType={dataMetricImperial}
                wellType={["INJECTION", "PRODUCER", "INFILL", "STEPOUT"]}
                area_id={jobPlan.area_id}
              />
            </TabPanel>
            <TabPanel>
              <Operasional
                errorForms={formErrors}
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
                      well: {
                        ...prevJobPlan.job_plan.well,
                        work_breakdown_structure: [...data],
                      },
                    },
                  }));
                }}
                JobOperationData={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      job_operation_days: data,
                    },
                  }));
                }}
                HazardTypeData={(data) => {
                  setJobPlan((prevJobPlan) => ({
                    ...prevJobPlan,
                    job_plan: {
                      ...prevJobPlan.job_plan,
                      job_hazards: [...data],
                    },
                  }));
                }}
                unitType={dataMetricImperial}
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
          Save
        </Button>
      </Flex>
    </>
  );
};

export default PlanDevelopmentForm;
