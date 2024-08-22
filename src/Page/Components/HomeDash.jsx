// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Grid, GridItem, Text, Image } from "@chakra-ui/react";
import Plot from "react-plotly.js";
import { DayPicker } from "react-day-picker";
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

// Komponen untuk grafik
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
      layout={{ title: "Eksplorasi Terealisasi", paper_bgcolor: 'transparent', plot_bgcolor: 'transparent' }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const RadarChart = () => {
  return (
    <Plot
      data={[
        {
          type: "scatterpolar",
          r: Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000)),
          theta: ["A", "B", "C", "D", "E", "F", "G", "H"],
          fill: "toself",
          name: "Pengajuan KKKS",
          marker: { color: "blue" },
        },
      ]}
      layout={{ title: "Pengajuan KKKS", polar: { radialaxis: { visible: true, range: [0, 1000] } }, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent' }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Komponen Utama
const HomeDash = () => {
  return (
    <Box p={0}>
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
        <GridItem colSpan={2}>
          <Box
            borderRadius="2xl"
            bg="white"
            boxShadow="md"
            p={5}
            height="100%"
          >
            <LineChart />
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box
            borderRadius="2xl"
            bg="white"
            boxShadow="md"
            p={5}
            height="100%"
          >
            <RadarChart />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomeDash;
