import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";

const AreaWell = () => {
  return (
    <CardFormK3 title="Operational" subtitle="Area">
      <FormControlCard labelForm="Area Well" placeholder="Area" isDisabled />
      <FormControlCard labelForm="Field ID" placeholder="Area" isDisabled />
    </CardFormK3>
  );
};

export default AreaWell;
