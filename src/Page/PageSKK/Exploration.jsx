import React from "react";
import HeaderCard from "./Components/Card/HeaderCard";
import { FaBriefcase } from "react-icons/fa";
// import AmCharts from '@amcharts/amcharts3-react';
import BarChartComponent from "./Components/Card/3DBarchart";
import { Flex } from "@chakra-ui/react";
import PieChart3D from "./Components/Card/3DPieChart";
import TableComponent from "./Components/Card/AGGridCustom";
import Footer from "./Components/Card/Footer";

const Exploration = () => {
  const data = [
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
    width: 500,
    showlegend: true,
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
  };
  const tableData = [
    { kkks: "KKKS01", rencana: 100, realisasi: 25, persentase: 25 },
    { kkks: "KKKS02", rencana: 150, realisasi: 90, persentase: 60 },
    { kkks: "KKKS03", rencana: 200, realisasi: 160, persentase: 80 },
    { kkks: "KKKS04", rencana: 120, realisasi: 50, persentase: 41.7 },
  ];

  return (
    <>
      <HeaderCard
        title="Realisasi Kegiatan Eksplorasi"
        subtitle="Realisasi pekerjaan tiap bulan"
        icon={FaBriefcase}
      >
        <BarChartComponent />
      </HeaderCard>
      <Flex flexDirection={"row"} width={"100%"} mt={10} gap={4}>
        <HeaderCard
          title="Plan vs Actual Cost"
          subtitle="million US$ - field estimate"
          icon={FaBriefcase}
        >
          <PieChart3D data={data} layout={layout} />
        </HeaderCard>
        <HeaderCard
          title="Status Akhir"
          subtitle="Status akhir sumur"
          icon={FaBriefcase}
        >
          <PieChart3D data={data} layout={layout} />
        </HeaderCard>
        <HeaderCard
          title="Total Rig"
          subtitle="Total rig yang beroperasi"
          icon={FaBriefcase}
        >
          <PieChart3D data={data} layout={layout} />
        </HeaderCard>
      </Flex>
      <Flex mt={10}>
        <HeaderCard
          title="Realisasi Kegiatan Eksplorasi"
          subtitle="Realisasi pekerjaan tiap bulan"
          icon={FaBriefcase}
        >
          <TableComponent data={tableData} />
        </HeaderCard>
          </Flex>
          <Flex mt={10}>
          <Footer/>
          </Flex>
    </>
  );
};

export default Exploration;
