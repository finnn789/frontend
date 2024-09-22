// HealthSafety.js
import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Box, Button, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import IncidentTable from "./IncindentTable"; // Import the IncidentTable component

const HealthSafety = ({handleChangeDataIncident,handleChangeOfData}) => {
  const [formData, setFormData] = React.useState({
    stop_cards: null,
    lta: null,
    spill: null,
    h2s_test: null,
    hse_mtg: null,
    kicktrip: null,
    kickdrill: null,
    fire: null,
  });

  const handleChangeData = (name) => (e) => {
    const { value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  React.useEffect(()=>{
    handleChangeOfData(formData)
  },[formData])
  const handleAddData = () => {
    // Handle form data submission here if needed
    console.log("Form Data Submitted:", formData);
  };

  const selectOptionValue = [
    { label: "LTA", name: "lta" },
    { label: "Spill", name: "spill" },
    { label: "H2S Test", name: "h2s_test" },
    { label: "HSE Mtg", name: "hse_mtg" },
    { label: "Kick-Trip", name: "kicktrip" },
    { label: "Kick-Drill", name: "kickdrill" },
    { label: "Fire", name: "fire" },
  ];

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4} fontFamily={"Montserrat"}>
      <GridItem>
        <CardFormK3
          title="Health, Safety and Environment"
          padding="18px 8px"
          subtitle="Details"
        >
          <SimpleGrid columns={4} gap={4}>
            <FormControlCard
              labelForm="Stop Cards"
              placeholder="Enter Stop Card"
              type="text"
              value={formData.stop_cards}
              handleChange={handleChangeData("stop_cards")}
            />
            {selectOptionValue.map((field, index) => (
              <SelectComponent
                key={index}
                label={field.label}
                value={formData[field.name] || ""}
                onChange={handleChangeData(field.name)}
              >
                <SelectOption value="Y" label="Y" />
                <SelectOption value="N" label="N" />
              </SelectComponent>
            ))}
          </SimpleGrid>
          <IncidentTable handleOnChangeData={handleChangeDataIncident}/>
        </CardFormK3>
      </GridItem>
      <GridItem>{/* Include IncidentTable as a separate component */}</GridItem>
    </Grid>
  );
};

export default HealthSafety;
