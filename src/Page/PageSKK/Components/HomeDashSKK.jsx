import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect,} from "react";

import {
  FaArrowAltCircleUp,
  FaInfoCircle,
} from "react-icons/fa";
import HeaderCard from "./Card/HeaderCard";
import BarChartComponent from "./Card/3DBarchart";
import TableDashboard from "../../Components/Card/TableDashboard";

import { BiBriefcase } from "react-icons/bi";
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
  const [selectedJobType, setJobType] = React.useState(null);
  const username = JSON.parse(localStorage.getItem("user")).username;

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
  const dataTableKKKS = dataTable?.tablekkks;

  const dataKks = React.useMemo(() => {
    if (!dataTableKKKS) return [];

    const formatToPersen = (value) => `${value}%`;

    return dataTableKKKS.map((item, index) => ({
      no: index + 1,
      id: item.id,
      kkks: item.nama_kkks,
      exploration: parseInt(item.exploration_percentage),
      development: parseInt(item.development_percentage),
      workover: parseInt(item.workover_percentage),
      wellservice: parseInt(item.wellservice_percentage),
    }));
  }, [dataTable]);

  const data = () => {
    if (!datas) return [];
    return [
      {
        id: 1,
        pekerjaan: "Exploration",
        rencana: datas?.tablechart?.table.exploration?.rencana ?? "N/A",
        realisasi: datas?.tablechart?.table.exploration?.realisasi ?? "N/A",
        percentage: datas?.tablechart?.table.exploration?.percentage ?? "N/A",
        change: datas?.tablechart?.table.exploration?.change ?? "N/A",
      },
      {
        id: 2,
        pekerjaan: "Development",
        rencana: datas?.tablechart?.table.development?.rencana ?? "N/A",
        realisasi: datas?.tablechart?.table.development?.realisasi ?? "N/A",
        percentage: datas?.tablechart?.table.development?.percentage ?? "N/A",
        change: datas?.tablechart?.table.development?.change ?? "N/A",
      },
      {
        id: 3,
        pekerjaan: "Work Over",
        rencana: datas?.tablechart?.table.workover?.rencana ?? "N/A",
        realisasi: datas?.tablechart?.table.workover?.realisasi ?? "N/A",
        percentage: datas?.tablechart?.table.workover?.percentage ?? "N/A",
        change: datas?.tablechart?.table.workover?.change ?? "N/A",
      },
      {
        id: 4,
        pekerjaan: "Well Service",
        rencana: datas?.tablechart?.table.wellservice?.rencana ?? "N/A",
        realisasi: datas?.tablechart?.table.wellservice?.realisasi ?? "N/A",
        percentage: datas?.tablechart?.table.wellservice?.percentage ?? "N/A",
        change: datas?.tablechart?.table.wellservice?.change ?? "N/A",
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
      {value}%         
    </Td>
  );
  const handleKKKSInfoClick = (item) => {
    setSelectedKkksId(item.id); // Save the selected ID
    setIsModalOpen2(true); // Open the modal
    //   alert(item.id)
  };
  const handleJobInfoClick = (job_type) => {
    setJobType(job_type);
    setIsModalOpen1(true);
  }
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
          Halo, {username}
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
                        onClick={() => handleJobInfoClick(item.pekerjaan)}
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
                      {item.percentage} %
                    </Td>
                  </Tr>
                ))
              ) : (
                <p>Loading....</p>
              )}
            </TableDashboard>
            <ModalRealisasi
              isOpen={isModalOpen1}
              onClose={() => setIsModalOpen1(false)}
              job_type={selectedJobType}
              title="Exploration"
              date="22 MARET 2024"
            />
          </GridItem>
          <GridItem colSpan={2}>
            <BarChartComponent
              datas={datas?.tablechart?.plot.data}
              layouts={{
                ...datas?.tablechart?.plot.layout,
                autosize: true,
                width: undefined, // Supaya tidak ada pengaturan lebar statis
                responsive: true, // Membuat chart responsif
              }}
              style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
              useResizeHandler={true} // Mengaktifkan penanganan resize
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
                      onClick={() => handleKKKSInfoClick(item)}
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
