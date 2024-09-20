import React, { useCallback, useState, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import WellTest from "../Planning/WellTest";
import WellCasing from "../Planning/WellCasing";
import FileUploadForm from "../Planning/WellTrajectory";
import WellTrajectory from "../Planning/WellTrajectory";
import WellPorePressureForm from "../Planning/WellPPFG";
import ElevationsAndDepths from "./../Planning/ElevationsandDepths";
import WellLocation from "./../Planning/WellLocation";
import JobDetail from "./../Planning/JobDetail";
import WellSummary from "./../Planning/WellSummary";
import Stratigraphy from "./../Planning/Stratigraphy";
import Seismic from "../Planning/Seismic";
import KeyDates from "./../Planning/KeyDates";

const CardFormWell = ({ onFormChange, unitType, errorForms, wellType }) => {
  const [formData, setFormData] = useState({
    unit_type: unitType,
    uwi: null,
    field_id: null,
    area_id: null,
    kkks_id: null,
    well_name: null,
    alias_long_name: null,
    well_type: null,
    // well_status: "Active",
    well_profile_type: null,
    hydrocarbon_target: null,
    environment_type: null,
    surface_longitude:null,
    surface_latitude:null,
    bottom_hole_longitude:null,
    bottom_hole_latitude:null,
    maximum_inclination:null,
    azimuth:null,
    line_name: null,
    spud_date: null,
    final_drill_date: null,
    completion_date: null,
    rotary_table_elev:null,
    kb_elev:null,
    derrick_floor_elev:null,
    ground_elev:null,
    mean_sea_level:null,
    depth_datum: "RT",
    kick_off_point:null,
    maximum_tvd:null,
    final_md:null,
    remark: null,
    well_trajectory: {
      file_id: null,
      data_format: "IMAGE",
    },
    well_ppfg: {
      file_id: null,
      data_format: "IMAGE",
    },
    well_logs: [
      {
        file_id: null,
        data_format: "IMAGE",
      },
    ],
    well_drilling_parameter: {
      file_id: null,
      data_format: "IMAGE",
    },
    well_documents: [],
    well_summary: [],
    well_casing: [],
    well_stratigraphy: [],
    work_breakdown_structure: [],
    well_directional_type: null,
  });
  // console.log(formData);

  const [tableData, setTableData] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    hole_diameter: 0,
    bit: null,
    casing_outer_diameter: 0,
    logging: null,
    mud_program: null,
    cementing_program: null,
    bottom_hole_temperature: 0,
    rate_of_penetration: 0,
    remarks: null,
  });

  // console.log(currentEntry);

  const [TablewellStratigraphy, setTablewellStratigraphy] = useState([]);
  const [WellStratigraphy, setWellStratigraphy] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    stratigraphy_id: null,
  });

  useEffect(() => {
    onFormChange(formData);
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;

    let parsedValue;
    if (type === "number") {
      const stringValue = String(value);
      parsedValue =
        stringValue === ""
          ? ""
          : stringValue.includes(".")
          ? parseFloat(stringValue)
          : parseInt(stringValue, 10);
    } else if (type === "text") {
      parsedValue = value;
    } else {
      parsedValue = value;
    }

    setFormData((prevData) => {
      // If well_profile_type is "VERTICAL", reset well_directional_type to null
      if (name === "well_profile_type" && value === "VERTICAL") {
        return {
          ...prevData,
          [name]: parsedValue,
          well_directional_type: null,
        };
      }

      return {
        ...prevData,
        [name]: parsedValue,
      };
    });
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type } = e.target;
    let processedValue = value;
    if (type === "number") {
      processedValue = parseFloat(value);
      if (isNaN(processedValue)) {
        processedValue = "";
      }
    }

    setCurrentEntry((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  }, []);

  const handleInputChangeWellStraigraphy = (e) => {
    const { name, value } = e.target;
    setWellStratigraphy((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChangeWellLocation = useCallback((e) => {
    const { name, value, type } = e.target;

    // Memproses nilai berdasarkan tipe input
    let processedValue = value;

    if (type === "number" || type === "text") {
      // Mengizinkan hanya angka dan satu titik desimal
      processedValue = processedValue.replace(/[^0-9.]/g, "");

      // Mencegah lebih dari satu titik desimal
      const parts = processedValue.split(".");
      if (parts.length > 2) {
        processedValue = `${parts[0]}.${parts.slice(1).join("")}`;
      }

      // Konversi ke float jika tidak kosong
      processedValue = processedValue !== "" ? parseFloat(processedValue) : "";
    }

    setCurrentEntry((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
  }, []);

  const handleAddClick = useCallback(() => {
    const newEntry = { ...currentEntry };
    setTableData((prevData) => [...prevData, newEntry]);
    setFormData((prevData) => ({
      ...prevData,
      well_summary: [...(prevData.well_summary || []), newEntry],
    }));
    // Reset currentEntry after adding
    setCurrentEntry({
      unit_type: "Metrics",
      depth_datum: "",
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
    });
  }, [currentEntry]);

  const handleWellStratichy = () => {
    const newEntry = { ...WellStratigraphy };
    setTablewellStratigraphy((prevData) => [...prevData, newEntry]);
    setFormData((prevData) => ({
      ...prevData,
      well_stratigraphy: [...(prevData.well_stratigraphy || []), newEntry],
    }));
    // Reset WellStratigraphy after adding
    setWellStratigraphy({
      unit_type: "Metrics",
      depth_datum: "RT",
      depth: 0,
      stratigraphy_id: "",
    });
  };

  const handleData = (newData) => {
    const newEntry = { ...newData };
    // Update parent state with the new data
    setFormData((prevData) => ({
      ...prevData,
      well_test: newData,
    }));
  };

  // console.log('asd',handleInputChange);
  return (
    <>
      <JobDetail
        handleChange={handleChange}
        formData={formData}
        unittype={unitType}
        errorForms={errorForms}
        wellType={wellType}
      />
      <WellLocation handleChange={handleChange} errorForms={errorForms} />
      <ElevationsAndDepths
        handleChange={handleChange}
        unittype={unitType}
        errorForms={errorForms}
      />
      {/* <Seismic handleChange={handleChange} formData={formData} />  */}
      <KeyDates
        handleChange={handleChange}
        formData={formData}
        errorForms={errorForms}
      />
      <WellSummary
        handleChange={(data) => {
          setFormData((prev) => ({ ...prev, well_summary: data }));
        }}
        setTableData={setTableData}
        errorForms={errorForms}
        unittype={unitType}
      />

      <WellCasing
        dataWellCasing={(data) =>
          setFormData((prev) => ({ ...prev, well_casing: data }))
        }
        unittype={unitType}
        errorForms={errorForms}
      />
      <Stratigraphy
        setWellStratigraphy={setWellStratigraphy}
        WellStratigraphy={WellStratigraphy}
        handleInputChangeWellStraigraphy={handleInputChangeWellStraigraphy}
        handleWellStratichy={handleWellStratichy}
        errorForms={errorForms}
        unittype={unitType}
        TablewellStratigraphy={TablewellStratigraphy}
        onData={(data) =>
          setFormData((prev) => ({ ...prev, well_stratigraphy: data }))
        }
      />

      <WellTrajectory
        ondata={(data) =>
          setFormData((prev) => ({ ...prev, well_trajectory: data }))
        }
        errorForms={errorForms}
      />
      <WellPorePressureForm
        errorForms={errorForms}
        handleDataSubmit={(e) =>
          setFormData((prev) => ({ ...prev, well_ppfg: e }))
        }
      />
      <WellTest
        onData={handleData}
        unitype={unitType}
        errorForms={errorForms}
      />
    </>
  );
};

export default CardFormWell;
