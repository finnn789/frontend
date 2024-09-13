import React from "react";
import { Box, Button, Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";

const BottomHoleAssembly = () => {
  const [formData, setFormData] = React.useState({
    daily_operations_report_id: "",
    bha_number: 0,
    bha_run: 0,
    components: [
      {
        component: "",
        outer_diameter: 0,
        length: 0,
      },
    ],
  });

  const handleInputChange = (field, index) => (e) => {
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      components: prevData.components.map((comp, idx) =>
        idx === index ? { ...comp, [field]: value } : comp
      ),
    }));
  };

  const handleAddComponent = () => {
    const newComponent = {
      component: "",
      outer_diameter: 0,
      length: 0,
    };
    setFormData((prevData) => ({
      ...prevData,
      components: [...prevData.components, newComponent],
    }));
  };

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4} fontFamily="Montserrat">
      <GridItem>
        <CardFormK3
          title="Bottom Hole Assembly"
          padding="18px 8px"
          subtitle="BHA"
        >
          <FormControlCard
            labelForm="Daily Operations Report ID"
            placeholder="Enter Daily Operations Report ID"
            type="text"
            value={formData.daily_operations_report_id}
            handleChange={handleInputChange("daily_operations_report_id")}
          />
          <FormControlCard
            labelForm="BHA Number"
            placeholder="Enter BHA Number"
            type="number"
            value={formData.bha_number}
            handleChange={handleInputChange("bha_number")}
          />
          <FormControlCard
            labelForm="BHA Run"
            placeholder="Enter BHA Run"
            type="number"
            value={formData.bha_run}
            handleChange={handleInputChange("bha_run")}
          />
          <Box>
            <strong>Components:</strong>
            <Flex gap={2}  flexDirection={"column"}>
              {formData.components.map((comp, index) => (
                <Flex key={index} gap={2} align={"center"}>
                  <Input
                    placeholder="Component Name"
                    value={comp.component}
                    onChange={handleInputChange("component", index)}
                  />
                  <Input
                    placeholder="Outer Diameter"
                    type="number"
                    value={comp.outer_diameter}
                    onChange={handleInputChange("outer_diameter", index)}
                  />
                  <Input
                    placeholder="Length"
                    type="number"
                    value={comp.length}
                    onChange={handleInputChange("length", index)}
                  />
                </Flex>
              ))}
            </Flex>
            <Button mt={4} colorScheme="blue" onClick={handleAddComponent}>
              Add Component
            </Button>
          </Box>
        </CardFormK3>
      </GridItem>
    </Grid>
  );
};

export default BottomHoleAssembly;
