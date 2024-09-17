import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import FormControlCard from "../../Components/FormControl";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import TableComponent from "../../Components/TableComponent";
import { Button } from "@chakra-ui/react";

const WRMUissues = () => {
  const columns = [
    { Head: "No", accessor: "no" },
    { Head: "Date", accessor: "date" },
    { Head: "Severity", accessor: "severity" },
    { Head: "Description", accessor: "description" },
    { Head: "Status", accessor: "status" },
    {
      Head: "Aksi",
      render: (row) => (
        <Button colorScheme="blue" onClick={() => handleAction(row)}>
          Action
        </Button>
      ),
    },
  ];

  // Define the data for the table

  const data = [
    {
      no: 1,
      date: "12-10-2015",
      severity: 28,
      description: "Pengajuan Pertama",
      status: "ISSUED",
    },
    {
      no: 2,
      date: "15-11-2016",
      severity: 15,
      description: "Revisi Dokumen",
      status: "RESOLVED",
    },
    {
      no: 3,
      date: "20-01-2017",
      severity: 45,
      description: "Pengajuan Kedua",
      status: "ISSUED",
    },
    {
      no: 4,
      date: "05-06-2018",
      severity: 10,
      description: "Pengajuan Ulang",
      status: "RESOLVED",
    },
    {
      no: 5,
      date: "22-08-2019",
      severity: 30,
      description: "Evaluasi Proses",
      status: "ISSUED",
    },
    {
      no: 6,
      date: "14-12-2020",
      severity: 50,
      description: "Finalisasi",
      status: "RESOLVED",
    },
    {
      no: 7,
      date: "11-03-2021",
      severity: 20,
      description: "Pemeriksaan Tambahan",
      status: "ISSUED",
    },
    {
      no: 8,
      date: "19-07-2022",
      severity: 25,
      description: "Review Hasil",
      status: "RESOLVED",
    },
    {
      no: 9,
      date: "30-09-2023",
      severity: 35,
      description: "Pengajuan Terakhir",
      status: "ISSUED",
    },
    {
      no: 10,
      date: "04-02-2024",
      severity: 40,
      description: "Penyelesaian Akhir",
      status: "RESOLVED",
    },
  ];

  return (
    <CardFormK3 title="WRM Issues" subtitle="" overflowY="auto"  >
      <GridLayout Columns={1} Gap={2}>
        <GridLayout.Item>
          <SelectComponent label="Severity" placeholder="Select Severity">
            <SelectOption value="CRITICAL" label="CRITICAL" />
          </SelectComponent>
          <FormControlCard labelForm="Issue Description" isTextArea />
        </GridLayout.Item>
      </GridLayout>

      <TableComponent headers={columns} data={data} headerKey="Head" />
    </CardFormK3>
  );
};

export default WRMUissues;
