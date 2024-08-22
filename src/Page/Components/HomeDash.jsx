// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Box, Grid, GridItem, Text, Image, Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Icon, Button } from "@chakra-ui/react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Plot from "react-plotly.js";
import { DayPicker } from "react-day-picker";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import 'react-day-picker/dist/style.css'; // Import style untuk DayPicker
import Hero from "../../assets/Hero.jpg";

// Komponen Kalender menggunakan DayPicker
const Calendar = () => {
  return (
    <Box
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={4}
      textAlign="center"
      height="100%" // Memastikan tinggi sama dengan gambar di sebelahnya
    >
      <DayPicker />
    </Box>
  );
};

// Komponen untuk grafik garis
const LineChart = () => {
  return (
    <Plot
      data={[
        {
          x: Array.from({ length: 10 }, (_, i) => i),
          y: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "green" },
        },
      ]}
      layout={{ title: "", paper_bgcolor: 'transparent', plot_bgcolor: 'transparent' }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Komponen untuk grafik batang
const BarChart = () => {
  return (
    <Plot
      data={[
        {
          x: Array.from({ length: 10 }, (_, i) => i),
          y: Array.from({ length: 10 }, () => Math.floor(Math.random() * 1000)),
          type: "bar",
          marker: { color: "blue" },
        },
        {
          x: Array.from({ length: 10 }, (_, i) => i),
          y: Array.from({ length: 10 }, () => Math.floor(Math.random() * 500)),
          type: "bar",
          marker: { color: "green" },
        }
      ]}
      layout={{ title: "", paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', barmode: 'group' }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Komponen untuk indikator lingkaran
const CircularIndicator = ({ label, value, color }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={4}
      textAlign="center"
    >
      <Box
        position="relative"
        width="60px"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="2xl" fontWeight="bold">{value}%</Text>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          borderRadius="full"
          borderWidth="6px"
          borderColor={color}
        />
      </Box>
      <Text ml={4} fontSize="lg">{label}</Text>
    </Box>
  );
};

// Komponen untuk Box dengan styling yang diinginkan
const SummaryBox = ({ icon, value, label, percentage, gradient }) => {
  return (
    <Box
      borderRadius="32px"
      padding="32px"
      bgGradient={gradient}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      gap="25px"
      boxShadow="md"
      color="white"
    >
      <Box
        width="57px"
        height="57px"
        padding="10px"
        bg="white"
        borderRadius="17px"
        border="1px solid rgba(255, 255, 255, 0.50)"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={icon} w={6} h={6} color="green.500" />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-end" width="100%">
        <Box>
          <Text fontSize="37px" fontWeight="bold">{value}</Text>
          <Text fontSize="19px" fontWeight="bold">{label}</Text>
        </Box>
        <Box
          padding="12px 15px"
          bg="rgba(255, 255, 255, 0.35)"
          borderRadius="41px"
          border="1px solid rgba(255, 255, 255, 0.50)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="19px" fontWeight="bold">{percentage}</Text>
        </Box>
      </Box>
    </Box>
  );
};

// Komponen untuk AG Grid Table
const WellTable = () => {
  const columnDefs = [
    { headerName: "No", field: "no", width: 70, filter: "agNumberColumnFilter" },
    { headerName: "Nama Sumur", field: "namaSumur", filter: "agTextColumnFilter" },
    { headerName: "Tanggal Mulai", field: "tanggalMulai", filter: "agDateColumnFilter" },
    {
      headerName: "Status",
      field: "status",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Aksi",
      field: "aksi",
      cellRendererFramework: () => (
        <Button leftIcon={<EditIcon />} colorScheme="blue" size="sm">
          Edit
        </Button>
      ),
    },
  ];

  const rowData = [
    { no: 1, namaSumur: "Sumur A", tanggalMulai: "2024-08-01 08:00", status: "Selesai" },
    { no: 2, namaSumur: "Sumur B", tanggalMulai: "2024-08-02 09:00", status: "Proses" },
    { no: 3, namaSumur: "Sumur C", tanggalMulai: "2024-08-03 07:30", status: "Menunggu" },
    { no: 4, namaSumur: "Sumur D", tanggalMulai: "2024-08-04 10:00", status: "Proses" },
    { no: 5, namaSumur: "Sumur E", tanggalMulai: "2024-08-05 11:00", status: "Selesai" },
    { no: 6, namaSumur: "Sumur F", tanggalMulai: "2024-08-06 06:00", status: "Menunggu" },
  ];

  return (
    <Box className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="autoHeight"
        defaultColDef={{
          flex: 1,
          minWidth: 150,
          filter: true,
          sortable: true,
        }}
      />
    </Box>
  );
};

// Komponen Utama
const HomeDash = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={4}>
          <Box
            borderRadius="2xl"
            bg="white"
            boxShadow="md"
            overflow="hidden"
            position="relative"
            height="100%" // Menentukan tinggi penuh untuk memastikan sesuai dengan grid
          >
            <Image
              src={Hero}
              alt="Background Image"
              width="100%"
              height="100%" // Memastikan gambar mengisi seluruh kontainer
              objectFit="cover" // Menjaga aspek rasio gambar
            />
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.4)"
              color="white"
              p={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Selamat Datang di SIAPES
              </Text>
              <Text fontSize="lg">Sistem Informasi Pengoboran dan Sumuran</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Calendar />
        </GridItem>
        <GridItem colSpan={5}>
          <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} isFitted variant="enclosed">
            <TabList>
              <Tab>Summary</Tab>
              <Tab>Progress</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  <SummaryBox
                    icon={CheckIcon}
                    value="102"
                    label="Disetujui"
                    percentage="+2,36%"
                    gradient="linear(to-r, #3EC7AD, #80F571)"
                  />
                  <SummaryBox
                    icon={CheckIcon} // Gantilah dengan icon yang sesuai
                    value="102"
                    label="Operasi"
                    percentage="+2,36%"
                    gradient="linear(to-r, #9BE3FC, #53B4EB)"
                  />
                  <SummaryBox
                    icon={CheckIcon} // Gantilah dengan icon yang sesuai
                    value="102"
                    label="P3"
                    percentage="+2,36%"
                    gradient="linear(to-r, #74A7FB, #397BFE)"
                  />
                  <SummaryBox
                    icon={CheckIcon} // Gantilah dengan icon yang sesuai
                    value="102"
                    label="Close Out"
                    percentage="+2,36%"
                    gradient="linear(to-r, #8D6DF6, #6940FE)"
                  />
                </Grid>
                {/* Tabel di bawah Summary */}
                <Box mt={8}>
                  <WellTable />
                </Box>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  <GridItem colSpan={2}>
                    <Box borderRadius="2xl" bg="white" boxShadow="md" p={5}>
                      <BarChart />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <SimpleGrid columns={1} spacing={4}>
                      <CircularIndicator label="Eksplorasi" value={85} color="blue.500" />
                      <CircularIndicator label="Exploitation" value={85} color="orange.500" />
                      <CircularIndicator label="Work Over" value={85} color="green.500" />
                      <CircularIndicator label="Well Service" value={85} color="purple.500" />
                    </SimpleGrid>
                  </GridItem>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomeDash;
