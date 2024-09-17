import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import {
  Box,
  Badge,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck, FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import { getJobPhase } from "../../API/APISKK";
import DetailModal from "./Components/viewPlanning";

const PlanningExploration = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = React.useState(null);
  const [phaseData, setPhaseData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getJobPhase("exploration", "plan");
      setPhaseData(data.data);
    };
    getData();
  }, []);

  console.log("phaseData", phaseData);
  const proposedCount = phaseData ? phaseData.summary.diajukan : null;
  const AprovedCount = phaseData ? phaseData.summary.disetujui : null;
  const ReturnedCount = phaseData ? phaseData.summary.dikembalikan : null;
  const dataWell = phaseData ? phaseData.job_details : null;

  const StatusBadge = (props) => {
    const colorScheme =
      props.value === "PROPOSED"
        ? "blue"
        : props.value === "APPROVED"
        ? "green"
        : props.value === "RETURNED"
        ? "red"
        : "gray";

    return (
      <Badge colorScheme={colorScheme} variant="subtle" px={3} rounded={"full"}>
        {props.value || "No Status"}
      </Badge>
    );
  };

  const handleViewClick = (id) => {
    setSelectedId(id);
    onOpen();
  };

  const headerstable1 = [
    { headerName: "Nama Sumur", field: "NAMA SUMUR", flex: 1 },
    { headerName: "Wilayah Kerja", field: "WILAYAH KERJA", flex: 1 },
    { headerName: "Lapangan", field: "LAPANGAN", flex: 1 },
    { headerName: "KKKS", field: "KKKS", flex: 1 },
    { headerName: "Rencana Mulai", field: "RENCANA MULAI", flex: 1 },
    { headerName: "Rencana Selesai", field: "RENCANA SELESAI", flex: 1 },
    { headerName: "Tanggal Diajukan", field: "TANGGAL DIAJUKAN", flex: 1 },
    { headerName: "Status", field: "STATUS", flex: 1, cellRenderer: StatusBadge },
    {
      headerName: "Aksi",
      field: "STATUS",
      flex: 1,
      cellRenderer: (params) => (
        <div>
          <Button
            leftIcon={<FaEye />}
            colorScheme="gray"
            size="sm"
            mr={2}
            onClick={() => handleViewClick(params.data.id)}
          >
            View
          </Button>
          <Button
            leftIcon={<FaCheck />}
            colorScheme="green"
            size="sm"
            isDisabled={params.value !== "PROPOSED"}
          >
            Approve
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Flex gap={6} direction={"column"}>
      <Text fontSize={"2em"} fontWeight={"bold"} color={"gray.600"} fontFamily="Montserrat">
        Planning Exploration
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={proposedCount !== undefined && proposedCount !== null ? proposedCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"PROPOSED"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={AprovedCount !== undefined && AprovedCount !== null ? AprovedCount : <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"APPROVED"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={ReturnedCount !== undefined && ReturnedCount !== null ? ReturnedCount : <p>Loading...</p>}
          label={"RETURNED"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box>
        <ProposedWorkTable
          columnDefs={headerstable1}
          rowData={dataWell}
          title={"Pekerjaan diajukan"}
          subtitle={"Pekerjaan yang diajukan"}
        />
      </Box>
      <Footer />

      <DetailModal isOpen={isOpen} onClose={onClose} selectedId={selectedId} />
    </Flex>
  );
};

export default PlanningExploration;
