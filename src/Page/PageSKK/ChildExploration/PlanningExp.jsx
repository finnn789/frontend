import React from "react";
import ProposedWorkTable from "./Components/ProposedWork";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon } from "@chakra-ui/react";
import PerhitunganCard from "../Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../Components/Card/Footer";
import HeaderCard from "../Components/Card/HeaderCard";
import { getDataJobCountPlanningEx, getCombinedData } from "../../API/APISKK";
const PlanningWellService = () => {
  const [countStatus, setCountStatus] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const data = await getCombinedData();
      setCountStatus(data);
    };
    getData();
  }, []);
// console.log(countStatus);

  const proposedCount = countStatus ? countStatus.Exploration.planning_status_counts.PROPOSED : null;
  const AprovedCount = countStatus ? countStatus.Exploration.planning_status_counts.APPROVED : null;
  const ReturnedCount = countStatus ? countStatus.Exploration.planning_status_counts.RETURNED : null;

  
  console.log(countStatus);
  
  

  const dataWell = countStatus ? countStatus.Exploration.wells : null;
  
  console.log('dataWell', dataWell);
  
  const StatusBadge = ({ status }) => {
    console.log('StatusBadge props:', status); // Tambahkan log untuk debugging
  
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
        {status || 'No Status'} 
        {/* // Tampilkan 'No Status' jika status tidak ada */}
      </Badge>
    );
  };

  const headerstable1 = [
    { headerName: "Nama Sumur", field: "well_name" },
    { headerName: "Wilayah Kerja", field: "wilayah_kerja" },
    { headerName: "Lapangan", field: "lapangan" },
    { headerName: "Tanggal Mulai", field: "date_started" },
    { headerName: "Tanggal Selesai", field: "date_approved" },
    { headerName: "Tanggal Diajukan", field: "date_proposed" },
    {
      headerName: "Status",
      field: "planning_status",
      cellRendererFramework: StatusBadge,
    },
    {
      headerName: "Aksi",
      field: "aksi",
      cellRendererFramework: (params) => (
        <div>
          <Button leftIcon={<FaEye />} colorScheme="gray" size="sm" mr={2}>
            View
          </Button>
          <Button
            leftIcon={<FaCheck />}
            colorScheme="green"
            size="sm"
            isDisabled={params.data.planning_status !== "PROPOSED"} // Correct condition
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
        Planning Exploration
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={proposedCount ? proposedCount : <p>Loading...</p>}
          icon={FaCopy}
          label={"PROPOSED"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={AprovedCount ? AprovedCount : <p>Loading...</p>}
          icon={FaCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"APPROVED"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={ReturnedCount ? ReturnedCount : <p>Loading...</p>}
          label={"RETURNED"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={MdOutlineVerified}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
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

export default PlanningWellService;
