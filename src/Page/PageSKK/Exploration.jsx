import React, { useEffect, useState } from "react";
import HeaderCard from "./Components/Card/HeaderCard";
import { FaBriefcase, FaChartLine } from "react-icons/fa";
import { GiChemicalTank } from "react-icons/gi";
import BarChartComponent from "./Components/Card/3DBarchart";
import PieChart3D from "./Components/Card/3DPieChart";
import TableComponent from "./Components/Card/AGGridCustom";
import Footer from "./Components/Card/Footer";
import PerhitunganCard from "./Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { RiArrowRightUpLine } from "react-icons/ri";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { getBarChartDataSKK, getTableRealization } from "../API/APISKK";

const Exploration = () => {
  const [dataCharts, setDataCharts] = useState(null);
  const [dataTableReal, setDataTableReal] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataChart = await getBarChartDataSKK();
        const dataTableRealization = await getTableRealization();

        // Log data to inspect structure
        console.log("API dataTableRealization:", dataTableRealization);

        // Extract data from dataTableRealization
        const dataReal = dataTableRealization.data;

        // Check if dataReal is an array
        if (Array.isArray(dataReal)) {
          // Map data for TableComponent
          const processedData = dataReal.map(item => ({
            id: item.kkks_id,
            kkks: item.kkks_name,
            rencana: item.approved_plans,
            realisasi: item.completed_operations,
            persentase: item.realization_percentage
          }));
          setDataTableReal(processedData);
        } else {
          console.error("Expected an array but got:", dataReal);
          setDataTableReal([]); // Set to empty array or handle as needed
        }

        setDataCharts(dataChart);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

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

  return (
    <>
      <Text fontSize={"3em"} fontWeight={"bold"}>
        Eksplorasi
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={200}
          icon={FaCopy}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={100}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label="Realisasi"
          subLabel="Sejak kemarin"
          percentage={
            <Flex>
              <Icon boxSize={8} color="green.500" as={RiArrowRightUpLine} />
              <Text fontSize="xl" color="green.500">
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
          icon={MdOutlineVerified}
          subLabel="Sejak kemarin"
          percentage={
            <Flex>
              <Icon boxSize={8} color="green.500" as={RiArrowRightUpLine} />
              <Text fontSize="xl" color="green.500">
                1%
              </Text>
            </Flex>
          }
        />
      </Flex>

      <HeaderCard
        title="Realisasi Kegiatan Eksplorasi"
        subtitle="Realisasi pekerjaan tiap bulan"
        icon={FaBriefcase}
      >
        <BarChartComponent />
      </HeaderCard>
      <Flex flexDirection={"row"} width={"100%"} mt={5} gap={4}>
        <HeaderCard
          title="Plan vs Actual Cost"
          subtitle="million US$ - field estimate"
          icon={FaChartLine}
        >
          {dataCharts && dataCharts.charts && dataCharts.charts.exploration ? (
            <PieChart3D
              data={dataCharts.charts.exploration.data}
              layout={dataCharts.charts.exploration.layout}
            />
          ) : (
            <PieChart3D data={pieChartData} layout={layout} />
          )}
        </HeaderCard>

        <HeaderCard
          title="Status Akhir"
          subtitle="Status akhir sumur"
          icon={FaCheck}
        >
          <PieChart3D data={pieChartData} layout={layout} />
        </HeaderCard>
        <HeaderCard
          title="Total Rig"
          subtitle="Total rig yang beroperasi"
          icon={GiChemicalTank}
        >
          <PieChart3D data={pieChartData} layout={layout} />
        </HeaderCard>
      </Flex>
      <Flex mt={5}>
        <HeaderCard
          title="Realisasi Kegiatan Eksplorasi"
          subtitle="Realisasi pekerjaan tiap bulan"
          icon={FaBriefcase}
        >
          <TableComponent data={dataTableReal} />
        </HeaderCard>
      </Flex>
      <Flex mt={5}>
        <Footer />
      </Flex>
    </>
  );
};

export default Exploration;
