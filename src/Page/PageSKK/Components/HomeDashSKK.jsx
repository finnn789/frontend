import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";

import {
  FaArrowAltCircleUp,
  FaBriefcase,
  FaInfoCircle,
  FaRegClock,
} from "react-icons/fa";
import HeaderCard from "./Card/HeaderCard";
import ThreeDBarChartComponent from "./Card/3DBarchart";
import WellTable from "../../Components/Card/WellTable";
import TableDashboard from "../../Components/Card/TableDashboard";

import { BiBriefcase } from "react-icons/bi";
import ProgressTable from "./Card/Progressbar";
import {
  getDataDashboardSKK,
  getChartDashboardSKK,
  getKKSJobdata,
} from "../../API/APISKK";

const HomeDashSKK = () => {
  const [datas, setDatas] = React.useState([]);
  const [dataCharts, setDataCharts] = React.useState([]);
  const [dataTable, setDataTable] = React.useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getDataDashboardSKK();
      const chart = await getChartDashboardSKK();
      const tableData = await getKKSJobdata();
      setDatas(data);
      setDataCharts(chart);
      setDataTable(tableData);
    };

    getData();
  }, []);

  console.log(dataTable);

  const dataPerubahan = (data) => {
    return (
      <>
        <Flex gap={1}>
          <FaArrowAltCircleUp color="green" size={20} />
          <Text fontSize={"18px"} color={"green"}>
            {data}
          </Text>
        </Flex>
      </>
    );
  };

  const headerTable1 = [
    "Info",
    "Pekerjaan",
    "Rencana WP&B",
    "Realisasi 2024",
    "Percentage",
  ];
  const headerTable2 = [
    "Info",
    "KKKS",
    "Explorasi",
    "Exploitasi",
    "Work Over",
    "Well Service",
  ];

  const dataKks = React.useMemo(() => {
    if (!dataTable) return [];

    const formatToPersen = (value) => `${value}%`;

    return dataTable.map((item, index) => ({
      no: index + 1,
      id: item.id,
      kkks: item.nama_kkks,
      exploration: parseInt(item.exploration.percentage),
      development: parseInt(item.development.percentage),
      workover: parseInt(item.workover.percentage),
      wellservice: parseInt(item.wellservice.percentage),
    }));
  }, [dataTable]);

  console.log(dataKks);

  const data = () => {
    if (!datas) return [];
    return [
      {
        id: 1,
        pekerjaan: "Exploration",
        rencana: datas.exploration?.plan ?? "N/A",
        realisasi: datas.exploration?.realization ?? "N/A",
        percentage: datas.exploration?.percentage ?? "N/A",
        change: datas.exploration?.change ?? "N/A",
      },
      {
        id: 2,
        pekerjaan: "Exploitation",
        rencana: datas.development?.plan ?? "N/A",
        realisasi: datas.development?.realization ?? "N/A",
        percentage: datas.development?.percentage ?? "N/A",
        change: datas.development?.change ?? "N/A",
      },
      {
        id: 3,
        pekerjaan: "Work Over",
        rencana: datas.workover?.plan ?? "N/A",
        realisasi: datas.workover?.realization ?? "N/A",
        percentage: datas.workover?.percentage ?? "N/A",
        change: datas.workover?.change ?? "N/A",
      },
      {
        id: 4,
        pekerjaan: "Well Service",
        rencana: datas.wellservice?.plan ?? "N/A",
        realisasi: datas.wellservice?.realization ?? "N/A",
        percentage: datas.wellservice?.percentage ?? "N/A",
        change: datas.wellservice?.change ?? "N/A",
      },
    ];
  };
  const date = new Date();
  const dateFormate = date.toDateString();
  const getColorByValue = (value) => {
    if (value < 30) return "orange.500";
    if (value < 60) return "yellow.500";
    if (value < 80) return "yellow.300";
    return "green.500";
  };

  const ColoredCell = ({ value }) => (
    <Td
      fontSize="18px"
      bg={getColorByValue(value)}
      color="black"
      fontWeight={600}
    >
      {value}%
    </Td>
  );
  return (
    <Box>
      <HeaderCard
        title={"Realisasi Kegiatan Pengeboran & KUPS"}
        subtitle={dateFormate}
        icon={FaRegClock}
      >
        <Grid templateColumns="repeat(4, 1fr)" mt={4} gap={4}>
          <GridItem colSpan={2}>
            <TableDashboard headers={headerTable1}>
              {datas ? (
                data().map((item) => (
                  <Tr key={item.id}>
                    <Td>
                      <IconButton colorScheme="blue" icon={<FaInfoCircle />} />
                    </Td>
                    <Td fontSize={"18px"}>{item.pekerjaan}</Td>
                    <Td fontSize={"18px"}>{item.rencana}</Td>
                    <Td>
                      <Flex gap={4} fontSize={"18px"}>
                        {item.realisasi}
                        {item.change ? dataPerubahan(item.change) : null}
                      </Flex>
                    </Td>
                    <Td fontSize={"18px"}>{item.percentage}</Td>
                  </Tr>
                ))
              ) : (
                <p>Loading....</p>
              )}
            </TableDashboard>
          </GridItem>
          <GridItem colSpan={2}>
            <ThreeDBarChartComponent
              datas={dataCharts ? dataCharts.data : []}
              layouts={dataCharts ? dataCharts.layout : []}
            />
          </GridItem>
        </Grid>
      </HeaderCard>

      <Box mt={4}>
        <HeaderCard
          icon={BiBriefcase}
          title={"Realisasi Kegiatan Pengeboran & KUPS"}
          subtitle={"Home"}
        >
          <TableDashboard headers={headerTable2}>
            {dataKks?.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td fontSize="18px">
                    <IconButton colorScheme="blue" icon={<FaInfoCircle />} />
                  </Td>
                  <Td fontSize="18px" fontWeight={600}>
                    {item.kkks}
                  </Td>
                  <ColoredCell value={item.exploration} />
                  <ColoredCell value={item.development} />
                  <ColoredCell value={item.workover} />

                  <ColoredCell value={item.wellservice} />
                </Tr>
              );
            })}
          </TableDashboard>
        </HeaderCard>
      </Box>
    </Box>
  );
};

export default HomeDashSKK;
