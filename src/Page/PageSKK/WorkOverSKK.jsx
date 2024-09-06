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

const WorkOverSKK = () => {
  const [dataSummarySKK, setDataSummarySKK] = useState(null);
  const [dataCharts, setDataCharts] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);
  const [dataRigTypePieChart, setDataRigTypePieChart] = useState([]);
  const [dataBudgetSummary, setDataBudgetSummary] = useState([]);
  const [dataJobWellStatus, setDataJobWellStatus] = useState([]);

  // Define pieChartData here
  const pieChartData = {
    type: "pie",
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    values: [12, 19, 3, 5, 2, 3],
    hole: 0.4,
    pull: [0.1, 0, 0, 0, 0, 0],
    marker: {
      colors: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 159, 64, 0.6)",
      ],
      line: {
        color: "rgba(255, 255, 255, 1)",
        width: 2,
      },
    },
    textinfo: "label+percent",
    hoverinfo: "label+value",
    hoverlabel: {
      bgcolor: "white",
      bordercolor: "gray",
    },
  };

  const layout = {
    height: 400,
    width: 400,
    showlegend: true,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
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

        if (Array.isArray(dataTableRealization.workover)) {
          const processedData = dataTableRealization.workover.map(
            (item) => ({
              id: item.kkks_id,
              kkks: item.kkks_name,
              rencana: item.approved_plans,
              realisasi: item.completed_operations,
              persentase: item.realization_percentage,
            })
          );
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

  // BUDGET DATA BAR CHART
  const dataBudget = dataBudgetSummary?.charts?.Exploration
    ? dataBudgetSummary.charts.Exploration
    : null;

  const fixDataBudget = dataBudget ? dataBudget : "loading...";

  // console.log("fixDataBudget", fixDataBudget);

  // JOB WELLS STATUS SELESAI
  const dataJobWells = dataJobWellStatus?.exploration?.chart
    ? dataJobWellStatus.exploration.chart
    : null;

  console.log("testcoy", dataJobWells);

  const fixDataJobWells = dataJobWells
    ? JSON.parse(dataJobWells)
    : "loading...";

  // console.log('sama kontol satu:', fixDataJobWells.data[0].values);

  //   if (fixDataJobWells.data[0].values && fixDataJobWells.data[0].values.length === 0) {
  //     console.log("Data tidak tersedia");
  // } else {
  //     console.log("fixDataJobWells", fixDataJobWells);
  // }

  const workOverRealisasi = dataSummarySKK
    ? dataSummarySKK.Workover.operating
    : "Loading...";
  const workOverRencana = dataSummarySKK
    ? dataSummarySKK.Workover.approved
    : "Loading...";
  const workOverSelesai = dataSummarySKK
    ? dataSummarySKK.Workover.finished
    : "Loading...";


  return (
    <Flex gap={6} direction={"column"}>
      <Text
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily="Montserrat"
      >
        Work Over
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={workOverRencana}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={workOverRealisasi}
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
          number={workOverSelesai}
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
        title="Realisasi Kegiatan Work Over"
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
      </Flex>

      <Flex mt={5}>
        <HeaderCard
          icon={IconMapPin2}
          title="Realisasi Kegiatan Work Over"
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

export default WorkOverSKK;