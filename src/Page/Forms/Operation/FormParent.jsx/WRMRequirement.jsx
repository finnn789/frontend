import React from "react";
import GridLayout from "../../Layout/GridLayout";
import WRMUpdates from "../FormHandling/WRMUpdates";
import WRMUissues from "../FormHandling/WRMUissues";
import { Grid, GridItem } from "@chakra-ui/react";

const WRMRequirement = (job_id) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <WRMUpdates />
      </GridItem>
      <GridItem colSpan={3}>
        <WRMUissues job_id={job_id} />
      </GridItem>
    </Grid>
  );
};

export default WRMRequirement;
