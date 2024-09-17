import React from "react";
import GridLayout from "../../Layout/GridLayout";
import WRMUpdates from "../FormHandling/WRMUpdates";
import WRMUissues from "../FormHandling/WRMUissues";

const WRMRequirement = () => {
  return (
    <GridLayout Columns={2}  Gap={2}>
      <WRMUpdates />
      <WRMUissues />
    </GridLayout>
  );
};

export default WRMRequirement;
