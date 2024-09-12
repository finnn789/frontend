import React,{useState} from "react";
import CardFormWell from "../../Exploration/TeknisForms";

const Technical = () => {
  const [jobPlan, setJobPlan] = React.useState({
    area_id: "string",
    field_id: "string",
    contract_type: "COST-RECOVERY",
    afe_number: "string",
    wpb_year: 0,
    job_plan: {
      start_date: "2024-08-31",
      end_date: "2024-08-31",
      total_budget: 0,
      job_operation_days: [],
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
        well_summary: [],
        well_test: [],
        well_trajectory: {
          file_id: "string",
          data_format: "IMAGE",
        },
        well_ppfg: {
          file_id: "string",
          data_format: "IMAGE",
        },
        well_logs: [],
        well_drilling_parameter: {
          file_id: "string",
          data_format: "IMAGE",
        },
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
  const [formErrors, setFormErrors] = useState({});

  return (
    <CardFormWell
      onFormChange={handleWellDataChange}
      unitType={dataMetricImperial}
      errorForms={formErrors}
    />
  );
};

export default Technical;
