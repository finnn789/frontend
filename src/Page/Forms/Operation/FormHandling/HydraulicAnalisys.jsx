import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";

const HydraulicAnalysisForm = ({handleChangeOfData}) => {
  const [formData, setFormData] = React.useState({
    annular_velocity: "",
    pb: "",
    sys_hhp: "",
    hhp_b: "",
    hsi: "",
    psib: "",
    jet_velocity: "",
    impact_force: "",
    if_area: "",
  });

  React.useEffect(() => {
    handleChangeOfData(formData);
  }, [formData]);

  const handleChangeData = (fieldName) => (e) => {
    let { value, type } = e.target;

    if (type === "number") {
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(value)) value = "";
    } else {
      value = value.toString();
    }

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <CardFormK3 title="Hydraulic Analysis" subtitle="Hydraulic Analysis">
      <Grid templateColumns={"repeat(4, 1fr)"} gap={4}>
        <GridItem>
          <FormControlCard
            labelForm="Annular Velocity"
            placeholder="Annular Velocity"
            type="number"
            name="annular_velocity"
            value={formData.annular_velocity}
            handleChange={handleChangeData("annular_velocity")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Pb"
            placeholder="Pb"
            type="number"
            name="pb"
            value={formData.pb}
            handleChange={handleChangeData("pb")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Sys HHP"
            placeholder="Sys HHP"
            type="number"
            name="sys_hhp"
            value={formData.sys_hhp}
            handleChange={handleChangeData("sys_hhp")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="HHPb"
            placeholder="HHPb"
            type="number"
            name="hhp_b"
            value={formData.hhp_b}
            handleChange={handleChangeData("hhp_b")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="HSI"
            placeholder="HSI"
            type="number"
            name="hsi"
            value={formData.hsi}
            handleChange={handleChangeData("hsi")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="%psib"
            placeholder="%psib"
            type="number"
            name="psib"
            value={formData.psib}
            handleChange={handleChangeData("psib")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Jet Velocity"
            placeholder="Jet Velocity"
            type="number"
            name="jet_velocity"
            value={formData.jet_velocity}
            handleChange={handleChangeData("jet_velocity")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Impact Force"
            placeholder="Impact Force"
            type="number"
            name="impact_force"
            value={formData.impact_force}
            handleChange={handleChangeData("impact_force")}
          />
        </GridItem>
        <GridItem colSpan={4}>
          <FormControlCard
            labelForm="IF/area"
            placeholder="IF/area"
            type="number"
            name="if_area"
            value={formData.if_area}
            handleChange={handleChangeData("if_area")}
          />
        </GridItem>
      </Grid>
    </CardFormK3>
  );
};

export default HydraulicAnalysisForm;
