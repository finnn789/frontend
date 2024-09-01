import React, { useEffect } from "react";
import ProposedWorkTable from "./ProposedWork";
import { Box,Badge, Flex, Text,Tr,Td,Button,Icon } from "@chakra-ui/react";
import PerhitunganCard from "../../PageKKKS/Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../../PageKKKS/Components/Card/Footer";
// import HeaderCard from "../Components/Card/HeaderCard";
import { getDataJobCountPlanningEx } from "../../API/APISKK";
const PlanningExpKKKS = () => {

  const [countStatus, setCountStatus] = React.useState(null);


  React.useEffect(()=> {
    const getData = async () => {
      const data = await getDataJobCountPlanningEx();
      setCountStatus(data);
    }
    getData();
  },[])

  
  
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
    <Flex gap={6} direction={"column"}>
       <Text
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily="Montserrat"
      >
        Planning Eksplorasi
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? countStatus[1].count : 0}
          icon={FaCopy}
          label={countStatus ? countStatus[1].status : ''}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
         number={countStatus ? countStatus[3].count: 0}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={countStatus ? countStatus[3].status : ''}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
         number={countStatus ? countStatus[2].count: 0}
         label={countStatus ? countStatus[2].status : ''}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable headers={headerstable1} title={"Planning Eksplorasi"} subtitle={"List Planning Eksplorasi"}>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.namaSumur}</Td>
              <Td>{row.wilayahKerja}</Td>
              <Td>{row.lapangan}</Td>
              <Td>{row.tanggalMulai}</Td>
              <Td>{row.tanggalSelesai}</Td>
              <Td>{row.tanggalDiajukan}</Td>
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
                  isDisabled={row.status !== "PROPOSED"}
                >
                  Approve
                </Button>
              </Td>
            </Tr>
          ))}
        </ProposedWorkTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default PlanningExpKKKS;
