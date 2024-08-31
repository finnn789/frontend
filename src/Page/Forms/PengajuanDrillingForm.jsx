import React,{useState} from "react";
import CardFormWell from "./ChildForms/TeknisForms";

const PengajuanDrillingForm = () => {
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
      rig_name: "string",
      rig_type: "JACK-UP",
      rig_horse_power: 0,
      job_operation_days: [
        {
          phase: "string",
          depth_datum: "RT",
          depth_in: 0,
          depth_out: 0,
          depth_uom: "FEET",
          operation_days: 0,
        },
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
      well: {
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
        spud_date: "2024-08-31T02:04:33.198Z",
        final_drill_date: "2024-08-31T02:04:33.198Z",
        completion_date: "2024-08-31T02:04:33.198Z",
        rotary_table_elev: 0,
        rotary_table_elev_uom: "FEET",
        kb_elev: 0,
        kb_elev_uom: "FEET",
        derrick_floor_elev: 0,
        derrick_floor_elev_uom: "FEET",
        ground_elev: 0,
        ground_elev_uom: "FEET",
        mean_sea_level: 0,
        mean_sea_level_uom: "FEET",
        depth_datum: "RT",
        kick_off_point: 0,
        kick_off_point_uom: "FEET",
        maximum_tvd: 0,
        maximum_tvd_uom: "FEET",
        final_md: 0,
        final_md_uom: "FEET",
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
            depth_datum: "RT",
            depth: 0,
            depth_uom: "FEET",
            hole_diameter: 0,
            hole_diameter_uom: "INCH",
            bit: "string",
            casing_outer_diameter: 0,
            casing_outer_diameter_uom: "INCH",
            logging: "string",
            mud_program: "string",
            cementing_program: "string",
            bottom_hole_temperature: 0,
            bottom_hole_temperature_uom: "C",
            rate_of_penetration: 0,
            remarks: "string",
          },
        ],
        well_test: [
          {
            depth_datum: "RT",
            zone_name: "string",
            zone_top_depth: 0,
            zone_bottom_depth: 0,
            depth_uom: "FEET",
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
            depth_datum: "RT",
            depth: 0,
            depth_uom: "FEET",
            length: 0,
            length_uom: "FEET",
            hole_diameter: 0,
            hole_diameter_uom: "INCH",
            casing_outer_diameter: 0,
            casing_outer_diameter_uom: "INCH",
            casing_inner_diameter: 0,
            casing_inner_diameter_uom: "INCH",
            casing_grade: "string",
            casing_weight: 0,
            casing_weight_uom: "PPF",
            connection: "string",
            description: "string",
          },
        ],
        well_stratigraphy: [
          {
            depth_datum: "RT",
            depth: 0,
            depth_uom: "FEET",
            stratigraphy_id: "string",
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
  const handleWellDataChange = (wellData) => {
    setJobPlan((prevJobPlan) => ({
      ...prevJobPlan,
      job_plan: {
        ...prevJobPlan.job_plan,
        well: {
          ...prevJobPlan.job_plan.well,
          ...wellData,
        },
      },
    }));
  };

  console.log(jobPlan);
  

  return (
    <div>
      <CardFormWell onFormChange={handleWellDataChange} />
    </div>
  );
};

export default PengajuanDrillingForm;
