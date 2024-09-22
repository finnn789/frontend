import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";

const GasForm = ({handleChangeOfData}) => {
  const [formData, setFormData] = React.useState({
    max_gas: null,
    conn_gas: null,
    trip_gas: null,
    back_gas: null,
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
    <CardFormK3 title="Gas" subtitle="Gas">
      <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
        <GridItem>
          <FormControlCard
            labelForm="Max. Gas"
            placeholder="Max. Gas"
            type="number"
            name="max_gas"
            value={formData.max_gas}
            handleChange={handleChangeData("max_gas")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Conn. Gas"
            placeholder="Conn. Gas"
            type="number"
            name="conn_gas"
            value={formData.conn_gas}
            handleChange={handleChangeData("conn_gas")}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormControlCard
            labelForm="Trip Gas"
            placeholder="Trip Gas"
            type="number"
            name="trip_gas"
            value={formData.trip_gas}
            handleChange={handleChangeData("trip_gas")}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormControlCard
            labelForm="Back Gas"
            placeholder="Back Gas"
            type="number"
            name="back_gas"
            value={formData.back_gas}
            handleChange={handleChangeData("back_gas")}
          />
        </GridItem>
      </Grid>
    </CardFormK3>
  );
};

export default GasForm;
