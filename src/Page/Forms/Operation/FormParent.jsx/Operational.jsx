import { useState, useEffect } from "react";
import AreaWell from "../FormHandling/AreaWell";
import WellProfile from "../FormHandling/WellProfile";
import WorkBreakdown from "../FormHandling/WorkBreakdown";
import JobOperationDays from "../FormHandling/JobOperationDays";
import { Grid, GridItem } from "@chakra-ui/react";
import HazardType from "../FormHandling/HazardType";
import JobDocuments from "../../Planning/JobDocuments";
import { getViewRawPlanning } from "../../../API/APIKKKS";

const OperationalParent = ({ job_id }) => {
  const [dataViewRaw, setDataViewRaw] = useState(null); // Default ke null
  const [loading, setLoading] = useState(true); // Menambahkan state untuk loading

  useEffect(() => {
    const fetchData = async () => {
      if (job_id) { // Pastikan jobID ada sebelum melakukan fetch
        try {
          const data = await getViewRawPlanning(job_id);
          setDataViewRaw(data);
        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false); // Menandakan loading selesai
        }
      } else {
        setLoading(false); // Tidak melakukan fetch jika job_id tidak ada
      }
    };
    fetchData();
  }, [job_id]);

  if (loading) {
    return <div>Loading...</div>; // Menampilkan loading jika data belum siap
  }

  if (!dataViewRaw) {
    return <div>No Data Available</div>; // Menangani jika data kosong
  }

  console.log("🚀 ~ OperationalParent ~ dataViewRaw:", dataViewRaw.data);


  return (
    <>
      <Grid gap={2}>
        <GridItem>
          <AreaWell data={dataViewRaw}  />
        </GridItem>
        <GridItem>
          <WellProfile data={dataViewRaw} />
        </GridItem>
        <GridItem>
          <WorkBreakdown />
        </GridItem>
        <GridItem>
          <JobOperationDays />
        </GridItem>
        <GridItem>
          <HazardType />
        </GridItem>
        <GridItem mt={4}>
          <JobDocuments data={(e) => console.log(e)} />
        </GridItem>
      </Grid>
    </>
  );
};

export default OperationalParent;
