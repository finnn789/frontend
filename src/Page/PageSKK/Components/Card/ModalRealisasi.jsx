import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  IconButton,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FiClock } from 'react-icons/fi';
import { AiOutlineLink } from 'react-icons/ai';
import Plot from 'react-plotly.js';
import { getJobInfo } from "./../../../API/APISKK"; // Pastikan path impor ini sesuai
import BarChartComponent from "./3DBarchart";

const ModalRealisasi = ({ isOpen, onClose, job_type, title, date}) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    if (job_type) {
      const fetchData = async () => {
        const fetchedData = await getJobInfo(job_type.toLowerCase().replace(/\s+/g, ''));
        setData(fetchedData);
      };
      fetchData();
    }
  }, [job_type]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent borderRadius="lg" p={4}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Box ml={3}>
                <Flex alignItems="center" justifyContent="space-between" mb={4}>
                  <Flex flexDirection={"column"}>
                    <Text fontSize="xl" fontWeight="bold" color="gray.700" fontFamily="Montserrat">
                      {title}
                    </Text>
                    <Text fontSize="md" color="gray.600" fontFamily="Montserrat">
                      {date}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={6}>
            <BarChartComponent
              datas={data?.month.data}
              layouts={{
                ...data?.month.layout,
                autosize: true,
                width: undefined, // Supaya tidak ada pengaturan lebar statis
                responsive: true, // Membuat chart responsif
              }}
              style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
              useResizeHandler={true} // Mengaktifkan penanganan resize
            />
            <BarChartComponent
              datas={data?.week.data}
              layouts={{
                ...data?.week.layout,
                autosize: true,
                width: undefined, // Supaya tidak ada pengaturan lebar statis
                responsive: true, // Membuat chart responsif
              }}
              style={{ width: "100%", height: "100" }} // Memastikan ukuran kontainer penuh
              useResizeHandler={true} // Mengaktifkan penanganan resize
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalRealisasi;
