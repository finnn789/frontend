import React from 'react';
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
} from '@chakra-ui/react';
import { FaBriefcase, FaEye, FaCheck } from 'react-icons/fa';

const data = [
  { id: 1, namaSumur: 'SUMUR0001', wilayahKerja: 'AREA01', lapangan: 'FIELD01', tanggalMulai: '24 Mei 2024', tanggalSelesai: '24 Juli 2024', tanggalDiajukan: '12 Agustus 2023', status: 'PROPOSED' },
  { id: 2, namaSumur: 'SUMUR0001', wilayahKerja: 'AREA01', lapangan: 'FIELD01', tanggalMulai: '24 Mei 2024', tanggalSelesai: '24 Juli 2024', tanggalDiajukan: '12 Agustus 2023', status: 'APPROVED' },
  { id: 3, namaSumur: 'SUMUR0001', wilayahKerja: 'AREA01', lapangan: 'FIELD01', tanggalMulai: '24 Mei 2024', tanggalSelesai: '24 Juli 2024', tanggalDiajukan: '12 Agustus 2023', status: 'RETURNED' },
  // Add more data as needed
];

const StatusBadge = ({ status }) => {
  const colorScheme = 
    status === 'PROPOSED' ? 'blue' :
    status === 'APPROVED' ? 'green' :
    status === 'RETURNED' ? 'red' : 'gray';

  return (
    <Badge colorScheme={colorScheme} variant="subtle" px={4} py={2} rounded={'full'}>
      {status}
    </Badge>
  );
};

const ProposedWorkTable = ({headers, datas}) => {
  return (
    <Box bg="white" borderRadius="lg" boxShadow="md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex alignItems="center">
          <Icon as={FaBriefcase} boxSize={6} color="gray.600" mr={2} />
          <Box>
            <Text fontSize="xl" fontWeight="bold">Pekerjaan Diajukan</Text>
            <Text fontSize="sm" color="gray.500">Pekerjaan yang diajukan</Text>
          </Box>
        </Flex>
        <Button hidden leftIcon={<Icon as={FaCheck} />} colorScheme="blue" size="md">
          Ajukan Perencanaan
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr bg="gray.50">
            <Th>NO.</Th>
            <Th>NAMA SUMUR</Th>
            <Th>WILAYAH KERJA</Th>
            <Th>LAPANGAN</Th>
            <Th>TANGGAL MULAI</Th>
            <Th>TANGGAL SELESAI</Th>
            <Th>TANGGAL DIAJUKAN</Th>
            <Th>STATUS</Th>
            <Th>AKSI</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.id}</Td>
              <Td>{row.namaSumur}</Td>
              <Td>{row.wilayahKerja}</Td>
              <Td>{row.lapangan}</Td>
              <Td>{row.tanggalMulai}</Td>
              <Td>{row.tanggalSelesai}</Td>
              <Td>{row.tanggalDiajukan}</Td>
              <Td><StatusBadge status={row.status} /></Td>
              <Td>
                <Button leftIcon={<Icon as={FaEye} />} colorScheme="gray" size="sm" mr={2}>
                  View
                </Button>
                <Button 
                  leftIcon={<Icon as={FaCheck} />} 
                  colorScheme="green" 
                  size="sm"
                  isDisabled={row.status !== 'PROPOSED'}
                >
                  Approve
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ProposedWorkTable;