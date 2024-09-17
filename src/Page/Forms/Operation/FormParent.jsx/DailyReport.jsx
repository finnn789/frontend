import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PostOperationReport } from "../../../API/PostKkks";
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
import FormControlCard from "../../Components/FormControl";
import MudVolumes from "../FormHandling/MudVolumes";

const DailyReport = () => {
  const [handleData, setHandleData] = React.useState({
    report_date: "2024-09-15",
    avg_wob: 0,
    avg_rop: 0,
    avg_rpm: 0,
    torque: 0,
    stand_pipe_pressure: 0,
    flow_rate: 0,
    string_weight: 0,
    rotating_weight: 0,
    total_drilling_time: 0,
    circulating_pressure: 0,
    daily_cost: 0,
    daily_mud_cost: 0,
    day_supervisor: 0,
    night_supervisor: 0,
    engineer: 0,
    geologist: 0,
    day_summary: "string",
    day_forecast: "string",
    last_size: 0,
    set_md: 0,
    next_size: 0,
    next_set_md: 0,
    last_lot_emw: 0,
    tol: 0,
    start_mud_volume: 0,
    lost_surface_mud_volume: 0,
    lost_dh_mud_volume: 0,
    dumped_mud_volume: 0,
    built_mud_volume: 0,
    ending_mud_volume: 0,
    max_gas: 0,
    conn_gas: 0,
    trip_gas: 0,
    back_gas: 0,
    annular_velocity: 0,
    pb: 0,
    sys_hhp: 0,
    hhpb: 0,
    hsi: 0,
    percent_psib: 0,
    jet_velocity: 0,
    impact_force: 0,
    if_area: 0,
    stop_cards: 0,
    lta: "Y",
    spill: "Y",
    h2s_test: "Y",
    hse_mtg: "Y",
    kicktrip: "Y",
    kickdrill: "Y",
    fire: "Y",
    job_id: "string",
    personnel: [
      {
        daily_operations_report_id: "string",
        company: "string",
        people: 0,
      },
    ],
    Incidents: [
      {
        daily_operations_report_id: "string",
        incidents_time: "2024-09-15T13:07:01.717Z",
        incident: "string",
        incident_type: "string",
        comments: "string",
      },
    ],
    time_breakdowns: [
      {
        daily_operations_report_id: "string",
        start_time: "13:07:01.717Z",
        end_time: "13:07:01.717Z",
        start_measured_depth: 0,
        end_measured_depth: 0,
        category: "DRILLING",
        p: "Y",
        npt: "NP",
        code: "(1) Rig Up and Tear Down",
        operation: "string",
      },
    ],
    bit_records: [
      {
        daily_operations_report_id: "string",
        id: "string",
        bit_size: 0,
        bit_number: 0,
        bit_run: 0,
        manufacturer: "string",
        iadc_code: "string",
        jets: "string",
        serial: "string",
        depth_out: 0,
        depth_in: 0,
        meterage: 0,
        bit_hours: 0,
        nozzels: 0,
        dull_grade: "string",
      },
    ],
    bottom_hole_assemblies: [
      {
        daily_operations_report_id: "string",
        bha_number: 0,
        bha_run: 0,
        components: [
          {
            component: "Bumper Sub",
            outer_diameter: 0,
            length: 0,
          },
        ],
      },
    ],
    drilling_fluids: [
      {
        daily_operations_report_id: "string",
        mud_type: "LIQUID",
        time: "2024-09-15T13:07:01.717Z",
        mw_in: 0,
        mw_out: 0,
        temp_in: 0,
        temp_out: 0,
        pres_grad: 0,
        visc: 0,
        pv: 0,
        yp: 0,
        gels_10_sec: 0,
        gels_10_min: 0,
        fluid_loss: 0,
        ph: 0,
        solids: 0,
        sand: 0,
        water: 0,
        oil: 0,
        hgs: 0,
        lgs: 0,
        ltlp: 0,
        hthp: 0,
        cake: 0,
        e_stb: 0,
        pf: 0,
        mf: 0,
        pm: 0,
        ecd: 0,
      },
    ],
    mud_additives: [
      {
        daily_operations_report_id: "string",
        mud_additive_type: "string",
        amount: 0,
      },
    ],
    bulk_materials: [
      {
        material_type: "string",
        material_name: "string",
        material_uom: "string",
        received: 0,
        consumed: 0,
        returned: 0,
        adjust: 0,
        ending: 0,
        daily_operations_report_id: "string",
      },
    ],
    directional_surveys: [
      {
        measured_depth: 0,
        inclination: 0,
        azimuth: 0,
        daily_operations_report_id: "string",
      },
    ],
    pumps: [
      {
        slow_speed: "Y",
        circulate: 0,
        strokes: 0,
        pressure: 0,
        liner_size: 0,
        efficiency: 0,
        daily_operations_report_id: "string",
      },
    ],
    weather: [
      {
        temperature_high: 0,
        temperature_low: 0,
        chill_factor: 0,
        wind_speed: 0,
        wind_direction: 0,
        barometric_pressure: 0,
        wave_height: 0,
        wave_current_speed: 0,
        road_condition: "string",
        visibility: "string",
        daily_operations_report_id: "string",
      },
    ],
  });

  console.log(handleData);

  const postData = async () => {
    try {
      const response = await PostOperationReport(handleData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeNoName = React.useCallback(
    (data) => {
      setHandleData((prev) => ({ ...prev, ...data }));
    },
    [setHandleData]
  );

  // Menggunakan useCallback untuk handleDataWithName
  const handleDataWithName = React.useCallback(
    (name) => (data) => {
      setHandleData((prev) => ({ ...prev, [name]: data }));
    },
    [setHandleData]
  );
  return (
    <>
      <CardFormK3 title="" subtitle="" icon={null}>
        <Flex padding={"2px 14px"}>
          <Text fontSize="2xl"  fontWeight="bold" color="gray.700">
            Daily Report
          </Text>
          <Spacer />

          <Button colorScheme="teal" onClick={postData}>+ Update</Button>
        </Flex>
        <SimpleGrid columns={1} spacing={2}>
          <DailyDates handleChangeOfData={handleChangeNoName} />
          <TimeBreakdown handleChange={handleDataWithName("time_breakdowns")} />
          <DrillingFluid
            handleChangeOfData={handleDataWithName("drilling_fluids")}
          />
          <MudAdditive
            handleChangeOfData={handleDataWithName("mud_additives")}
          />
          <BottomHoleAssembly handleFormData={handleDataWithName("bottom_hole_assemblies")} />
          <BitRecord handleChangeOfData={handleDataWithName("bit_records")} />
          <CasingOps handleChangeOfData={handleDataWithName("casing_operations")} />
          <MudVolumes handleChangeOfData={handleChangeNoName} />
          <GasForm handleChangeOfData={handleChangeNoName} />
          <HydraulicAnalysisForm handleChangeOfData={handleChangeNoName} />
          <MaterialForm
            handleChangeOfData={handleDataWithName("bulk_materials")}
          />
          <HealthSafety handleChangeDataIncident={handleDataWithName("Incidents")} />
          <DirectionalSurvey
            handleChangeOfData={handleDataWithName("directional_surveys")}
          />
          <Personel handleChangeOfData={handleDataWithName("personels")} />
          <Pumps handleChangeOfData={handleDataWithName("pumps")} />
          <WeatherForm data={handleDataWithName("weather")} />
        </SimpleGrid>
      </CardFormK3>
    </>
  );
};

export default DailyReport;
