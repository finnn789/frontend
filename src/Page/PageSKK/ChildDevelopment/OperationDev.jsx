import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck, FaCalendarCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
import {
  getDataJobCountPlanningEx,
  getCombinedData,
  getDataOperation,
} from "../../API/APISKK";
import {
  IoCheckmark,
  IoCheckmarkDone,
  IoCheckmarkDoneCircle,
} from "react-icons/io5";
const OperationDev = () => {
  const [countStatus, setCountStatus] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDataOperation();
      setCountStatus(data);
    };
    getData();
  }, []);
  // console.log(countStatus);

  const proposedCount = countStatus
    ? countStatus.development.summary.beroperasi
    : null;
  const AprovedCount = countStatus
    ? countStatus.development.summary.disetujui
    : null;
  const ReturnedCount = countStatus
    ? countStatus.development.summary.selesai
    : null;

  console.log(countStatus);

  const dataWell = countStatus ? countStatus.development.job_details : null;

  const headerstable1 = [
    "NO.",
    "KKKS",
    "NAMA SUMUR",
    "WILAYAH KERJA",
    "LAPANGAN",
    "REALISASI MULAI",
    "REALISASI SELESAI",
    // "TANGGAL DIAJUKAN",
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
        Operation Development
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? proposedCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"BEROPERASI"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={countStatus ? AprovedCount : <p>Loading...</p>}
          icon={FaCalendarCheck}
          bgIcon="yellow.100"
          iconColor="yellow.500"
          label={"DISETUJUI"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={countStatus ? ReturnedCount : <p>Loading...</p>}
          label={"SELESAI"}
          bgIcon="green.100"
          iconColor="green.800"
          icon={IoCheckmarkDone}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable
          headers={headerstable1}
          title={"Pekerjaan Disetujui dan Beroperasi "}
          subtitle={"Pekerjaan yang telah disetujui dan beroperasi"}
        >
          {dataWell ? (
            dataWell.map((row, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{row.KKKS}</Td>
                <Td>{row["NAMA SUMUR"]}</Td>
                <Td>{row["WILAYAH KERJA"]}</Td>
                <Td>{row.LAPANGAN}</Td>
                <Td>{row["REALISASI MULAI"]}</Td>
                <Td>{row["REALISASI SELESAI"]}</Td>
                <Td>
                  <StatusBadge status={row.STATUS} />
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
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ProposedWorkTable>
      </Box>
      <Footer />
    </div>
  );
};

export default OperationDev;
