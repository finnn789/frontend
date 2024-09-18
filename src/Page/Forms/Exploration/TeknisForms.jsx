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

const CardFormWell = ({ onFormChange, unitType, errorForms }) => {
  const [formData, setFormData] = useState({
    unit_type: unitType,
    uwi: "",
    field_id: "",
    area_id: "",
    kkks_id: "",
    well_name: "",
    alias_long_name: "",
    well_type: "",
    well_status: "Active",
    well_profile_type: "",
    hydrocarbon_target: "OIL",
    environment_type: "",
    surface_longitude: 0,
    surface_latitude: 0,
    bottom_hole_longitude: 0,
    bottom_hole_latitude: 0,
    maximum_inclination: 0,
    azimuth: 0,
    line_name: "",
    spud_date: "",
    final_drill_date: "",
    completion_date: "",
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
    well_documents: [],
    well_summary: [],
    well_casing: [],
    well_stratigraphy: [],
    work_breakdown_structure: [],
  });
  console.log(formData);

  const [tableData, setTableData] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
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
  });

  console.log(currentEntry);
  

  const [TablewellStratigraphy, setTablewellStratigraphy] = useState([]);
  const [WellStratigraphy, setWellStratigraphy] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    stratigraphy_id: "",
  });

  useEffect(() => {
    onFormChange(formData);
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;

    let parsedValue;
    if (type === "number") {
      // Konversi nilai menjadi string untuk melakukan operasi string seperti includes
      const stringValue = String(value);

      // Cek apakah ada titik untuk memutuskan apakah itu float atau integer
      parsedValue =
        stringValue === ""
          ? ""
          : stringValue.includes(".")
          ? parseFloat(stringValue)
          : parseInt(stringValue, 10);
    } else if (type === "text") {
      parsedValue = value; // Tetap sebagai string
    } else {
      parsedValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
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
        wellType={["DELINEATION", "WILDCAT","INJECTION","PRODUCER"]}
      />
      <WellLocation handleChange={handleChange} errorForms={errorForms} />
      <ElevationsAndDepths handleChange={handleChange} unittype={unitType} errorForms={errorForms} />
      {/* <Seismic handleChange={handleChange} formData={formData} />  */}
      <KeyDates handleChange={handleChange} formData={formData} errorForms={errorForms} />
      <WellSummary
        handleAddClick={handleAddClick}
        handleInputChange={handleInputChange}
        currentEntry={currentEntry}
        tableData={tableData}
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
      <WellTest onData={handleData} unitype={unitType} errorForms={errorForms} />
    </>
  );
};

export default CardFormWell;
