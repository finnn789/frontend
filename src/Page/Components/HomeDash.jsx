// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Icon,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Badge,
} from "@chakra-ui/react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Plot from "react-plotly.js";
import {
  CheckIcon,
  EditIcon,
  DeleteIcon,
  SettingsIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import "react-day-picker/dist/style.css"; // Import style untuk DayPicker
import Hero from "../../assets/Hero.jpg";
import PropTypes from "prop-types";

const progressData = [
  { label: "Eksplorasi", value: 85, color: "#3182CE", lineValue: 75 }, // Blue
  { label: "Exploitation", value: 69, color: "#DD6B20", lineValue: 65 }, // Orange
  { label: "Work Over", value: 46, color: "#38A169", lineValue: 55 }, // Green
  { label: "Well Service", value: 68, color: "#805AD5", lineValue: 70 }, // Purple
];

// Data bulanan untuk Perencanaan dan Terealisasi
const monthlyData = [
  { month: "Jan", planning: 1000, actual: 800 },
  { month: "Feb", planning: 1200, actual: 900 },
  { month: "Mar", planning: 1500, actual: 1200 },
  { month: "Apr", planning: 1800, actual: 1400 },
  { month: "May", planning: 2000, actual: 1700 },
  { month: "Jun", planning: 2200, actual: 1900 },
  { month: "Jul", planning: 2500, actual: 2100 },
  { month: "Aug", planning: 2700, actual: 2400 },
  { month: "Sep", planning: 3000, actual: 2600 },
  { month: "Oct", planning: 3200, actual: 2900 },
  { month: "Nov", planning: 3500, actual: 3100 },
  { month: "Dec", planning: 3800, actual: 3300 },
];

// Fungsi untuk menghitung data kumulatif
const cumulativeData = (data) => {
  let cumulative = 0;
  return data.map((item) => {
    cumulative += item;
    return cumulative;
  });
};

// Komponen untuk grafik batang dengan line chart kumulatif di dalamnya
const CombinedBarLineChart = () => {
  return (
    <Plot
      data={[
        {
          x: monthlyData.map((item) => item.month),
          y: monthlyData.map((item) => item.planning),
          type: "bar",
          name: "Perencanaan",
          marker: { color: "#3182CE" },
          text: monthlyData.map((item) => item.planning),
          textposition: "outside",
          yaxis: "y1",
        },
        {
          x: monthlyData.map((item) => item.month),
          y: monthlyData.map((item) => item.actual),
          type: "bar",
          name: "Terealisasi",
          marker: { color: "#38A169" },
          text: monthlyData.map((item) => item.actual),
          textposition: "outside",
          yaxis: "y1",
        },
        {
          x: monthlyData.map((item) => item.month),
          y: cumulativeData(monthlyData.map((item) => item.planning)),
          type: "scatter",
          mode: "lines+markers",
          name: "Kumulatif Perencanaan",
          line: { color: "#3182CE", width: 2 },
          marker: { color: "#3182CE" },
          yaxis: "y2",
        },
        {
          x: monthlyData.map((item) => item.month),
          y: cumulativeData(monthlyData.map((item) => item.actual)),
          type: "scatter",
          mode: "lines+markers",
          name: "Kumulatif Terealisasi",
          line: { color: "#38A169", width: 2 },
          marker: { color: "#38A169" },
          yaxis: "y2",
        },
      ]}
      layout={{
        width: "1100",
        title: "",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        barmode: "group",
        xaxis: { automargin: true },
        yaxis: {
          title: "Jumlah",
          side: "left",
          automargin: true,
          showgrid: true,
          zeroline: true,
        },
        yaxis2: {
          title: "Jumlah Kumulatif",
          overlaying: "y",
          side: "right",
          automargin: true,
          showgrid: false,
          zeroline: false,
        },
        showlegend: true,
        legend: { orientation: "h", y: -0.2 },
      }}
      config={{ responsive: true }}
      useResizeHandler={true} // Mengizinkan resize handler
      style={{ width: "100%", height: "100%" }} // Mengatur agar ukuran chart mengikuti ukuran parent
    />
  );
};

// Komponen untuk Circular Progress Bar
const CircularProgressBar = ({ label, value, color }) => {
  return (
    <Box textAlign="center">
      <CircularProgress value={value} color={color} size="120px">
        <CircularProgressLabel fontSize="xl">{value}%</CircularProgressLabel>
      </CircularProgress>
      <Text mt={2} fontSize="xl">
        {label}
      </Text>
    </Box>
  );
};

CircularProgressBar.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

// Komponen untuk Box dengan styling yang diinginkan
const SummaryBox = ({
  icon,
  value,
  label,
  percentage,
  gradient,
  iconColor,
}) => {
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
        <Icon as={icon} w={6} h={6} color={iconColor} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width="100%"
      >
        <Box>
          <Text fontSize="37px" fontWeight="bold">
            {value}
          </Text>
          <Text fontSize="19px" fontWeight="bold">
            {label}
          </Text>
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
          <Text fontSize="19px" fontWeight="bold">
            {percentage}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

SummaryBox.propTypes = {
  icon: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  gradient: PropTypes.string.isRequired,
  iconColor: PropTypes.string.isRequired,
};

// Fungsi untuk merender StatusBadge
function StatusBadge({ value }) {
  let colorScheme = "gray";

  if (value === "Selesai") {
    colorScheme = "green";
  } else if (value === "Proses") {
    colorScheme = "yellow";
  } else if (value === "Menunggu") {
    colorScheme = "orange";
  }

  return (
    <Badge
      colorScheme={colorScheme}
      whiteSpace={"normal"}
      lineHeight={"1.2"}
      padding={"4px 8px"}
      borderRadius={"6px"}
      width={100}
      textAlign={'center'}
    >
      {/* style={{ whiteSpace: 'normal', lineHeight: '1.2', padding: '4px 8px' }} */}
      {value}
    </Badge>
  );
}

// Fungsi untuk merender tombol Edit dan Delete
function ActionButtons() {
  return (
    <Box display="flex" gap="2">
      <Button leftIcon={<EditIcon />} colorScheme="blue" size="sm"  variant='solid'>
        Edit
      </Button>
      <Button leftIcon={<DeleteIcon />} colorScheme="red" size="sm">
        Delete
      </Button>
    </Box>
  );
}

// Komponen untuk AG Grid Table
const WellTable = () => {
  const columnDefs = [
    {
      headerName: "No",
      field: "no",
      width: 70,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Nama Sumur",
      field: "namaSumur",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Tanggal & Mulai",
      field: "tanggalMulai",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Status",
      field: "status",
      filter: "agTextColumnFilter",
      width: 150, // Atur lebar kolom agar cukup untuk badge
      cellRenderer: StatusBadge,
      cellStyle: { overflow: "visible" }, // Pastikan overflow visible
    },
    {
      headerName: "Aksi",
      field: "aksi",
      cellRenderer: ActionButtons,
    },
  ];

  const rowData = [
    {
      no: 1,
      namaSumur: "Sumur A",
      tanggalMulai: "2024-08-01 08:00",
      status: "Selesai",
    },
    {
      no: 2,
      namaSumur: "Sumur B",
      tanggalMulai: "2024-08-02 09:00",
      status: "Proses",
    },
    {
      no: 3,
      namaSumur: "Sumur C",
      tanggalMulai: "2024-08-03 07:30",
      status: "Menunggu",
    },
    {
      no: 4,
      namaSumur: "Sumur D",
      tanggalMulai: "2024-08-04 10:00",
      status: "Proses",
    },
    {
      no: 5,
      namaSumur: "Sumur E",
      tanggalMulai: "2024-08-05 11:00",
      status: "Selesai",
    },
    {
      no: 6,
      namaSumur: "Sumur F",
      tanggalMulai: "2024-08-06 06:00",
      status: "Menunggu",
    },
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
  return (
    <Box p={4}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={5}>
          <Box
            borderRadius="2xl"
            bg="white"
            boxShadow="md"
            overflow="hidden"
            position="relative"
            height="200px" // Membuat height lebih rendah untuk bagian welcome
          >
            <Image
              src={Hero}
              alt="Background Image"
              width="100%"
              height="100%"
              objectFit="cover"
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
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold">
                Selamat Datang di SIPS
              </Text>
              <Text fontSize="lg">Sistem Informasi Pengoboran dan Sumuran</Text>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={5}>
          <Tabs variant="soft-rounded" colorScheme="green">
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
                    iconColor="#3EC7AD"
                  />
                  <SummaryBox
                    icon={EditIcon} // Pisau bedah
                    value="102"
                    label="Operasi"
                    percentage="+2,36%"
                    gradient="linear(to-r, #9BE3FC, #53B4EB)"
                    iconColor="#53B4EB"
                  />
                  <SummaryBox
                    icon={SettingsIcon} // Gear
                    value="102"
                    label="P3"
                    percentage="+2,36%"
                    gradient="linear(to-r, #74A7FB, #397BFE)"
                    iconColor="#397BFE"
                  />
                  <SummaryBox
                    icon={CloseIcon} // Exit
                    value="102"
                    label="Close Out"
                    percentage="+2,36%"
                    gradient="linear(to-r, #8D6DF6, #6940FE)"
                    iconColor="#6940FE"
                  />
                </Grid>
                {/* Tabel di bawah Summary */}
                <Box mt={8}>
                  <WellTable />
                </Box>
              </TabPanel>
              {/* // Penggunaan komponen di Tab `Progress` */}
              <TabPanel>
                <Grid templateColumns="3fr 1fr" gap={4}>
                  <GridItem colSpan={1}>
                    <Box
                      backgroundColor={"red"}
                      width={"100%"}
                      borderRadius="2xl"
                      bg="white"
                      boxShadow="md"
                      p={5}
                      height="100%"
                    >
                      <CombinedBarLineChart />
                    </Box>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <SimpleGrid columns={2} spacing={4} gap={4}>
                      {progressData.map((data, index) => (
                        <CircularProgressBar
                          marginBottom={"45px"}
                          backgroundColor={"red"}
                          key={index}
                          label={data.label}
                          value={data.value}
                          color={data.color}
                        />
                      ))}
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
