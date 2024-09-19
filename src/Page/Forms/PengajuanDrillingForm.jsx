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
import axios from "axios";
import { PostPlanningExploration } from "../API/APISKK";
import { redirect } from "react-router-dom";

const PengajuanDrillingForm = () => {
  const [jobPlan, setJobPlan] = useState({
    area_id: "",
    field_id: "",
    contract_type: "COST-RECOVERY",
    afe_number: "",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-09-18",
      end_date: "2024-09-18",
      total_budget: 0,
      job_operation_days: [],
      work_breakdown_structure: [],
      job_hazards: [],
      job_documents: [],
      rig_name: "",
      rig_type: "JACK-UP",
      rig_horse_power: 0,
      well: {
        unit_type: "Metrics",
        uwi: "",
        field_id: "",
        area_id: "",
        kkks_id: "",
        well_name: "",
        alias_long_name: "",
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
        line_name: "",
        spud_date: "2024-09-18",
        final_drill_date: "2024-09-18",
        completion_date: "2024-09-18",
        rotary_table_elev: 0,
        kb_elev: 0,
        derrick_floor_elev: 0,
        ground_elev: 0,
        mean_sea_level: 0,
        depth_datum: "RT",
        kick_off_point: 0,
        maximum_tvd: 0,
        final_md: 0,
        remark: "",
        well_documents: [
          {
            file_id: "",
            document_type: "Well Report",
            remark: "",
          },
        ],
        well_summary: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            depth: 0,
            hole_diameter: 0,
            bit: "",
            casing_outer_diameter: 0,
            logging: "",
            mud_program: "",
            cementing_program: "",
            bottom_hole_temperature: 0,
            rate_of_penetration: 0,
            remarks: "",
          },
        ],
        well_test: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            zone_name: "",
            zone_top_depth: 0,
            zone_bottom_depth: 0,
          },
        ],
        well_trajectory: {
          file_id: "",
          data_format: "IMAGE",
        },
        well_ppfg: {
          file_id: "",
          data_format: "IMAGE",
        },
        well_logs: [
          {
            file_id: "",
            data_format: "IMAGE",
          },
        ],
        well_drilling_parameter: {
          file_id: "",
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
            casing_grade: "",
            casing_weight: 0,
            connection: "",
            description: "",
          },
        ],
        well_stratigraphy: [
          {
            unit_type: "Metrics",
            depth_datum: "RT",
            depth: 0,
            stratigraphy_id: "",
          },
        ],
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

  const [dataMetricImperial, setDataMetricImperial] = React.useState("Metrics");
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

  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Fungsi rekursif untuk memvalidasi form secara otomatis
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
    // const errors = validateForm(jobPlan);
    // setFormErrors(errors);
  
    // // Cek apakah ada error pada form
    // if (Object.keys(errors).length > 0) {
    //   console.log("errors", errors);
    //   toast({
    //     title: "Terjadi kesalahan.",
    //     description: "Tolong isi semua field yang diperlukan.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   return; // Menghentikan eksekusi jika ada error
    // }
  
    setLoading(true);
    try {
      const post = await PostPlanningExploration(jobPlan);
      console.log("Ini response", post);
  
      // Cek apakah data respons benar dan status sukses
      if (post.status===200) {
        toast({
          title: "Berhasil!",
          description: "Data berhasil dikirim ke server.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        // Reset form atau lakukan tindakan lain jika berhasil
        // resetForm(); // Contoh reset form jika diperlukan
      } else {
        toast({
          title: "Terjadi kesalahan.",
          description: post.message || "Data gagal dikirim ke server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      return redirect
    } catch (error) {
      // Menangani error dari server atau dari permintaan
      console.error("Error dalam pengiriman:", error);
      toast({
        title: "Terjadi kesalahan.",
        description: "Data gagal dikirim ke server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Menghentikan loading state
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
                errorForms={formErrors}
                wellType={["DELINEATION", "WILDCAT"]}
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

export default PengajuanDrillingForm;
