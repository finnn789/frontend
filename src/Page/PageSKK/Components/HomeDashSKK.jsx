import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";

import { FaRegClock } from "react-icons/fa";
import HeaderCard from "./Card/HeaderCard";
import ThreeDBarChartComponent from "./Card/3DBarchart";
import WellTable from "../../Components/Card/WellTable";
import TableDashboard from "../../Components/Card/TableDashboard";

const HomeDashSKK = () => {
  const data = [
    {
      id: 1,
      name: "Pengeboran",
      realisasi: 100000000,
      target: 200000000,
    },
    {
      id: 2,
      name: "KUPS",
      realisasi: 100000000,
      target: 200000000,
    },
    {
      id: 3,
      name: "Pengeboran",
      realisasi: 100000000,
      target: 200000000,
    },
    {
      id: 4,
      name: "KUPS",
      realisasi: 100000000,
      target: 200000000,
    },
  ];
  return (
    <Box>
      <HeaderCard
        title={"Realisasi Kegiatan Pengeboran & KUPS"}
        subtitle={"Home"}
        icon={FaRegClock}
      >
        <Grid templateColumns="repeat(4, 1fr)" mt={4}>
          <GridItem colSpan={2}>
            <TableDashboard headers={["Info", "Pekerjaan", "Rencana WP&B"]}>
              {data.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.realisasi}</Td>
                  <Td>{item.target}</Td>
                </Tr>
              ))}
            </TableDashboard>
          </GridItem>
          <GridItem colSpan={2}>
            <ThreeDBarChartComponent />
          </GridItem>
        </Grid>
      </HeaderCard>
    </Box>
  );
};

export default HomeDashSKK;
