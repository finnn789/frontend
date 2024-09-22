import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
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
import { IconInfoCircle } from "@tabler/icons-react";

const DailyReport = ({ job_id }) => {
  const [handleData, setHandleData] = React.useState({
    report_date: "2024-09-20",
    avg_wob: null,
    avg_rop: null,
    avg_rpm: null,
    torque: null,
    stand_pipe_pressure: null,
    flow_rate: null,
    string_weight: null,
    rotating_weight: null,
    total_drilling_time: null,
    circulating_pressure: null,
    daily_cost: null,
    daily_mud_cost: null,
    day_supervisor: null,
    night_supervisor: null,
    engineer: null,
    geologist: null,
    day_summary: null,
    day_forecast: null,
    last_size: null,
    set_md: null,
    next_size: null,
    next_set_md: null,
    last_lot_emw: null,
    tol: null,
    start_mud_volume: null,
    lost_surface_mud_volume: null,
    lost_dh_mud_volume: null,
    dumped_mud_volume: null,
    built_mud_volume: null,
    ending_mud_volume: null,
    max_gas: null,
    conn_gas: null,
    trip_gas: null,
    back_gas: null,
    annular_velocity: null,
    pb: null,
    sys_hhp: null,
    hhpb: null,
    hsi: null,
    percent_psib: null,
    jet_velocity: null,
    impact_force: null,
    if_area: null,
    stop_cards: null,
    lta: null,
    spill: null,
    h2s_test: null,
    hse_mtg: null,
    kicktrip: null,
    kickdrill: null,
    fire: null,
    job_id: job_id,
    personnel: [
      {
        company: null,
        people: null,
      },
    ],
    Incidents: [
      {
        incidents_time: "",
        incident: null,
        incident_type: null,
        comments: null,
      },
    ],
    time_breakdowns: [
      {
        start_time: "16:52:54.442Z",
        end_time: "16:52:54.442Z",
        start_measured_depth: null,
        end_measured_depth: null,
        category: "DRILLING",
        p: null,
        npt: "NP",
        code: "(1) Rig Up and Tear Down",
        operation: null,
      },
    ],
    bit_records: {
      bit_size: null,
      bit_number: null,
      bit_run: null,
      manufacturer: null,
      iadc_code: null,
      jets: null,
      serial: null,
      depth_out: null,
      depth_in: null,
      meterage: null,
      bit_hours: null,
      nozzels: null,
      dull_grade: null,
    },
    bottom_hole_assemblies: [
      {
        bha_number: null,
        bha_run: null,
        components: [],
      },
    ],
    drilling_fluids: [],
    mud_additives: [],
    bulk_materials: [],
    directional_surveys: [],
    pumps: [],
    weather: {
      temperature_high: null,
      temperature_low: null,
      chill_factor: null,
      wind_speed: null,
      wind_direction: null,
      barometric_pressure: null,
      wave_height: null,
      wave_current_speed: null,
      road_condition: null,
      visibility: null,
    },
  });

  console.log(handleData);
  const toast = useToast();
  const postData = async () => {
    try {
      const response = await PostOperationReport(handleData)
      console.log(response);
      if(response.status === 200){
        toast({
          title: "Data Berhasil",
          description: "Data Berhasil",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);
      }
        
      
      // console.log(response);
    } catch (error) {
      console.error(error);
      if (error.response.status === 422) {
        toast({
          title: "Error",
          description: "Harap Periksa Kembali Fieldnya",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      if (error.status === 500) {
        toast({
          title: "500 Server Error",
          description: " Terjadi Kesalahan Pada Server",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      console.error(error);
    }
  };

  const handleChangeBitRecord = (data) =>
    setHandleData((prev) => ({
      ...prev,
      bit_records: [
        data, // BitRecord di posisi pertama
        ...(prev.bit_records[1] ? [prev.bit_records[1]] : []), // Simpan BitRecord2 jika sudah ada
      ],
    }));

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
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Daily Report
          </Text>
          <Spacer />

          <Button colorScheme="teal" onClick={postData}>
            + Update
          </Button>
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

          <CardFormK3 title="Bottom Hole Assemblies" subtitle="BR" icon={IconInfoCircle}>
            <Tabs variant="enclosed-colored">
              <TabList>
                <Tab>BHA 1</Tab>
                <Tab>BHA 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BottomHoleAssembly
                    handleFormData={(data) =>
                      setHandleData((prev) => ({
                        ...prev,
                        bottom_hole_assemblies: [
                          ...(prev.bottom_hole_assemblies[1]
                            ? [prev.bottom_hole_assemblies[1]]
                            : []), // Simpan BitRecord jika sudah ada
                          data, // BitRecord2 di posisi kedua
                        ],
                      }))
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <BottomHoleAssembly
                    handleFormData={(data) =>
                      setHandleData((prev) => ({
                        ...prev,
                        bottom_hole_assemblies: [
                          ...(prev.bottom_hole_assemblies[0]
                            ? [prev.bottom_hole_assemblies[0]]
                            : []), // Simpan BitRecord jika sudah ada
                          data, // BitRecord2 di posisi kedua
                        ],
                      }))
                    }
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardFormK3>

          {/* <BitRecord handleChangeOfData={handleDataWithName("bit_records")} /> */}
          <CardFormK3 title="Bit Record" subtitle="BR" icon={IconInfoCircle}>
            <Tabs variant="enclosed-colored">
              <TabList>
                <Tab>BR 1</Tab>
                <Tab>BR 2</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <BitRecord
                    handleChangeOfData={(data) =>
                      setHandleData((prev) => ({
                        ...prev,
                        bit_records: [
                          ...(prev.bit_records[1] ? [prev.bit_records[1]] : []), // Simpan BitRecord jika sudah ada
                          data, // BitRecord2 di posisi kedua
                        ],
                      }))
                    }
                  />
                </TabPanel>
                <TabPanel>
                  <BitRecord
                    handleChangeOfData={(data) =>
                      setHandleData((prev) => ({
                        ...prev,
                        bit_records: [
                          ...(prev.bit_records[0] ? [prev.bit_records[0]] : []), // Simpan BitRecord jika sudah ada
                          data, // BitRecord2 di posisi kedua
                        ],
                      }))
                    }
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardFormK3>

          {/* <BitRecord2
            handleChangeOfData={(data) =>
              setHandleData((prev) => ({
                ...prev,
                bit_records: [
                  ...(prev.bit_records[0] ? [prev.bit_records[0]] : []), // Simpan BitRecord jika sudah ada
                  data, // BitRecord2 di posisi kedua
                ],
              }))
            }
          /> */}

          <CasingOps handleChangeOfData={handleChangeNoName} />
          <MudVolumes handleChangeOfData={handleChangeNoName} />
          <GasForm handleChangeOfData={handleChangeNoName} />
          <HydraulicAnalysisForm handleChangeOfData={handleChangeNoName} />
          <MaterialForm
            handleChangeOfData={handleDataWithName("bulk_materials")}
          />
          <HealthSafety
            handleChangeOfData={handleChangeNoName}
            handleChangeDataIncident={handleDataWithName("Incidents")}
          />
          <DirectionalSurvey
            handleChangeOfData={handleDataWithName("directional_surveys")}
          />
          <Personel handleChangeOfData={handleDataWithName("personnel")} />
          <Pumps handleChangeOfData={handleDataWithName("pumps")} />
          <WeatherForm data={handleDataWithName("weather")} />
        </SimpleGrid>
      </CardFormK3>
    </>
  );
};

export default DailyReport;
