import React, { useState, useEffect } from "react";
import { getWellMaster } from "../../API/APIKKKS";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  CircularProgress,
  Button,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";
import PerhitunganCard from "../../PageKKKS/Components/Card/CardPerhitunganBox";
import { IconClipboardList, IconClipboardCheck, IconClipboardOff } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const WellMaster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const userID = JSON.parse(localStorage.getItem("user")).kkks_id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getWellMaster(userID);
        setData(response || []);
      } catch (error) {
        console.error("Error fetching well instance data: ", error);
        toast({
          title: "Error",
          description: "Failed to fetch data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userID, toast]);

  const StatusBadge = ({ status }) => {
    const colorScheme =
      status === "ACTIVE" ? "green" : status === "INACTIVE" ? "red" : "gray";
    return (
      <Badge colorScheme={colorScheme} variant="subtle" px={4} py={2} rounded="full">
        {status}
      </Badge>
    );
  };

  return (
    <Flex direction="column" gap={6} p={5}>
      <Text fontSize="2xl" fontWeight="bold" color="gray.600" fontFamily="Montserrat">
        Well Master
      </Text>

      <Flex gap={6}>
        <PerhitunganCard
          number={data?.length || 0}
          icon={IconClipboardList}
          label={"Total Sumur"}
          subLabel="Jumlah Sumur Terdaftar"
        />
        <PerhitunganCard
          number={data?.filter((item) => item?.well_status === "ACTIVE")?.length || 0}
          icon={IconClipboardCheck}
          label={"Aktif"}
          subLabel="Sumur Aktif"
        />
        <PerhitunganCard
          number={data?.filter((item) => item?.well_status === "INACTIVE")?.length || 0}
          icon={IconClipboardOff}
          label={"Tidak Aktif"}
          subLabel="Sumur Tidak Aktif"
        />
      </Flex>

      {/* Tombol Aksi untuk Tambah */}
      <Flex justifyContent="flex-end" mt={4}>
      <Button
            as={Link} // Gunakan Link dari react-router-dom
            to="form" // Rute tujuan
            leftIcon={<IconPlus />}
            colorScheme="teal"
            variant="solid"
          >
            Buka Form
          </Button>
      </Flex>

      {/* Table untuk Data Well Master */}
      {loading ? (
        <CircularProgress isIndeterminate color="blue.300" />
      ) : (
        <Box my={6} overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Nama Sumur</Th>
                <Th>Field</Th>
                <Th>Area</Th>
                <Th>Status</Th>
                <Th>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.length > 0 ? (
                data.map((well, index) => (
                  <Tr key={well?.id || index}>
                    <Td>{index + 1}</Td>
                    <Td>{well?.well_name || "N/A"}</Td>
                    <Td>{well?.field || "N/A"}</Td>
                    <Td>{well?.area || "N/A"}</Td>
                    <Td>
                      <StatusBadge status={well?.well_status || "UNKNOWN"} />
                    </Td>
                    <Td>
                      <Button
                        as={Link}
                        to={`/wellmaster/detail/${well?.id}`}
                        colorScheme="gray"
                        size="sm"
                        mr={2}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center">
                    No data available
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </Flex>
  );
};

export default WellMaster;
