import { useEffect, useState } from "react";
import HeaderCard from "./Components/Card/HeaderCard";
import BarChartComponent from "./Components/Card/3DBarchart";
import PieChart3D from "./Components/Card/3DPieChart";
import TableComponent from "./Components/Card/AGGridCustom";
import Footer from "./Components/Card/Footer";
import PerhitunganCard from "./Components/Card/CardPerhitunganBox";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { getBarChartDataSKK, getTableRealization } from "../API/APISKK";

const Exploration = () => {
  const [dataCharts, setDataCharts] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);

  // Define pieChartData here
  const pieChartData = [
    {
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
    },
  ];

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
        const dataChart = await getBarChartDataSKK(); // Ambil data dari API
        const dataTableRealization = await getTableRealization();

        // Set dataChart ke dalam state dataCharts
        setDataCharts(dataChart);

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

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // console.log('asdawd', dataCharts.data);
  

  return (
    <Flex gap={6} direction={"column"}>
      <Text fontSize={"2em"} fontWeight={"bold"} color={"gray.600"} fontFamily="Montserrat">
        Eksplorasi
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={200}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={100}
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
          number={1}
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
        title="Realisasi Kegiatan Eksplorasi"
        subtitle="Realisasi pekerjaan tiap bulan"
      >
        {dataCharts ? (
          <BarChartComponent datas={dataCharts.data} layout={dataCharts.layout} />
        ) : (
          <p>Loading...</p>
        )}
      </HeaderCard>
      <Flex flexDirection={"row"} width={"100%"} mt={5} gap={4}>
        <HeaderCard
          title="Plan vs Actual Cost"
          subtitle="Perbandingan Perencanaan dan Realisasi"
        >
          <PieChart3D data={pieChartData} layout={layout} />
        </HeaderCard>
        <HeaderCard
          title="Status Akhir"
          subtitle="Status akhir sumur"
        >
          <PieChart3D data={pieChartData} layout={layout} />
        </HeaderCard>
        <HeaderCard
          title="Total Rig"
          subtitle="Total rig yang beroperasi"
        >
          <PieChart3D data={pieChartData} layout={layout} />
        </HeaderCard>
      </Flex>
      <Flex mt={5}>
        <HeaderCard
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
