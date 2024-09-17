import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Button} from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import { getJobPhase } from "../../API/APISKK";
const PlanningWorkOver = () => {
  const [phaseData, setPhaseData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getJobPhase('workover', 'plan');
      setPhaseData(data);
    };
    getData();
  }, []);
// console.log(countStatus);

  const proposedCount = phaseData ? phaseData?.data.summary.diajukan : null;
  const AprovedCount = phaseData ? phaseData?.data.summary.disetujui : null;
  const ReturnedCount = phaseData ? phaseData?.data.summary.dikembalikan : null;
  const dataWell = phaseData ? phaseData?.data.job_details : null;

  const StatusBadge = (props) => {
    console.log('StatusBadge props:', props); // Tambahkan log untuk debugging
  
    const colorScheme =
    props.value === "PROPOSED"
        ? "blue"
        : props.value === "APPROVED"
        ? "green"
        : props.value === "RETURNED"
        ? "red"
        : "gray";
  
    return (
      <Badge
        colorScheme={colorScheme}
        variant="subtle"
        px={3}
        rounded={"full"}
      >
        {props.value || 'No Status'} 
        {/* // Tampilkan 'No Status' jika status tidak ada */}
      </Badge>
    );
  };

  const headerstable1 = [
    { headerName: "Nama Sumur", field: "NAMA SUMUR" },
    { headerName: "Wilayah Kerja", field: "WILAYAH KERJA" },
    { headerName: "Lapangan", field: "LAPANGAN" },
    { headerName: "KKKS", field: "KKKS" },
    { headerName: "Jenis Pekerjaan", field: "JENIS PEKERJAAN" },
    { headerName: "Rencana Mulai", field: "RENCANA MULAI" },
    { headerName: "Rencana Mulai", field: "RENCANA SELESAI" },
    { headerName: "Tanggal Diajukan", field: "TANGGAL DIAJUKAN" },
    {
      headerName: "Status",
      field: "STATUS",
      cellRenderer: StatusBadge,
    },
    {
      headerName: "Aksi",
      field: "STATUS",
      cellRenderer: (status) => (
        <div>
          <Button leftIcon={<FaEye />} colorScheme="gray" size="sm" mr={2}>
            View
          </Button>
          <Button
            leftIcon={<FaCheck />}
            colorScheme="green"
            size="sm"
            isDisabled={status.value !== "PROPOSED"} // Correct condition
          >
            Approve
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Flex gap={6} direction={"column"}>
    <Text
      fontSize={"2em"}
      fontWeight={"bold"}
      color={"gray.600"}
      fontFamily="Montserrat"
    >
        Planning WorkOver
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
      <Box >
      <ProposedWorkTable
        columnDefs={headerstable1}
        rowData={dataWell}
        title={"Pekerjaan diajukan"}
        subtitle={"Pekerjaan yang diajukan"}
      />
    </Box>  
      <Footer />
    </Flex>
  );
};

export default PlanningWorkOver;
