import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import GridLayout from "../../Layout/GridLayout";
import { Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
const DirectionalType = () => {
  const directionalTypeOp = [
    {
      value: "J-TYPE",
      label: "J-TYPE",
    },
    {
      value: "S-TYPE",
      label: "S-TYPE",
    },
    {
      value: "DIMENSION",
      label: "DIMENSION",
    },
  ];

  return (
    <CardFormK3
      title="Directional Type"
      icon={FaOilWell}
      subtitle="Directional Type"
      iconColor="black"
      padding="18px 36px"
    >
      <Flex gap={2}>
        <SelectComponent>
          {directionalTypeOp.map((data, index) => (
            <SelectOption key={index} value={data.value} label={data.label} />
          ))}
        </SelectComponent>
      </Flex>
      <VStack>
        <FormControlCard
          type="number"
          labelForm="Kici Of Point"
          placeholder="Kick Of Point"
        />
      </VStack>
      <HStack>
        <FormControlCard
          type="number"
          labelForm="Maximum Inclination"
          placeholder="Maximum Inclination"
        />
        <FormControlCard
          type="number"
          labelForm="Azimuth"
          placeholder="Azimuth"
        />
      </HStack>
    </CardFormK3>
  );
};

export default DirectionalType;
