import { useState, useEffect } from "react";
import WellProfile from "../FormHandling/WellProfile";
import { Grid, GridItem, Spinner, Alert, AlertIcon, Button, useToast } from "@chakra-ui/react";
import DirectionalType from "../FormHandling/DirectionalType";
import WellCasing from "../FormHandling/WellCasing";
import WellSummaryForm from "../FormHandling/WellSumarry";
import WellStratigraphyForm from "../FormHandling/WellStratigraphy";
import WellTestForm from "../FormHandling/WellTest";
import WellTrajectory from "../FormHandling/WellTrajetory";
import WellPorePressureForm from "../FormHandling/WellPorePressure";
import MudLogsCard from "../FormHandling/MudLogs";
import WellLogsCard from "../FormHandling/WellLogs";
import { putPlanningUpdate } from "../../../API/PostKkks";
import { getViewRawPlanning } from "../../../API/APIKKKS";


const Technical = ({ job_id }) => {
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

  const toast = useToast();

  // Function to fetch data when the tab is active
  const fetchData = async () => {
    if (job_id) {
      try {
        const data = await getViewRawPlanning(job_id);
        setDataViewRaw(data);
        setDataPatch(data.data);  // Set the default values from API
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchData();
  }, [job_id]);

  // Reload data when the tab is visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchData(); // Reload data when the tab becomes active
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Function to handle saving changes
  const handleSave = async () => {
    try {
      const response = await putPlanningUpdate(job_id, dataPatch);
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
  const handleInputChange = (field, value) => {
    setDataPatch((prevData) => {
      // If the field is part of "job_plan"
      if (field.startsWith("job_plan.")) {
        const jobPlanField = field.split(".")[1];
        return {
          ...prevData,
          job_plan: {
            ...prevData.job_plan,
            [jobPlanField]: value,
          },
        };
      } else {
        // For fields outside of job_plan
        return {
          ...prevData,
          [field]: value,
        };
      }
    });
  };

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

  if (!dataViewRaw) {
    return <div>No Data Available</div>;
  }
  
  console.log("🚀 ~ Technical ~ dataViewRaw:", dataViewRaw.data)
  return (
    <>
      <Grid gap={10}>
        <GridItem>
          <WellProfile
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <DirectionalType
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <WellSummaryForm
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <WellCasing
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <WellStratigraphyForm
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <WellTestForm
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
            
            <WellTrajectory data={dataViewRaw} onChange={handleInputChange} />
        </GridItem>
        <GridItem>
          <WellPorePressureForm data={dataViewRaw}
            onChange={handleInputChange}/>
        </GridItem>
        <GridItem>
          <MudLogsCard
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
        <GridItem>
          <WellLogsCard
            data={dataViewRaw}
            onChange={handleInputChange}
          />
        </GridItem>
      </Grid>
      <Button colorScheme="blue" mt={4} onClick={handleSave}>
        Simpan Perubahan
      </Button>
    </>
  );
};

export default Technical;
