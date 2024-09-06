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
  Th,
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
import { IconRubberStamp } from "@tabler/icons-react";
import ModalRealisasi from "./Card/ModalRealisasi"; 
import ModalDetailK3S from "./Card/ModalDetailK3S";
const HomeDashSKK = () => {
  const [datas, setDatas] = React.useState([]);
  const [dataCharts, setDataCharts] = React.useState([]);
  const [dataTable, setDataTable] = React.useState([]);
  const [isModalOpen1, setIsModalOpen1] = React.useState(false);
  const [isModalOpen2, setIsModalOpen2] = React.useState(false);
  const [selectedKkksId, setSelectedKkksId] = React.useState(null); // State for storing the selected ID

  const chartsData = [
    {
      data: [
        {
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          y: [500, 750, 250, 450, 600, 850, 700, 350, 400, 950],
          type: "bar",
          marker: { color: "lightblue" },
        },
        {
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          y: [300, 800, 100, 500, 600, 900, 650, 250, 450, 1000],
          type: "bar",
          marker: { color: "darkgreen" },
        },
      ],
      layout: { title: "Chart 1", barmode: "group" },
    },
    {
      data: [
        {
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          y: [500, 750, 250, 450, 600, 850, 700, 350, 400, 150],
          type: "bar",
          marker: { color: "lightblue" },
        },
        {
          x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          y: [300, 800, 100, 500, 600, 900, 650, 250, 450, 1000],
          type: "bar",
          marker: { color: "darkgreen" },
        },
      ],
      layout: { title: "Chart 2", barmode: "group" },
    },
  ];
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

  console.log(datas?.tablekkks);
  

  // console.log(dataTable);

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
    "Development",
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
        rencana: datas.tablechart?.table.exploration?.rencana ?? "N/A",
        realisasi: datas.tablechart?.table.exploration?.realisasi ?? "N/A",
        percentage: datas.tablechart?.table.exploration?.percentage ?? "N/A",
        change: datas.tablechart?.table.exploration?.change ?? "N/A",
      },
      {
        id: 2,
        pekerjaan: "Exploitation",
        rencana: datas.tablechart?.table.development?.rencana ?? "N/A",
        realisasi: datas.tablechart?.table.development?.realisasi ?? "N/A",
        percentage: datas.tablechart?.table.development?.percentage ?? "N/A",
        change: datas.tablechart?.table.development?.change ?? "N/A",
      },
      {
        id: 3,
        pekerjaan: "Work Over",
        rencana: datas.tablechart?.table.workover?.rencana ?? "N/A",
        realisasi: datas.tablechart?.table.workover?.realisasi ?? "N/A",
        percentage: datas.tablechart?.table.workover?.percentage ?? "N/A",
        change: datas.tablechart?.table.workover?.change ?? "N/A",
      },
      {
        id: 4,
        pekerjaan: "Well Service",
        rencana: datas.tablechart?.table["well service"]?.rencana ?? "N/A",
        realisasi: datas.tablechart?.table["well service"]?.realisasi ?? "N/A",
        percentage: datas.tablechart?.table["well service"]?.percentage ?? "N/A",
        change: datas.tablechart?.table["well service"]?.change ?? "N/A",
      },
    ];
  };
  const date = new Date();
  const dateFormate = date.toDateString();
  const getColorByValue = (value) => {
    if (value < 30) return "#ffe7e7";
    if (value < 60) return "#FFE4BE";
    if (value < 80) return "#FFF5CB";
    return "#BEFFE7";
  };

  const getColorByValue2 = (value) => {
    if (value == "#ffe7e7") return "#CE0000";
    if (value == "#FFE4BE") return "#975700";
    if (value == "#FFF5CB") return "#7D6400";
    return "#005737";
  };

  const ColoredCell = ({ value }) => (
    <Td
      fontSize="18px"
      bg={getColorByValue(value)}
      color={getColorByValue2(getColorByValue(value))}
      fontWeight={600}
    >
      {value}         
    </Td>
  );
  const handleInfoClick = (item) => {
    setSelectedKkksId(item.id); // Save the selected ID
    setIsModalOpen2(true); // Open the modal
    //   alert(item.id)
  };
  return (
    <Box gap={16}>
      <Flex
        flexDirection={"column"}
        gap={0}
        marginY={10}
        fontFamily={"Montserrat"}
        color={"#333333"}
      >
        <Text fontSize={28} fontWeight={400} textTransform={"uppercase"}>
          Halo, {JSON.parse(localStorage.getItem("user")).username}
        </Text>
        <Text fontSize={32} fontWeight={800}>
          Selamat Datang di ApDPS!
        </Text>
        <Text fontSize={16} fontWeight={400}>
          Lihat, kelola, dan optimalkan data Anda dengan mudah.
        </Text>
      </Flex>
      <HeaderCard
        title={"Realisasi Kegiatan Pengeboran & KUPS"}
        subtitle={dateFormate}
        icon={IconRubberStamp}
      >
        <Grid templateColumns="repeat(4, 1fr)" mt={4} gap={4}>
          <GridItem colSpan={2}>
            <TableDashboard headers={headerTable1}>
              {datas ? (
                data().map((item) => (
                  <Tr key={item.id} fontFamily={"Montserrat"}>
                    <Td>
                      <IconButton
                        icon={<FaInfoCircle />}
                        onClick={() => setIsModalOpen1(true)}
                      />
                     
                      <ModalRealisasi
                        isOpen={isModalOpen1}
                        onClose={() => setIsModalOpen1(false)}
                        link="https://your-link-here.com"
                        title="Exploration"
                        date="22 MARET 2024"
                        chartsData={chartsData}
                      />
                    </Td>
                    <Td fontSize={"18px"} fontFamily={"Montserrat"}>
                      {item.pekerjaan}
                    </Td>
                    <Td fontSize={"18px"} fontFamily={"Montserrat"}>
                      {item.rencana}
                    </Td>
                    <Td fontFamily={"Montserrat"}>
                      <Flex gap={4} fontSize={"18px"}>
                        {item.realisasi}
                        {item.change ? dataPerubahan(item.change) : null}
                      </Flex>
                    </Td>
                    <Td fontSize={"18px"} fontFamily={"Montserrat"}>
                      {item.percentage}
                    </Td>
                  </Tr>
                ))
              ) : (
                <p>Loading....</p>
              )}
            </TableDashboard>
          </GridItem>
          <GridItem colSpan={2}>
            <ThreeDBarChartComponent
              datas={datas.tablechart?.plot.data }
              layouts={datas.tablechart?.plot.layout}
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
            {datas?.tablekkks?.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td fontSize="18px">
                    <IconButton
                      colorScheme="blue"
                      icon={<FaInfoCircle />}
                      onClick={() => handleInfoClick(item)}
                    />
                  </Td>
                  <Td fontSize="18px" fontWeight={600}>
                    {item.name}
                  </Td>
                  <ColoredCell value={item.exploration_percentage} />
                  <ColoredCell value={item.development_percentage} />
                  <ColoredCell value={item.workover_percentage} />

                  <ColoredCell value={item.wellservice_percentage} />
                </Tr>
              );
            })}
          </TableDashboard>
          <ModalDetailK3S
            isOpen={isModalOpen2}
            onClose={() => setIsModalOpen2(false)}
            kkks_id={selectedKkksId} // Pass the ID to the modal
          />
        </HeaderCard>
      </Box>
    </Box>
  );
};

export default HomeDashSKK;
