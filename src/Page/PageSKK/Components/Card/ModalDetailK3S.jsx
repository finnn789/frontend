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
  Flex,
  Icon,
  Text,
  layout,
} from "@chakra-ui/react";
import Plot from "react-plotly.js";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getKKKSInfo } from "./../../../API/APISKK"; // Pastikan path impor ini sesuai
import PerhitunganCard from "./CardPerhitunganBox";
import { RiArrowRightUpLine } from "react-icons/ri";
import {
  IconCalendarClock,
  IconSettings2,
  IconFlagCheck,
} from "@tabler/icons-react";
import TableModalDetailK3S from "./TableModalDetailK3S";
import ReusableMap from "./ReusableMap";
const ModalDetailK3S = ({ isOpen, onClose, kkks_id }) => {
  const [data, setData] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (kkks_id) {
      const fetchData = async () => {
        const fetchedData = await getKKKSInfo(kkks_id);
        setData(fetchedData);
      };
      fetchData();
    }
  }, [kkks_id]);

  const chartData = {
    x: data?.chart_data?.Development || [],
    y: data?.chart_data?.values || [],
    type: "bar",
    marker: { color: "blue" },
  };

  const tableData = data?.table_data || [];
  // console.log('bulanan', data?.chart_data?.Exploration?.monthly?.data);

  const explorationChartMonthly = {
    data: data?.chart_data?.Exploration?.monthly?.data,
    layout: data?.chart_data?.Exploration?.monthly?.layout,
  };

  const explorationChartWeekly = {
    data: data?.chart_data?.Exploration?.weekly?.data,
    layout: data?.chart_data?.Exploration?.weekly?.layout,
  };

  const developmentChartMonthly = {
    data: data?.chart_data?.Development?.monthly?.data, // Pastikan ini adalah array dari objek
    layout: data?.chart_data?.Development?.monthly?.layout, // Pastikan ini adalah objek layout yang benar
  };

  const developmentChartWeekly = {
    data: data?.chart_data?.Development?.weekly?.data,
    layout: data?.chart_data?.Development?.weekly?.layout,
  };

  const workOverChartMonthly = {
    data: data?.chart_data?.Workover?.monthly?.data,
    layout: data?.chart_data?.Workover?.monthly?.layout,
  };

  const workOverChartWeekly = {
    data: data?.chart_data?.Workover?.weekly?.data,
    layout: data?.chart_data?.Workover?.weekly?.layout,
  };

  const wellServiceChartMonthly = {
    data: data?.chart_data?.["Well Service"]?.monthly?.data,
    layout: data?.chart_data?.["Well Service"]?.monthly?.layout,
  };

  const wellServiceChartWeekly = {
    data: data?.chart_data?.["Well Service"]?.weekly?.data,
    layout: data?.chart_data?.["Well Service"]?.weekly?.layout,
  };

  const tableDataExploration = data?.well_job_data?.exploration || [];
  const tableDataDevelopment = data?.well_job_data?.development || [];
  const tableDataWorkover = data?.well_job_data?.workover || [];
  const tableDataWellService = data?.well_job_data?.["well service"] || [];

  console.log("tableDataWellService", data?.well_job_data);

  const columns = [
    { header: "No.", accessor: "index" },
    { header: "Nama Sumur", accessor: "nama_sumur" },
    { header: "Wilayah Kerja", accessor: "wilayah_kerja" },
    { header: "Lapangan", accessor: "lapangan" },
    { header: "Tanggal Mulai", accessor: "tanggal_mulai" },
    { header: "Tanggal Selesai", accessor: "tanggal_selesai" },
    { header: "Tanggal Realisasi", accessor: "tanggal_realisasi" },
    { header: "Status", accessor: "status" },
  ];

  const cardData = {
    active_operations: data?.job_data.active_operations,

    approved_plans: data?.job_data.approved_plans,

    finished_jobs: data?.job_data.finished_jobs,

    percentage: data?.job_data.percentage,
  };

  const handleView = (row) => {
    // Implement what should happen when "View" button is clicked
    // console.log("Viewing row:", row);
  };

  const drillingAreas = [
    {
      name: "Area Pengeboran KKKS A",
      coordinates: [
        [1.0, 101.0],
        [1.1, 101.1],
        [1.2, 101.2],
        [1.1, 101.3],
        [1.8, 101.42],
      ],
    },
    {
      name: "Area Pengeboran KKKS B",
      coordinates: [
        [2.0, 102.0],
        [2.1, 102.1],
        [2.2, 102.2],
        [2.3, 102.3],
        [2.4, 102.4],
      ],
    },
    {
      name: "Area Pengeboran KKKS C",
      coordinates: [
        [3.0, 103.0],
        [3.1, 103.1],
        [3.2, 103.2],
        [3.3, 103.3],
        [3.4, 103.4],
      ],
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxHeight="80vh">
        <ModalHeader>
          {data?.nama_kkks || "Loading..."} - Wilayah Kerja
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="auto" px={4}>
          <Box mb={4}>
            <ReusableMap center={[1.5, 102.0]} zoom={6} areas={drillingAreas} />
          </Box>
          <Flex gap={6}>
            <PerhitunganCard
              number={cardData.approved_plans || 0}
              icon={IconCalendarClock}
              label="Rencana"
              subLabel="WP&B Year 2024"
            />
            <PerhitunganCard
              number={cardData.active_operations || 0}
              icon={IconSettings2}
              bgIcon="green.100"
              iconColor="green.500"
              label="Realisasi"
            />
            <PerhitunganCard
              number={cardData.finished_jobs || 0}
              label="Selesai"
              bgIcon="red.100"
              iconColor="red.500"
              icon={IconFlagCheck}
              subLabel="Sejak kemarin"
              percentage={
                <Flex>
                  <Icon boxSize={5} color="green.500" as={RiArrowRightUpLine} />
                  <Text
                    fontSize="sm"
                    color="green.500"
                    fontFamily={"Montserrat"}
                  >
                    {cardData.percentage || 0}%
                  </Text>
                </Flex>
              }
            />
          </Flex>
          <Tabs
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
            isLazy
          >
            <TabList>
              <Tab>Exploration</Tab>
              <Tab>Development</Tab>
              <Tab>Workover</Tab>
              <Tab>Well Service</Tab>
            </TabList>
            <TabPanels>
              {/* Exploration */}
              <TabPanel>
                <Flex gap={4} direction="row" width="100%">
                  <Plot
                    width="100%"
                    data={explorationChartMonthly.data}
                    layout={explorationChartMonthly.layout}
                  />

                  <Plot
                    width="100%"
                    data={explorationChartWeekly.data}
                    layout={explorationChartWeekly.layout}
                  />
                </Flex>
                <Box overflowX="auto">
                  <TableModalDetailK3S
                    columns={columns}
                    data={tableDataExploration}
                    onView={handleView}
                  />
                </Box>
              </TabPanel>

              {/* Development */}
              <TabPanel>
                <Flex gap={4} direction="row" width="100%">
                  <Plot
                    width="100%"
                    data={developmentChartMonthly.data}
                    layout={developmentChartMonthly.layout}
                  />
                  <Plot
                    width="100%"
                    data={developmentChartWeekly.data}
                    layout={developmentChartWeekly.layout}
                  />
                </Flex>
                <Box overflowX="auto">
                  <TableModalDetailK3S
                    columns={columns}
                    data={tableDataDevelopment}
                    onView={handleView}
                  />
                </Box>
              </TabPanel>

              {/* Workover */}
              <TabPanel>
                <Flex gap={4} direction="row" width="100%">
                  <Plot
                    width="100%"
                    data={workOverChartMonthly.data}
                    layout={workOverChartMonthly.layout}
                  />
                  <Plot
                    width="100%"
                    data={workOverChartWeekly.data}
                    layout={workOverChartWeekly.layout}
                  />
                </Flex>
                <Box overflowX="auto">
                  <TableModalDetailK3S
                    columns={columns}
                    data={tableDataWorkover}
                    onView={handleView}
                  />
                </Box>
              </TabPanel>

              {/* Well Service */}
              <TabPanel>
                <Flex gap={4} direction="row" width="100%">
                  <Plot
                    width="100%"
                    data={wellServiceChartMonthly.data}
                    layout={wellServiceChartMonthly.layout}
                  />
                  <Plot
                    width="100%"
                    data={wellServiceChartWeekly.data}
                    layout={wellServiceChartWeekly.layout}
                  />
                </Flex>
                <Box overflowX="auto">
                  <TableModalDetailK3S
                    columns={columns}
                    data={tableDataWellService}
                    onView={handleView}
                  />
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
