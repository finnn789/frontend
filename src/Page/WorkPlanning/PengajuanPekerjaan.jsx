import { Box, VStack, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import { FaClipboardCheck, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import CustomCard from "./../Components/Card/CustomCard"; // Path yang sesuai
import WellTable from "./../Components/Card/WellTable"; // Path yang sesuai

const PengajuanPekerjaan = ({ handleTambahData }) => {
  const [dataDrilling, setDataDrilling] = useState([]);

  const sendData = (data) => {
    setDataDrilling(data);
  };

  const [dataSubmit, setdataSumbit] = useState({
    planned_well: {},
  });

  useEffect(() => {
    if (dataDrilling?.teknisData) {
      const { unit, ...wellWithoutUnit } = dataDrilling.teknisData.elevasi;

      const plannedWellData = {
        ...dataDrilling.teknisData.well,
        ...dataDrilling.teknisData.koordinat,
        ...wellWithoutUnit,
      };

      const jobData = {
        ...dataDrilling.operasionalData.proposedJob,
      };
      const { totalBudget, ...newJobData } = jobData;
      setdataSumbit({
        job: {
          ...newJobData,
          planned_well: plannedWellData,
        },
      });
    }
  }, [dataDrilling]);

  const navigate = useNavigate();
  const warnabutton = "teal";

  return (
    <>
      <Box p={5}>
        <VStack spacing={4} align="stretch">
          {/* Section Cards */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={5}>
            <CustomCard
              icon={FaClipboardCheck}
              count={12}
              label="Diajukan"
              bgColor="white"
              iconBgColor="#ECF2FE"
              iconColor="#3478ff"
              />
            <CustomCard
              icon={FaTimesCircle}
              count={5}
              label="Ditolak"
              bgColor="white"
              iconBgColor="#FEE2E2"
              iconColor="#bd0808"
              />
            <CustomCard
              icon={FaCheckCircle}
              count={20}
              label="Disetujui"
              bgColor="white"
              iconBgColor="#E6FFFA"
              iconColor="#00c9a1"
            />
          </SimpleGrid>

          {/* Tombol Tambah Data */}
          <HStack justify="flex-end" mt={4} mb={4}>
            <Button
              colorScheme="blue"
              as={Link}
              to={"/dashboard/submission/pengajuanform"}
            >
              Tambah Data
            </Button>
          </HStack>

          {/* Tabel */}
          <Box>
            <WellTable />
          </Box>
          <Outlet context={{ sendData }} />
        </VStack>
      </Box>
    </>
  );
};

export default PengajuanPekerjaan;
