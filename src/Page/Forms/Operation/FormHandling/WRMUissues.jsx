import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import FormControlCard from "../../Components/FormControl";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import TableComponent from "../../Components/TableComponent";
import { Button } from "@chakra-ui/react";

const WRMUissues = () => {
  const columns = [
    { Head: "Nama", accessor: "nama" },
    { Head: "Umur", accessor: "umur" },
    { Head: "Posisi", accessor: "posisi" },
    { Head: "Departemen", accessor: "departemen" },
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
      nama: "John Doe",
      umur: 28,
      posisi: "Software Engineer",
      departemen: "Engineering",
    },
    {
      nama: "Jane Smith",
      umur: 34,
      posisi: "Project Manager",
      departemen: "Operations",
    },
    {
      nama: "Samuel Green",
      umur: 45,
      posisi: "Designer",
      departemen: "Marketing",
    },
    {
      nama: "Maria Garcia",
      umur: 30,
      posisi: "Product Owner",
      departemen: "Product",
    },
  ];
  return (
    <CardFormK3 title="WRM Issues" subtitle="">
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
