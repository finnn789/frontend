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
  getBarChartDataSKK,
  // getTableRealization,
  getJobTypeSummarySKK,
  getRigTypePieChart,
  getBudgetSummaryCharts,
  getJobWellStatusChart,
} from "../API/APISKK";
import {
  IconCalendar,
  IconChartBar,
  IconChecks,
  IconTruck,
  IconMapPin2,
} from "@tabler/icons-react";

const DevelopmentSKK = () => {
  const [dataSummarySKK, setDataSummarySKK] = useState(null);
  const [dataCharts, setDataCharts] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);
  const [dataRigTypePieChart, setDataRigTypePieChart] = useState([]);
  const [dataBudgetSummary, setDataBudgetSummary] = useState([]);
  const [dataJobWellStatus, setDataJobWellStatus] = useState([]);

   useEffect(() => {
    const getData = async () => {
      try {
        const dataSummarySKK = await getJobTypeSummarySKK();
        const dataChart = await getBarChartDataSKK(); // Ambil data dari API
        // const dataTableRealization = await getTableRealization();
        const dataRigTypePieChart = await getRigTypePieChart();
        const dataBudgetSummary = await getBudgetSummaryCharts();
        const dataJobWellStatus = await getJobWellStatusChart();

        setDataSummarySKK(dataSummarySKK);
        // Set dataChart ke dalam state dataCharts
        setDataCharts(dataChart);

        console.log('dataTableRealization', dataTableRealization);
        

        if (Array.isArray(dataTableRealization)) {
          const processedData = dataTableRealization.map((item) => ({
            id: item.kkks_id,
            kkks: item.kkks_name,
            rencana: item.approved_plans,
            realisasi: item.completed_operations,
            persentase: item.realization_percentage,
          }));
          setDataTableReal(processedData);
        } else {
          console.error("Expected an array but got:", dataTableRealization);
          setDataTableReal([]); // Handle error atau set array kosong
        }

        setDataRigTypePieChart(dataRigTypePieChart); // Pie Chart Rig
        setDataBudgetSummary(dataBudgetSummary); // Bar Chart Budget
        setDataJobWellStatus(dataJobWellStatus); // Chart Status Selesai
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // RIG TYPE DATA PIE CHART
  const dataPieRigType = dataRigTypePieChart?.development?.chart_data
    ? dataRigTypePieChart.development.chart_data
    : null;

  const fixDataPieRigType = dataPieRigType
    ? JSON.parse(dataPieRigType)
    : "loading...";

  // console.log("fixDataPieRigType.data", fixDataPieRigType.data);

  // BUDGET DATA BAR CHART
  const dataBudget = dataBudgetSummary?.charts?.Development
    ? dataBudgetSummary.charts.Development
    : null;

  const fixDataBudget = dataBudget ? dataBudget : "loading...";

  // console.log("fixDataBudget", fixDataBudget);

  // JOB WELLS STATUS SELESAI
  const dataJobWells = dataJobWellStatus?.development?.chart
    ? dataJobWellStatus.development.chart
    : null;

  // console.log("testcoy", dataJobWells);

  const fixDataJobWells = dataJobWells
    ? JSON.parse(dataJobWells)
    : "loading...";

  console.log("fixDataJobWells", fixDataJobWells);

  const developmentRealisasi = dataSummarySKK
  ? dataSummarySKK.Development.operating
  : "Loading...";
const developmentRencana = dataSummarySKK
  ? dataSummarySKK.Development.approved
  : "Loading...";
const developmentSelesai = dataSummarySKK
  ? dataSummarySKK.Development.finished
  : "Loading...";

  // console.log('dataSummarySKK', dataSummarySKK);
  

  // console.log("dataSummarySKK", dataSummarySKK);

  return (
    <Flex gap={6} direction={"column"}>
      <Text
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily="Montserrat"
      >
        Development
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={developmentRencana}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={developmentRealisasi}
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
          number={developmentSelesai}
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
        title="Realisasi Kegiatan Development"
        subtitle="Realisasi pekerjaan tiap bulan"
      >
        {dataCharts ? (
          <BarChartComponent
            datas={dataCharts.data}
            layout={dataCharts.layout}
          />
        ) : (
          <p>Loading...</p>
        )}
      </HeaderCard>
      {/* // chart tiga */}
      <Flex flexDirection={"row"} width={"100%"} mt={5} gap={4}>
        <HeaderCard
          icon={IconChartBar}
          title="Plan vs Actual Cost"
          subtitle="Perbandingan Perencanaan dan Realisasi"
        >
          <Box width="100%" height="100%">
            <PieChart3D
              data={fixDataBudget.data}
              layout={{
                ...fixDataBudget.layout,
                autosize: true,
                width: undefined, // Supaya tidak ada pengaturan lebar statis
                height: 600, // Supaya tidak ada pengaturan tinggi statis
                responsive: true, // Membuat chart responsif
              }}
              style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
              useResizeHandler={true} // Mengaktifkan penanganan resize
            />
          </Box>
        </HeaderCard>
        <HeaderCard
          icon={IconChecks}
          title="Status Akhir"
          subtitle="Status akhir sumur"
        >
          <Box width="100%" height="100%">
            <PieChart3D
              data={fixDataJobWells.data}
              layout={{
                ...fixDataJobWells.layout,
                autosize: true,
                width: undefined,
                height: 600,
                responsive: true,
              }}
              style={{ width: "100%", height: "100" }}
              useResizeHandler={true}
            />
          </Box>
        </HeaderCard>
        <HeaderCard
          icon={IconTruck}
          title="Total Rig"
          subtitle="Total rig yang beroperasi"
        >
          <Box width="100%" height="100%">
            <PieChart3D
              data={fixDataPieRigType.data}
              layout={{
                ...fixDataPieRigType.layout,
                autosize: true,
                width: undefined,
                height: 600,
                responsive: true,
              }}
              style={{ width: "100%", height: "100" }}
              useResizeHandler={true}
            />
          </Box>
        </HeaderCard>
      </Flex>

      <Flex mt={5}>
        <HeaderCard
          icon={IconMapPin2}
          title="Realisasi Kegiatan Development"
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

export default DevelopmentSKK;
