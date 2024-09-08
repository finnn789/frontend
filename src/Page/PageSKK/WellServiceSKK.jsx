import { useEffect, useState } from "react";
import HeaderCard from "./Components/Card/HeaderCard";
import BarChartComponent from "./Components/Card/3DBarchart";
import PieChart3D from "./Components/Card/3DPieChart";
import TableComponent from "./Components/Card/AGGridCustom";
import Footer from "./Components/Card/Footer";
import PerhitunganCard from "./Components/Card/CardPerhitunganBox";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import {
  getJobDasboard
} from "../API/APISKK";
import {
  IconCalendar,
  IconChartBar,
  IconChecks,
  IconMapPin2,
} from "@tabler/icons-react";

const WellService = () => {
  const [dataSummarySKK, setSummarySKK] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);
  const [dataBudgetSummaryChart, setDataBudgetSummaryChart] = useState(null);
  const [dataJobProductionGain, setDataJobProductionGain] = useState(null);
  const [dataCharts, setDataCharts] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const dataJobDasboardResponse = await getJobDasboard("wellservice");
 
        setSummarySKK(dataJobDasboardResponse.summary);
        // console.log(dataJobDasboard.summary);
        
        // Set dataChart ke dalam state dataCharts
        setDataCharts(dataJobDasboardResponse.job_graph.month);

        if (Array.isArray(dataJobDasboardResponse.tablekkks)) {
          const processedData = dataJobDasboardResponse.tablekkks.map(
            (item) => ({
              id: item.id,
              kkks: item.name,
              rencana: item.rencana,
              realisasi: item.realisasi,
              persentase: item.percentage,
            })
          );
          setDataTableReal(processedData);
          setDataBudgetSummaryChart(dataJobDasboardResponse.cost_graph);
          setDataJobProductionGain(dataJobDasboardResponse.well_stimulation_graph);
        } else {
          setDataTableReal([]); // Handle error atau set array kosong
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);



  // console.log("fixDataPieRigType.data", fixDataPieRigType.data);

  // BUDGET DATA BAR CHART
  const fixDataBudget = dataBudgetSummaryChart
    ? dataBudgetSummaryChart
    : null;

  // console.log("fixDataBudget", fixDataBudget);

  // JOB WELLS STATUS SELESAI
  const dataJobGain = dataJobProductionGain
    ? dataJobProductionGain
    : null;

  // console.log("testcoy", dataJobGain);

  const fixDataJobGain = dataJobGain
    ? dataJobGain
    : "loading...";

  // console.log('sama kontol satu:', fixDataJobGain.data[0].values);

  //   if (fixDataJobGain.data[0].values && fixDataJobGain.data[0].values.length === 0) {
  //     console.log("Data tidak tersedia");
  // } else {
  //     console.log("fixDataJobGain", fixDataJobGain);
  // }

  const wellserviceRealisasi = dataSummarySKK
    ? dataSummarySKK.realisasi
    : "Loading...";
  const wellserviceRencana = dataSummarySKK
    ? dataSummarySKK.rencana
    : "Loading...";
  const wellserviceSelesai = dataSummarySKK
    ? dataSummarySKK.selesai
    : "Loading...";


  return (
    <Flex gap={6} direction={"column"}>
      <Text
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily="Montserrat"
      >
        WellService
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={wellserviceRencana}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={wellserviceRealisasi}
          bgIcon="green.100"
          iconColor="green.500"
          label="Realisasi"
          subLabel="Sejak kemarin"
          percentage={
            <Flex>
              <Icon boxSize={5} color="green.500" as={RiArrowRightUpLine} />
              <Text fontSize="sm" color="green.500" fontFamily={"Montserrat"}>
                3.46%
              </Text>
            </Flex>
          }
        />
        <PerhitunganCard
          number={wellserviceSelesai}
          label="Selesai"
          bgIcon="red.100"
          iconColor="red.500"
          subLabel="Sejak kemarin"
          percentage={
            <Flex>
              <Icon boxSize={5} color="green.500" as={RiArrowRightUpLine} />
              <Text fontSize="sm" color="green.500" fontFamily={"Montserrat"}>
                1%
              </Text>
            </Flex>
          }
        />
      </Flex>

      <HeaderCard
        icon={IconCalendar}
        title="Realisasi Kegiatan WellService"
        subtitle="Realisasi pekerjaan tiap bulan"
      >
        <Box width="100%" height="100%">
          {dataCharts ? (
            <BarChartComponent
              datas={dataCharts.data}
              layouts={{
                ...dataCharts.layout,
                autosize: true,
                width: undefined, // Supaya tidak ada pengaturan lebar statis
                height: 400, // Supaya tidak ada pengaturan tinggi statis
                responsive: true, // Membuat chart responsif
              }}
              style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
              useResizeHandler={true} // Mengaktifkan penanganan resize
            />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </HeaderCard>
      {/* // chart tiga */}
      <Flex flexDirection={"row"} width={"100%"} mt={5} gap={4}>
        <HeaderCard
          icon={IconChartBar}
          title="Plan vs Actual Cost"
          subtitle="Perbandingan Perencanaan dan Realisasi"
        >
          <Box width="100%" height="100%">
            {fixDataBudget ? (
              <PieChart3D
                data={fixDataBudget.data}
                layout={{
                  ...fixDataBudget.layout,
                  autosize: true,
                  width: undefined, // Supaya tidak ada pengaturan lebar statis
                  height: 400, // Supaya tidak ada pengaturan tinggi statis
                  responsive: true, // Membuat chart responsif
                }}
                style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
                useResizeHandler={true} // Mengaktifkan penanganan resize
              />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </HeaderCard>
        <HeaderCard
          icon={IconChecks}
          title="Production Gain"
          subtitle="Hasil gain prduksi dari pekerjaan"
        >
          <Box width="100%" height="100%">
            {fixDataJobGain ? (
              <PieChart3D
                data={fixDataJobGain.data}
                layout={{
                  ...fixDataJobGain.layout,
                  autosize: true,
                  width: undefined,
                  height: 400,
                  responsive: true,
                }}
                style={{ width: "100%", height: "100" }}
                useResizeHandler={true}
              />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
          {/* {fixDataJobGain.data.values && fixDataJobGain.data.values.length === 0 ? (
              <PieChart3D
                data={fixDataJobGain.data}
                layout={{
                  ...fixDataJobGain.layout,
                  autosize: true,
                  width: undefined,
                  height: 400,
                  responsive: true,
                }}
                style={{ width: "100%", height: "100" }}
                useResizeHandler={true}
              />
            ) : (
              <div>Data tidak tersedia</div>
            )} */}
        </HeaderCard>
      </Flex>

      <Flex mt={5}>
        <HeaderCard
          icon={IconMapPin2}
          title="Realisasi Kegiatan WellService"
          subtitle="Realisasi pekerjaan tiap bulan"
        >
          <TableComponent data={dataTableReal} />
        </HeaderCard>
      </Flex>
      <Flex mt={5}>
        <Footer />
      </Flex>
    </Flex>
  );
};

export default WellService;