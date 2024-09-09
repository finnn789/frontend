import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Button} from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import { getJobPhase } from "../../API/APISKK";
const PPPWellService = () => {
  const [phaseData, setPhaseData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getJobPhase('wellservice', 'ppp');
      setPhaseData(data);
    };
    getData();
  }, []);
// console.log(countStatus);

  const proposedCount = phaseData ? phaseData.summary.diajukan : null;
  const aprovedCount = phaseData ? phaseData.summary.disetujui : null;
  const finishedCount = phaseData ? phaseData.summary.selesai_beroperasi : null;
  const dataWell = phaseData ? phaseData.job_details : null;

  const StatusBadge = (props) => {
    
    const colorScheme =
    props.value === "FINISHED OPS"
        ? "blue"
        : props.value === "P3 PROPOSED"
        ? "green"
        : props.value === "P3 APPROVED"
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
    { headerName: "Realisasi Mulai", field: "REALISASI MULAI" },
    { headerName: "Realisasi Mulai", field: "REALISASI SELESAI" },
    { headerName: "Tanggal P3 Diajukan", field: "TANGGAL P3 DIAJUKAN" },
    { headerName: "Tanggal P3 Disetujui", field: "TANGGAL P3 DISETUJUI" },
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
        WellService PPP
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={finishedCount !== undefined && finishedCount !== null ? finishedCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"FNISHED OPS"}
          subLabel="Pekerjaan Selesai Operasi"
        />
        <PerhitunganCard
          number={proposedCount !== undefined && proposedCount !== null ? proposedCount : <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"APPROVED"}
          subLabel="Pekerjaan P3 Disetujui"
        />

      <PerhitunganCard
          number={aprovedCount !== undefined && aprovedCount !== null ? aprovedCount : <p>Loading...</p>}
          label={"APPROVED"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan P3 Selesai"
        />
      </Flex>
      <Box >
      <ProposedWorkTable
        columnDefs={headerstable1}
        rowData={dataWell}
        title={"Pekerjaan P3"}
        subtitle={"Pekerjaan yang selesai beroperasi dan P3"}
      />
    </Box>  
      <Footer />
    </Flex>
  );
};

export default PPPWellService;