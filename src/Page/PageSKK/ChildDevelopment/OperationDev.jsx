import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Button} from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import { getJobPhase } from "../../API/APISKK";
const OperationDevelopment = () => {
  const [phaseData, setPhaseData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getJobPhase('development', 'operation');
      setPhaseData(data);
    };
    getData();
  }, []);
// console.log(countStatus);

  const operatingCount = phaseData ? phaseData.summary.beroperasi : null;
  const AprovedCount = phaseData ? phaseData.summary.disetujui : null;
  const finishedCount = phaseData ? phaseData.summary.selesai_beroperasi : null;
  const dataWell = phaseData ? phaseData.job_details : null;

  const StatusBadge = (props) => {
    console.log('StatusBadge props:', props); // Tambahkan log untuk debugging
  
    const colorScheme =
    props.value === "OPERATING"
        ? "blue"
        : props.value === "APPROVED"
        ? "green"
        : props.value === "FINISHED OPS"
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
    { headerName: "Rencana Mulai", field: "RENCANA MULAI" },
    { headerName: "Rencana Mulai", field: "RENCANA SELESAI" },
    { headerName: "Realisasi Mulai", field: "REALISASI MULAI" },
    { headerName: "Realisasi Mulai", field: "REALISASI SELESAI" },
    {
      headerName: "Status",
      field: "STATUS",
      cellRenderer: StatusBadge,
    },
    {
      headerName: "Aksi",
      field: "STATUS",
      cellRenderer: () => (
        <div>
          <Button leftIcon={<FaEye />} colorScheme="gray" size="sm" mr={2}>
            View
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
        Development Operations
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={AprovedCount !== undefined && AprovedCount !== null ? AprovedCount : <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"APPROVED"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={operatingCount !== undefined && operatingCount !== null ? operatingCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"OPERATING"}
          subLabel="Pekerjaan Berlangsung"
        />
        <PerhitunganCard
          number={finishedCount !== undefined && finishedCount !== null ? finishedCount : <p>Loading...</p>}
          label={"FINISHED"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Selesai"
        />
      </Flex>
      <Box >
      <ProposedWorkTable
        columnDefs={headerstable1}
        rowData={dataWell}
        title={"Pekerjaan beroperasi"}
        subtitle={"Pekerjaan yang disetujui dan beroperasi"}
      />
    </Box>  
      <Footer />
    </Flex>
  );
};

export default OperationDevelopment;