import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box,Badge, Flex, Text,Tr,Td,Button,Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
const PlanningWorkOver = () => {
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
        Planning Work Over
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={5}
          icon={FaCopy}
          label="Rencana"
          subLabel="WP&B Year 2024"
        />
        <PerhitunganCard
          number={5}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label="Total SKK"
          subLabel="Total SKK"
        />
        <PerhitunganCard
          number={5}
          label="Total SKK"
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Total SKK"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable headers={headerstable1}>
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
    </div>
  );
};

export default PlanningWorkOver;
