import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
import {  getDataPPP } from "../../API/APISKK";
const PPPDev = () => {
  const [countStatus, setCountStatus] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDataPPP();
      setCountStatus(data);
    };
    getData();
  }, []);
console.log(countStatus);

  const proposedCount = countStatus ? countStatus.development.summary.diajukan_p3 : null ;
  const AprovedCount = countStatus ? countStatus.development.summary.p3_disetujui : null;
  const ReturnedCount = countStatus ? countStatus.development.summary.selesai : null;
  

  const dataWell = countStatus ? countStatus.development.job_details : null;
  console.log(dataWell);
  
  

  const headerstable1 = [
    "NO.",
    "NAMA SUMUR",
    "WILAYAH KERJA",
    "LAPANGAN",
    "TANGGAL MULAI",
    "TANGGAL SELESAI",
    "TANGGAL DIAJUKAN",
    "STATUS",
    "AKSI",
  ];

  const data = [
    {
      id: 1,
      namaSumur: "SUMUR0001",
      wilayahKerja: "AREA01",
      lapangan: "FIELD01",
      tanggalMulai: "24 Mei 2024",
      tanggalSelesai: "24 Juli 2024",
      tanggalDiajukan: "12 Agustus 2023",
      status: "PROPOSED",
    },
    {
      id: 2,
      namaSumur: "SUMUR0001",
      wilayahKerja: "AREA01",
      lapangan: "FIELD01",
      tanggalMulai: "24 Mei 2024",
      tanggalSelesai: "24 Juli 2024",
      tanggalDiajukan: "12 Agustus 2023",
      status: "APPROVED",
    },
    {
      id: 3,
      namaSumur: "SUMUR0001",
      wilayahKerja: "AREA01",
      lapangan: "FIELD01",
      tanggalMulai: "24 Mei 2024",
      tanggalSelesai: "24 Juli 2024",
      tanggalDiajukan: "12 Agustus 2023",
      status: "RETURNED",
    },
    // Add more data as needed
  ];

  const StatusBadge = ({ status }) => {
    const colorScheme =
      status === "PROPOSED"
        ? "blue"
        : status === "APPROVED"
        ? "green"
        : status === "RETURNED"
        ? "red"
        : "gray";

    return (
      <Badge
        colorScheme={colorScheme}
        variant="subtle"
        px={4}
        py={2}
        rounded={"full"}
      >
        {status}
      </Badge>
    );
  };
  return (
    <div>
      <Text fontSize={"3em"} fontWeight={"bold"}>
        P3 Development
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? proposedCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"PROPOSED"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={countStatus ? AprovedCount : <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"APPROVED"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={countStatus ? ReturnedCount : <p>Loading...</p>}
          label={"RETURNED"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable headers={headerstable1} title={"List Development "}>
          {dataWell ? dataWell.map((row,index) => (
            <Tr key={index}>
              <Td>{index}</Td>
              <Td>{row.well_name}</Td>
              <Td>{row.wilayah_kerja}</Td>
              <Td>{row.lapangan}</Td>
              <Td>{row.date_started}</Td>
              <Td>{row.date_finished}</Td>
              <Td>{row.date_proposed}</Td>
              <Td>
                <StatusBadge status={row.status} />
              </Td>
              <Td>
                <Button
                  leftIcon={<Icon as={FaEye} />}
                  colorScheme="gray"
                  size="sm"
                  mr={2}
                >
                  View
                </Button>
                <Button
                  leftIcon={<Icon as={FaCheck} />}
                  colorScheme="green"
                  size="sm"
                  isDisabled={row.planning_status !== "PROPOSED"}
                >
                  Approve
                </Button>
              </Td>
            </Tr>
          )): <p>Loading...</p>}
        </ProposedWorkTable>
      </Box>
      <Footer />
    </div>
  );
};

export default PPPDev;
