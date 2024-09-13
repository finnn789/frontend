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
import CasingOps from "../FormHandling/Casing";
import GasForm from "../FormHandling/Gas";
import HydraulicAnalysisForm from "../FormHandling/HydraulicAnalisys";
import MaterialForm from "../FormHandling/MaterialForm";
import HealthSafety from "../FormHandling/HealthSafety";
import DirectionalSurvey from "../FormHandling/DirectionalSurvey";
import Personel from "../FormHandling/Personel";
import Pumps from "../FormHandling/Pumps";
import WeatherForm from "../FormHandling/WeatherForm";

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
        <CasingOps/>
        <GasForm/>
        <HydraulicAnalysisForm/>
        <MaterialForm/>
        <HealthSafety/>
        <DirectionalSurvey/>
        <Personel/>
        <Pumps/>
        <WeatherForm/>
      </SimpleGrid>
    </>
  );
};

export default DailyReport;
