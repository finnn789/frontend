import { Box, Grid, HStack, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import SimpleButton from "../../Components/SimpleButton";
import DailyDates from "../FormHandling/DailyDates";
import CardFormK3 from "../../Components/CardFormK3";
import TimeBreakdown from "../FormHandling/TimeBreakdown";
import DrillingFluid from "../FormHandling/DrillingFluid";
import MudAdditive from "../FormHandling/MudAdditive";
import BottomHoleAssembly from "../FormHandling/BottomHoleAssembly";
import BitRecord from "../FormHandling/BitRecord";

const DailyReport = () => {
  return (
    <>
      <SimpleGrid columns={1} spacing={2}>
        <DailyDates />
        <TimeBreakdown />
        <DrillingFluid/>
        <MudAdditive/>
        <BottomHoleAssembly/>
        <BitRecord/>
      </SimpleGrid>
    </>
  );
};

export default DailyReport;
