import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import GridLayout from "../../Layout/GridLayout";
import { Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
const WellLocation = () => {
  return (
    <CardFormK3
      title="Well Location"
      icon={FaOilWell}
      subtitle="Well Location"
      iconColor="black"
      padding="18px 36px"
    >
      <Flex gap={4}>
        <FormControlCard
          type="number"
          labelForm="Surface Longitude"
          placeholder="Surface Longitude"
        />
        <FormControlCard
          type="number"
          labelForm="Surface Latitude"
          placeholder="Surface Latitude"
        />
      </Flex>

      <HStack>
        <FormControlCard
          type="number"
          labelForm="Bottom Hole Longtitude"
          placeholder="Bottom Hole Longtitude"
        />
        <FormControlCard
          type="number"
          labelForm="Bottom Hole Latitude"
          placeholder="Bottom Hole Latitude"
        />
      </HStack>
    </CardFormK3>
  );
};

export default WellLocation;
