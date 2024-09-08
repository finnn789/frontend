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
  IconTruck,
  IconMapPin2,
} from "@tabler/icons-react";

const Exploration = () => {
  const [dataSummarySKK, setSummarySKK] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);
  const [dataRigTypePieChart, setDataRigTypePieChart] = useState(null);
  const [dataBudgetSummaryChart, setDataBudgetSummaryChart] = useState(null);
  const [dataJobWellStatusChart, setDataJobWellStatusChart] = useState(null);
  const [dataCharts, setDataCharts] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const dataJobDasboardResponse = await getJobDasboard("exploration");
 
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
          setDataRigTypePieChart(dataJobDasboardResponse.environment_type_graph);
          setDataBudgetSummaryChart(dataJobDasboardResponse.cost_graph);
          setDataJobWellStatusChart(dataJobDasboardResponse.status_akhir_graph);
        } else {
          setDataTableReal([]); // Handle error atau set array kosong
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // RIG TYPE DATA PIE CHART
  const fixDataPieRigType = dataRigTypePieChart
    ? dataRigTypePieChart
    : null;

  // console.log("fixDataPieRigType.data", fixDataPieRigType.data);

  // BUDGET DATA BAR CHART
  const fixDataBudget = dataBudgetSummaryChart
    ? dataBudgetSummaryChart
    : null;

  // console.log("fixDataBudget", fixDataBudget);

  // JOB WELLS STATUS SELESAI
  const dataJobWells = dataJobWellStatusChart
    ? dataJobWellStatusChart
    : null;

  // console.log("testcoy", dataJobWells);

  const fixDataJobWells = dataJobWells
    ? dataJobWells
    : "loading...";

  // console.log('sama kontol satu:', fixDataJobWells.data[0].values);

  //   if (fixDataJobWells.data[0].values && fixDataJobWells.data[0].values.length === 0) {
  //     console.log("Data tidak tersedia");
  // } else {
  //     console.log("fixDataJobWells", fixDataJobWells);
  // }

  const explorationRealisasi = dataSummarySKK
    ? dataSummarySKK.realisasi
    : "Loading...";
  const explorationRencana = dataSummarySKK
    ? dataSummarySKK.rencana
    : "Loading...";
  const explorationSelesai = dataSummarySKK
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
        Eksplorasi
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={explorationRencana}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={explorationRealisasi}
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
          number={explorationSelesai}
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
        title="Realisasi Kegiatan Eksplorasi"
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
          title="Status Akhir"
          subtitle="Status akhir sumur"
        >
          <Box width="100%" height="100%">
            {fixDataJobWells ? (
              <PieChart3D
                data={fixDataJobWells.data}
                layout={{
                  ...fixDataJobWells.layout,
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
          {/* {fixDataJobWells.data.values && fixDataJobWells.data.values.length === 0 ? (
              <PieChart3D
                data={fixDataJobWells.data}
                layout={{
                  ...fixDataJobWells.layout,
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
        <HeaderCard
          icon={IconTruck}
          title="Total Rig"
          subtitle="Total rig yang beroperasi"
        >
          <Box width="100%" height="100%">
            {fixDataPieRigType ? (
              <PieChart3D
                data={fixDataPieRigType.data}
                layout={{
                  ...fixDataPieRigType.layout,
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
        </HeaderCard>
      </Flex>

      <Flex mt={5}>
        <HeaderCard
          icon={IconMapPin2}
          title="Realisasi Kegiatan Eksplorasi"
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

export default Exploration;
