import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";

const CasingOps = () => {
  const [formData, setFormData] = React.useState({
    start: "",
    set_md: "",
    next_size: "",
    set_md_2: "",
    last_lot_emw: "",
    tol: "",
  });

//   console.log(formData);

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
    <CardFormK3 title="Casing" subtitle="Casing">
      <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
        <GridItem>
          <FormControlCard
            labelForm="Start"
            placeholder="Start"
            type="number"
            name="start"
            value={formData.start}
            handleChange={handleChangeData("start")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Set MD"
            placeholder="Set MD"
            type="text"
            name="set_md"
            value={formData.set_md}
            handleChange={handleChangeData("set_md")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Next Size"
            placeholder="Next Size"
            type="text"
            name="next_size"
            value={formData.next_size}
            handleChange={handleChangeData("next_size")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Set MD 2"
            placeholder="Set MD 2"
            type="text"
            name="set_md_2"
            value={formData.set_md_2}
            handleChange={handleChangeData("set_md_2")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Last LOT EMW"
            placeholder="Last LOT EMW"
            type="text"
            name="last_lot_emw"
            value={formData.last_lot_emw}
            handleChange={handleChangeData("last_lot_emw")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="TOL"
            placeholder="TOL"
            type="text"
            name="tol"
            value={formData.tol}
            handleChange={handleChangeData("tol")}
          />
        </GridItem>
      </Grid>
    </CardFormK3>
  );
};

export default CasingOps;
