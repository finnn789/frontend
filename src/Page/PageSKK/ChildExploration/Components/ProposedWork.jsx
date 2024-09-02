import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FaBriefcase, FaEye, FaCheck } from "react-icons/fa";
import {IconBriefcase} from '@tabler/icons-react';

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

const ProposedWorkTable = ({ headers = [], children,title,subtitle }) => {
  return (
    <Box bg="white" borderRadius="lg" boxShadow="md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex alignItems="center">
          <Icon as={IconBriefcase} boxSize={12} color="gray.600" mr={3} />
          <Box>
            <Text fontSize="xl" fontWeight="bold" fontFamily={'Montserrat'} color="gray.600">
              {title ? title : "Proposed Work"}
            </Text>
            <Text fontSize="sm" color="gray.600" fontFamily={'Montserrat'}>
              {subtitle ? subtitle : "List of Proposed Work"}
            </Text>
          </Box>
        </Flex>
        <Button
          hidden
          leftIcon={<Icon as={FaCheck} />}
          colorScheme="blue"
          size="md"
        >
          Ajukan Perencanaan
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr bg="gray.50" fontFamily={'Montserrat'}>
            {headers.map((head, index) => (
              <Th key={index} fontSize="sm" fontFamily={'Montserrat'}>
                {head}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody fontFamily={'Montserrat'}>{children}</Tbody>
      </Table>
    </Box>
  );
};

export default ProposedWorkTable;
