import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import GridLayout from "../../Layout/GridLayout";
import { Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
const ElevationAndDepth = () => {
  return (
    <CardFormK3
      title="Elevation And Depth"
      icon={FaOilWell}
      subtitle="Elevation And Depth"
      iconColor="black"
      padding="18px 36px"
    >
      <Flex gap={4}>
        <FormControlCard
          type="number"
          labelForm="Rotary Table Elevation"
          placeholder="Rotary Table Elevation"
        />
        <FormControlCard
          type="number"
          labelForm="Kelly Bushing Elevation"
          placeholder="Kelly Bushing Elevation"
        />
      </Flex>

      <HStack>
        <FormControlCard
          type="number"
          labelForm="Derrick Floor Elevation"
          placeholder="Derrick Floor Elevation"
        />
        <FormControlCard
          type="number"
          labelForm="Ground Elevation"
          placeholder="Ground Elevation"
        />
      </HStack>
    </CardFormK3>
  );
};

export default ElevationAndDepth;
