import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";

const MudVolumes = () => {
  const [formData, setFormData] = React.useState({
    start_mud_volume: 0,
    lost_surface_mud_volume: 0,
    lost_dh_mud_volume: 0,
    dumped_mud_volume: 0,
    built_mud_volume: 0,
    ending_mud_volume: 0,
  });

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
    <CardFormK3 title="Mud Volumes" subtitle="Mud Volumes">
      <Grid templateColumns={"repeat(2, 1fr)"} gap={4}>
        <GridItem>
          <FormControlCard
            labelForm="Start Mud Volume"
            placeholder="Start Mud Volume"
            type="number"
            name="start_mud_volume"
            value={formData.start_mud_volume}
            handleChange={handleChangeData("start_mud_volume")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Lost Surface Mud Volume"
            placeholder="Lost Surface Mud Volume"
            type="number"
            name="lost_surface_mud_volume"
            value={formData.lost_surface_mud_volume}
            handleChange={handleChangeData("lost_surface_mud_volume")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Lost DH Mud Volume"
            placeholder="Lost DH Mud Volume"
            type="number"
            name="lost_dh_mud_volume"
            value={formData.lost_dh_mud_volume}
            handleChange={handleChangeData("lost_dh_mud_volume")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Dumped Mud Volume"
            placeholder="Dumped Mud Volume"
            type="number"
            name="dumped_mud_volume"
            value={formData.dumped_mud_volume}
            handleChange={handleChangeData("dumped_mud_volume")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Built Mud Volume"
            placeholder="Built Mud Volume"
            type="number"
            name="built_mud_volume"
            value={formData.built_mud_volume}
            handleChange={handleChangeData("built_mud_volume")}
          />
        </GridItem>
        <GridItem>
          <FormControlCard
            labelForm="Ending Mud Volume"
            placeholder="Ending Mud Volume"
            type="number"
            name="ending_mud_volume"
            value={formData.ending_mud_volume}
            handleChange={handleChangeData("ending_mud_volume")}
          />
        </GridItem>
        
      </Grid>
    </CardFormK3>
  );
};

export default MudVolumes;
