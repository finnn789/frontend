import React,{useImperativeHandle,forwardRef} from "react";
import GridLayout from "../../Layout/GridLayout";
import WRMUpdates from "../FormHandling/WRMUpdates";
import WRMUissues from "../FormHandling/WRMUissues";
import { Grid, GridItem } from "@chakra-ui/react";
  import { useLocation } from "react-router-dom";

const WRMRequirement = forwardRef(({job_id},ref) => {
  const location = useLocation();
  const { job_actual } = location.state || {};
  // console.log("🚀 ~ WRMRequirement ~ job_actual:", job_actual)

  // useImperativeHandle(ref, () => ({
  //   handleSubmit: () => {
  //     alert("Submit button clicked");
  //   }
  // }));
  
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <WRMUpdates job_actual={job_actual} reference={ref} />
      </GridItem>
      <GridItem colSpan={3}>
        <WRMUissues job_id={job_id} />
      </GridItem>
    </Grid>
  );
});

export default WRMRequirement;
