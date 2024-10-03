import React,{ useState, useEffect,forwardRef, useImperativeHandle   } from "react";
import AreaWell from "../FormHandling/AreaWell";
import WellProfile from "../FormHandling/WellProfile";
import WorkBreakdown from "../FormHandling/WorkBreakdown";
import JobOperationDays from "../FormHandling/JobOperationDays";
import {
  Grid,
  GridItem,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  useToast,
} from "@chakra-ui/react";
import HazardType from "../FormHandling/HazardType";
import JobDocuments from "../../Planning/JobDocuments";
import { getViewRawPlanning } from "../../../API/APIKKKS";
import { putPlanningUpdate } from "../../../API/PostKkks";
import CardFormK3 from "../../Components/CardFormK3";

const OperationalParent = ({ job_id, DataRaw }) => {
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

  
  const [dataToUpload,setDataToUpload] = React.useState({

  });

  React.useEffect(()=> {
    setDataToUpload(dataPatch.job_plan)
  },[dataPatch])

console.log('a,b',dataToUpload)


  

  const toast = useToast();

  // Function to fetch data when the tab is active
  // console.log(dataViewRaw)
  // const fetchData = async () => {
  //   if (DataRaw) {
  //     try {
  //       const data = await getViewRawPlanning(job_id);
  //       setDataViewRaw(data);
  //       // console.log(data)
  //       setDataPatch(data.data); // Set the default values from API
  //     } catch (error) {
  //       setError("Error fetching data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     setLoading(false);
  //   }
  // };

  // Fetch data when component loads
  console.log(dataPatch);
  useEffect(() => {
    // fetchData();
    setDataViewRaw(DataRaw);
    setDataPatch(DataRaw);

    setLoading(false);  
  }, [ setDataPatch,DataRaw]);

  // Reload data when the tab is visible
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       fetchData(); // Reload data when the tab becomes active
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  // Function to handle saving changes

  // console.log("🚀 ~ OperationalParent ~ dataPatch:", dataPatch);

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

      console.log(response);
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

  return (
    <>
      
        <Grid gap={2}>
          <GridItem>
            <AreaWell data={dataPatch} onChange={handleInputChange} />
          </GridItem>
          <GridItem>
            <WellProfile
              data={dataPatch} // Now WellProfile will receive dataPatch with all fields
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem>
            <WorkBreakdown data={dataViewRaw} onChange={handleInputChange} />
          </GridItem>
          <GridItem>
            <JobOperationDays data={dataPatch} onChange={handleInputChange} />
          </GridItem>
          <GridItem>
            <HazardType data={dataPatch} onChange={handleInputChange} />
          </GridItem>
          <GridItem mt={4}>
            <JobDocuments data={dataPatch} onChange={handleInputChange} />
          </GridItem>
        </Grid>
   
      <Button colorScheme="blue" mt={4} onClick={handleSave}>
        Simpan Perubahan
      </Button>
    </>
  );
};

export default OperationalParent;
