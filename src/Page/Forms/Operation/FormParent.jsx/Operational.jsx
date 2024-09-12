import React from "react";
import AreaWell from "../FormHandling/AreaWell";
import WellProfile from "../FormHandling/WellProfile";
import GridLayout from "../../Layout/GridLayout";
import WorkBreakdown from "../FormHandling/WorkBreakdown";
import JobOperationDays from "../FormHandling/JobOperationDays";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import HazardType from "../FormHandling/HazardType";
import JobDocuments from "../../Planning/JobDocuments";
const OperationalParent = () => {
  return (
    <>
      <Grid gap={2}>
        <GridItem>
          <AreaWell />
        </GridItem>
        <GridItem>
          <WellProfile />
        </GridItem>
        <GridItem>
          <WorkBreakdown />
        </GridItem>
        <GridItem>
          <JobOperationDays />
        </GridItem>
        <GridItem>
          <HazardType/>
        </GridItem>
        <GridItem mt={4}>
          <JobDocuments data={(e)=> console.log(encodeURI)}/>
        </GridItem>
      </Grid>
    </>
  );
};

export default OperationalParent;
