import React from "react";
import GridLayout from "../../Layout/GridLayout";
import WRMUpdates from "../FormHandling/WRMUpdates";
import WRMUissues from "../FormHandling/WRMUissues";
import { Grid, GridItem } from "@chakra-ui/react";
  import { useLocation } from "react-router-dom";

const WRMRequirement = (job_id) => {
  const location = useLocation();
  const { job_actual } = location.state || {};
  // console.log("🚀 ~ WRMRequirement ~ job_actual:", job_actual)
  
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <WRMUpdates job_actual={job_actual} />
      </GridItem>
      <GridItem colSpan={3}>
        <WRMUissues job_id={job_id} />
      </GridItem>
    </Grid>
  );
};

export default WRMRequirement;
