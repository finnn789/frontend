import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
import {getDataPPP} from "../../API/APISKK";
const PPPWO = () => {
  const [countStatus, setCountStatus] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDataPPP();
      setCountStatus(data);
    };
    getData();
  }, []);
// console.log(countStatus);

  const proposedCount = countStatus ? countStatus.workover.summary.diajukan_p3 : null;
  const AprovedCount = countStatus ? countStatus.workover.summary.p3_disetujui : null;
  const ReturnedCount = countStatus ? countStatus.workover.summary.selesai : null;
  const dataWell = countStatus ? countStatus.workover.job_details : null;
  
  console.log('dataWell', [dataWell]);
  
  

  const headerstable1 = [
    "NO",
    "WELL NAME",
    "EXP START DATE",
    "EXP END DATE",
    "DEV START DATE",
    "DEV END DATE",
    "WELL START DATE",
    "WELL END DATE",
    "WORK START DATE",
    "WORK END DATE",
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
        : status === "FINISHED Ops"
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
        P3 Work Over
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={proposedCount ?? <p>Loading...</p>}
          icon={FaCopy}
          label={"Diajukan P3"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={AprovedCount ?? <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"P3 Disetujui"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={ReturnedCount ? ReturnedCount : <p>Loading...</p>}
          label={"Selesai"}
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
              <Td>{row.exp_start_date}</Td>
              <Td>{row.exp_end_date}</Td>
              <Td>{row.dev_start_date}</Td>
              <Td>{row.dev_end_date}</Td>
              <Td>{row.well_start_date}</Td>
              <Td>{row.well_end_date}</Td>
              <Td>{row.work_start_date}</Td>
              <Td>{row.work_end_date}</Td>
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

export default PPPWO;