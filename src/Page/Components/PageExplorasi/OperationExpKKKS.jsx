import React, { useEffect } from "react";
import ProposedWorkTable from "./ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../../PageKKKS/Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck, FaPen } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../../PageKKKS/Components/Card/Footer";
// import HeaderCard from "../Components/Card/HeaderCard";
import { getTableKKKS } from "../../API/APIKKKS";
import { FaGear } from "react-icons/fa6";
const OperationExpKKKS = () => {
  const [countStatus, setCountStatus] = React.useState(null);
  const navigate = useNavigate();

  // const handleNavgiateId = (id) => {
  //   navigate(`dashboard/operasi/${id}`);
  // };

  React.useEffect(() => {
    const getData = async () => {
      const data = await getTableKKKS("exploration", "operation");
      console.log(data.data);
      setCountStatus(data.data);
    };
    getData();
  }, []);

  const headerstable1 = [
    "NO.",
    "KKKS",
    "LAPANGAN",
    "WILAYAH KERJA",
    "NAMA SUMUR",
    "RENCANA MULAI",
    "RENCANA SELESAI",
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
        Operasi Explorasi
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.beroperasi : 0}
          icon={FaGear}
          label={"Beropeasi"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.disetujui : 0}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"DISETUJUI"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.selesai_beroperasi : 0}
          label={"SELESAI"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable
          headers={headerstable1}
          title={"Operation Exploration"}
          subtitle={"List Operation Exploration"}
          link="/dashboard/operasiform"
        >
          {countStatus ? (
            countStatus.job_details.map((row, index) => (
              <Tr key={row.id}>
                <Td>{index + 1}</Td>
                <Td>{row.KKKS}</Td>
                <Td>{row.LAPANGAN}</Td>
                <Td>{row["WILAYAH KERJA"]}</Td>
                <Td>{row["NAMA SUMUR"]}</Td>
                <Td>{row["RENCANA MULAI"]}</Td>
                <Td>{row["RENCANA SELESAI"]}</Td>
                <Td>
                  <StatusBadge status={row.STATUS} />
                </Td>
                <Td>
                  <Button
                    leftIcon={<Icon as={FaPen} />}
                    colorScheme="gray"
                    size="sm"
                    mr={2}
                    as={Link}
                    to={`/dashboard/operasiform/${row.id}`}
                    state={{ job_plan_ld: row.JOB_PLAN_ID }}
                  >
                    Update
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </ProposedWorkTable>
      </Box>
      <Footer />
    </Flex>
  );
};

export default OperationExpKKKS;
