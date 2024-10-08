import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import {
  Grid,
  GridItem,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  useToast,
} from "@chakra-ui/react";
import WellProfile from "../FormHandling/WellProfile";
import DirectionalType from "../FormHandling/DirectionalType";
import WellCasing from "../FormHandling/WellCasing";
import WellSummaryForm from "../FormHandling/WellSumarry";
import WellStratigraphyForm from "../FormHandling/WellStratigraphy";
import WellTestForm from "../FormHandling/WellTest";
import WellTrajectory from "../FormHandling/WellTrajetory";
import WellPorePressureForm from "../FormHandling/WellPorePressure";
import MudLogsCard from "../FormHandling/MudLogs";
import WellLogsCard from "../FormHandling/WellLogs";
import WellSchematic from "../FormHandling/WellSchematic";
import { putPlanningUpdate } from "../../../API/PostKkks";
import { getViewRawPlanning } from "../../../API/APIKKKS";

// Gunakan forwardRef pada komponen Technical
const Technical = forwardRef(({ job_id, DataRaw }, ref) => {
  const [dataViewRaw, setDataViewRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataPatch, setDataPatch] = useState({
    area_id: "",
    field_id: "",
    contract_type: "",
    afe_number: "",
    wpb_year: "",
    job_plan: {
      start_date: "",
      end_date: "",
      total_budget: "",
      rig_name: "",
      rig_type: "",
      rig_horse_power: "",
      job_operation_days: [],
      work_breakdown_structure: [],
      job_hazards: [],
      job_documents: [],
      well: {},
    },
  });

  const [dataToUpload, setDataToUpload] = useState({});
  const toast = useToast();

  // Gunakan useImperativeHandle untuk mengekspos `handleSave` ke ref dari parent component
  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  useEffect(() => {
    setDataToUpload({
      ...dataPatch.job_plan,
    });
  }, [dataPatch]);

  useEffect(() => {
    if (DataRaw) {
      setDataViewRaw(DataRaw); // Set initial data for rendering forms
      setDataPatch({
        ...dataPatch, // Preserve existing fields in dataPatch
        ...DataRaw, // Merge in all fields from DataRaw
      });
      setLoading(false); // Update loading state
    } else {
      setLoading(false);
      setError("No data available");
    }
  }, [DataRaw]);

  // Fungsi `handleSave` untuk menyimpan perubahan dan diekspos melalui ref
  const handleSave = async () => {
    try {
      const response = await putPlanningUpdate(job_id, dataToUpload);
      toast({
        title: "Success",
        description: "Data has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle form changes, whether inside job_plan or other fields
  const handleInputChange = useCallback((field, value) => {
    setDataPatch((prevData) => {
      const fieldPath = field.split(".");
      let updatedData = { ...prevData };

      // Traversal objek berdasarkan path field, kecuali untuk elemen terakhir
      let currentLevel = updatedData;
      for (let i = 0; i < fieldPath.length - 1; i++) {
        const key = fieldPath[i];
        if (!currentLevel[key]) {
          currentLevel[key] = {}; // Buat objek baru jika path tidak ada
        }
        currentLevel = currentLevel[key];
      }

      // Atur value pada elemen terakhir dari path
      const lastField = fieldPath[fieldPath.length - 1];
      currentLevel[lastField] = value;

      return updatedData;
    });
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (!DataRaw) {
    return <div>No Data Available</div>;
  }

  return (
    <>
      <Grid gap={10}>
        <GridItem>
          <WellProfile data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <DirectionalType data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellSummaryForm data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellCasing data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellStratigraphyForm data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellTestForm data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellTrajectory data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellPorePressureForm data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <MudLogsCard data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellLogsCard data={DataRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellSchematic />
        </GridItem>
      </Grid>
      {/* Tombol untuk menyimpan perubahan bisa dihilangkan jika sudah menggunakan ref dari parent */}
      {/* <Button colorScheme="blue" mt={4} onClick={handleSave}>
        Simpan Perubahan
      </Button> */}
    </>
  );
});

export default Technical;
