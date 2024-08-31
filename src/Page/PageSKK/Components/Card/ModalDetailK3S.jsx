import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import Plot from 'react-plotly.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getKKKSInfo } from './../../../API/APISKK'; // Adjust the import path as necessary

const ModalDetailK3S = ({ isOpen, onClose, kkks_id }) => {
  const [data, setData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  console.log(kkks_id);
  useEffect(() => {
    if (kkks_id) {
      const fetchData = async () => {
        const fetchedData = await getKKKSInfo(kkks_id);
        setData(fetchedData);
      };
      fetchData();
    }
  }, [kkks_id]);

  console.log(data);

  // const DataHandlingPlot = data.;
  // const plotData = (data?.chart_data?.chart_json);
  // const plotData = JSON.parse(data?.chart_data?.chart_json) ?? null;

  // console.log(plotData.);
  

  // console.log(plotData);
  
  const chartData = {
    x: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    y: data?.someDataArray || [750, 650, 800, 700, 750, 680, 720, 600, 750],
    type: 'bar',
    marker: { color: 'blue' },
  };

  const tableData = data?.tableData || [
    {
      no: 1,
      namaSumur: 'SUMUR0001',
      wilayahKerja: 'AREA01',
      lapangan: 'FIELD01',
      tanggalMulai: '24 Mei 2024',
      tanggalSelesai: '24 Juli 2024',
      tanggalRealisasi: '12 Agustus 2023',
      status: 'APPROVED',
    },
    // Add more rows as necessary...
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxHeight="80vh">
        <ModalHeader>{data?.kkks_name || 'Loading...'} - Wilayah Kerja</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" px={4}>
          <Box mb={4}>
            <MapContainer
              center={[0.0, 100.0]}
              zoom={5}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[0.0, 100.0]}>
                <Popup>Wilayah Kerja</Popup>
              </Marker>
            </MapContainer>
          </Box>
          <Tabs index={tabIndex} onChange={index => setTabIndex(index)} isLazy>
            <TabList>
              <Tab>Exploration</Tab>
              <Tab>Development</Tab>
              <Tab>Workover</Tab>
              <Tab>Well Service</Tab>
            </TabList>
            <TabPanels>
              {/* Exploration Tab */}
              <TabPanel>
                <Plot
                  data={[chartData.data]}
                  layout={{ width: '100%', height: 300, title: 'Exploration Data' }}
                />
                <Box overflowX="auto">
                  <Table variant="striped" colorScheme="teal" mt={4}>
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Nama Sumur</Th>
                        <Th>Wilayah Kerja</Th>
                        <Th>Lapangan</Th>
                        <Th>Tanggal Mulai</Th>
                        <Th>Tanggal Selesai</Th>
                        <Th>Tanggal Realisasi</Th>
                        <Th>Status</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData.map((row, index) => (
                        <Tr key={index}>
                          <Td>{row.no}</Td>
                          <Td>{row.namaSumur}</Td>
                          <Td>{row.wilayahKerja}</Td>
                          <Td>{row.lapangan}</Td>
                          <Td>{row.tanggalMulai}</Td>
                          <Td>{row.tanggalSelesai}</Td>
                          <Td>{row.tanggalRealisasi}</Td>
                          <Td>{row.status}</Td>
                          <Td>
                            <Button size="sm" colorScheme="blue">View</Button>
                          </Td>
                          </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Development Tab */}
              <TabPanel>
                <Plot
                  data={[chartData ]}
                  layout={{ width: '100%', height: 300, title: 'Development Data' }}
                />
                <Box overflowX="auto">
                  <Table variant="striped" colorScheme="teal" mt={4}>
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Nama Sumur</Th>
                        <Th>Wilayah Kerja</Th>
                        <Th>Lapangan</Th>
                        <Th>Tanggal Mulai</Th>
                        <Th>Tanggal Selesai</Th>
                        <Th>Tanggal Realisasi</Th>
                        <Th>Status</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData.map((row, index) => (
                        <Tr key={index}>
                          <Td>{row.no}</Td>
                          <Td>{row.namaSumur}</Td>
                          <Td>{row.wilayahKerja}</Td>
                          <Td>{row.lapangan}</Td>
                          <Td>{row.tanggalMulai}</Td>
                          <Td>{row.tanggalSelesai}</Td>
                          <Td>{row.tanggalRealisasi}</Td>
                          <Td>{row.status}</Td>
                          <Td>
                            <Button size="sm" colorScheme="blue">View</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Workover Tab */}
              <TabPanel>
                <Plot
                  data={[chartData]}
                  layout={{ width: '100%', height: 300, title: 'Workover Data' }}
                />
                <Box overflowX="auto">
                  <Table variant="striped" colorScheme="teal" mt={4}>
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Nama Sumur</Th>
                        <Th>Wilayah Kerja</Th>
                        <Th>Lapangan</Th>
                        <Th>Tanggal Mulai</Th>
                        <Th>Tanggal Selesai</Th>
                        <Th>Tanggal Realisasi</Th>
                        <Th>Status</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData.map((row, index) => (
                        <Tr key={index}>
                          <Td>{row.no}</Td>
                          <Td>{row.namaSumur}</Td>
                          <Td>{row.wilayahKerja}</Td>
                          <Td>{row.lapangan}</Td>
                          <Td>{row.tanggalMulai}</Td>
                          <Td>{row.tanggalSelesai}</Td>
                          <Td>{row.tanggalRealisasi}</Td>
                          <Td>{row.status}</Td>
                          <Td>
                            <Button size="sm" colorScheme="blue">View</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              {/* Well Service Tab */}
              <TabPanel>
                <Plot
                  data={[chartData]}
                  layout={{ width: '100%', height: 300, title: 'Well Service Data' }}
                />
                <Box overflowX="auto">
                  <Table variant="striped" colorScheme="teal" mt={4}>
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Nama Sumur</Th>
                        <Th>Wilayah Kerja</Th>
                        <Th>Lapangan</Th>
                        <Th>Tanggal Mulai</Th>
                        <Th>Tanggal Selesai</Th>
                        <Th>Tanggal Realisasi</Th>
                        <Th>Status</Th>
                        <Th>Aksi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData.map((row, index) => (
                        <Tr key={index}>
                          <Td>{row.no}</Td>
                          <Td>{row.namaSumur}</Td>
                          <Td>{row.wilayahKerja}</Td>
                          <Td>{row.lapangan}</Td>
                          <Td>{row.tanggalMulai}</Td>
                          <Td>{row.tanggalSelesai}</Td>
                          <Td>{row.tanggalRealisasi}</Td>
                          <Td>{row.status}</Td>
                          <Td>
                            <Button size="sm" colorScheme="blue">View</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetailK3S;

