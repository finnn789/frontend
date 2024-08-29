import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Flex,Text } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
const PlanningExp = () => {
  return (
    <div>
      <Text fontSize={"3em"} fontWeight={"bold"}>
        Planning Exploration
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={5}
          icon={FaCopy}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={5}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label="Total SKK"
          subLabel="Total SKK"
        />
        <PerhitunganCard
          number={5}
          label="Total SKK"
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Total SKK"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable />
      </Box>
      <Footer />
    </div>
  );
};

export default PlanningExp;
