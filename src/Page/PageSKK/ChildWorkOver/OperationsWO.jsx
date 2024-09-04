import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
import {getCombinedData , getDataOperation} from "../../API/APISKK";
const OperationsWO = () => {
  const [countStatus, setCountStatus] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getDataOperation();
      // setCountStatus(data);
      setCountStatus(data);

    };
    getData();
  }, []);
// console.log(countStatus);

  // console.log('countStatus.Workover', countStatus.Workover);
  
  
  const disetujui = countStatus ? countStatus.workover.summary.disetujui : null;
  const beroperasi = countStatus ? countStatus.workover.summary.beroperasi : null;
  const selesai = countStatus ? countStatus.workover.summary.selesai : null;

  
  // console.log('OperationData.workover', OperationData.workover.summary);
  

  const dataWell = countStatus ? countStatus.workover.job_details : null;
  console.log('dataWell', dataWell)
  
  

  const headerstable1 = [
    "NO.",
    "NAMA SUMUR",
    "KKKS",
    "WILAYAH KERJA",
    "LAPANGAN",
    "RANCANA MULAI",
    "REALISASI MULAI",
    "RENCANA SELESAI",
    "REALISASI SELESAI",
    "STATUS",
    "AKSI",
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
        Operation Work Over
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={disetujui ? disetujui : <p>Loading...</p>}          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"Disetujui"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={beroperasi ?? <p>Loading...</p>}
          icon={FaCopy}
          label={"Beroperasi"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={selesai ? selesai : <p>Loading...</p>}
          label={"Selesai"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Selesai"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable headers={headerstable1} title={"List Development "}>
          {dataWell ? dataWell.map((row,index) => (
            <Tr key={index}>
              <Td>{index}</Td>
              <Td>{row["NAMA SUMUR"]}</Td>
              <Td>{row["KKKS"]}</Td>
              <Td>{row["WILAYAH KERJA"]}</Td>
              <Td>{row["LAPANGAN"]}</Td>
              <Td>{row["RENCANA MULAI"]}</Td>
              <Td>{row["REALISASI MULAI"]}</Td>
              <Td>{row["RENCANA SELESAI"]}</Td>
              <Td>{row["REALISASI SELESAI"]}</Td>
              <Td>
                <StatusBadge status={row["STATUS"]} />
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

export default OperationsWO;