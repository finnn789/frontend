import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import GridLayout from "../../Layout/GridLayout";
import { Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";
const WellProfile = () => {
  
  return (
    <CardFormK3 title="Well Profile" icon={FaOilWell} subtitle="Well Profile" iconColor="black" padding="18px 36px" >
      <Flex gap={2}>
        <FormControlCard labelForm="AFE Number" placeholder="Area"  />
        <FormControlCard labelForm="Total Budget" placeholder="Area"  />
      </Flex>
      <VStack>
        <FormControlCard labelForm="WP&B Year" placeholder="WP&B Year"  />
        <FormControlCard type="date" labelForm="Start Date" placeholder="WP&B Year"  />
      </VStack>
      <HStack>
        <FormControlCard type="text" labelForm="Rig Type" placeholder="Rig Type"  />
        <FormControlCard type="text" labelForm="Rig Name" placeholder="Rig Name"  />
      </HStack>
      <VStack>
        <FormControlCard type="text" labelForm="Rig Horse Power" placeholder="Rig Horse Power" inputRightOn={"HP"} />
      </VStack>
    </CardFormK3>
  );
};

export default WellProfile;
