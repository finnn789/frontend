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
import React from "react";

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

const HomeDashSKK = () => {
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

  const dataKks = [
    {
      id: 1,
      kkks: "KKK501",
      exploration: 30,
      development: 50,
      workover: 70,
      wellService: 100,
    },
    {
      id: 2,
      kkks: "KKK502",
      exploration: 30,
      development: 50,
      workover: 70,
      wellService: 100,
    },
    {
      id: 3,
      kkks: "KKK502",
      exploration: 30,
      development: 50,
      workover: 70,
      wellService: 100,
    },
    {
      id: 4,
      kkks: "KKK502",
      exploration: 30,
      development: 50,
      workover: 70,
      wellService: 100,
    },
  ];
  const data = [
    {
      id: 1,
      pekerjaan: "Exploration",
      rencana: 50,
      realisasi: 12,
      percentage: 60,
      change: 1,
    },
    {
      id: 2,
      pekerjaan: "Exploitation",
      rencana: 50,
      realisasi: 12,
      percentage: 60,
      change: null,
    },
    {
      id: 3,
      pekerjaan: "Work Over",
      rencana: 50,
      realisasi: 12,
      percentage: 60,
      change: 1,
    },
    {
      id: 4,
      pekerjaan: "Well Service",
      rencana: 50,
      realisasi: 12,
      percentage: 60,
      change: 1,
    },
  ];
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
              {data.map((item) => (
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
              ))}
            </TableDashboard>
          </GridItem>
          <GridItem colSpan={2}>
            <ThreeDBarChartComponent />
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
            {dataKks.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td fontSize="18px" >
                    <IconButton colorScheme="blue" icon={<FaInfoCircle />} />
                  </Td>
                  <Td fontSize="18px" fontWeight={600} >
                    {item.kkks }
                  </Td>
                  <ColoredCell value={item.exploration} />
                  <ColoredCell value={item.development} />
                  <ColoredCell value={item.workover} />
                  
                  <ColoredCell value={item.wellService} />
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
