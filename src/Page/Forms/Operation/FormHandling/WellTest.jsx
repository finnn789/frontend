import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  Box,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";

const WellTestForm = ({ data, onChange }) => {
  const datas = data?.data;

  // State untuk menampung data dari form dan tabel
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    unit_type: "Metrics",
    depth_datum: "",
    zone_name: "",
    zone_top_depth: 0,
    zone_bottom_depth: 0,
    depth_uom: "",
  });

  // Mengisi tabel ketika menerima data dari parent
  useEffect(() => {
    if (datas?.job_plan?.well?.well_test) {
      setTableData(datas.job_plan.well.well_test); // Isi tabel jika ada data well_test
    }
  }, [datas]);

  // Handle perubahan pada form
  const handleChangeData = (name, type) => (e) => {
    let value = e.target.value;

    if (type === "number") {
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(value)) value = ""; // Jika parsing gagal, set nilai menjadi string kosong
    } else if (type === "text") {
      value = String(value);
    }

    // Set data form lokal
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle menambah data ke tabel
  const handleAddData = () => {
    const updatedTableData = [...tableData, formData]; // Tambah data baru ke tabel
    setTableData(updatedTableData);

    // Reset form setelah menambahkan data
    setFormData({
      unit_type: "Metrics",
      depth_datum: "",
      zone_name: "",
      zone_top_depth: 0,
      zone_bottom_depth: 0,
      depth_uom: "",
    });

    // Kirim perubahan ke parent untuk `well_test` di `datas.job_plan.well`
    onChange("job_plan.well.well_test", updatedTableData);
  };

  const handleDelete = (row) => {
    const updatedTableData = tableData.filter((data) => data !== row);
    setTableData(updatedTableData);

    // Kirim perubahan ke parent setelah menghapus data
    onChange("job_plan.well.well_test", updatedTableData);
  };

  const options = ["MSL", "KB", "GL"];

  const headers = [
    { Header: "Unit Type", accessor: "unit_type" },
    { Header: "Depth Datum", accessor: "depth_datum" },
    { Header: "Zone Name", accessor: "zone_name" },
    { Header: "Zone Top Depth", accessor: "zone_top_depth" },
    { Header: "Zone Bottom Depth", accessor: "zone_bottom_depth" },
    { Header: "Depth UOM", accessor: "depth_uom" },
    {
      Header: "Action",
      render: (row) => (
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => handleDelete(row)}
        >
          Hapus
        </Button>
      ),
    },
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily={"Montserrat"}>
      {/* Grid Item pertama */}
      <GridItem>
        <CardFormK3
          title="Well Test"
          padding="36px 28px"
          subtitle="Well Test"
          OptionDepth={options}
          OptionValue={(e) =>
            setFormData((prev) => ({ ...prev, depth_datum: e }))
          }
        >
          <Flex gap={2}>
            <FormControlCard
              labelForm="Unit Type"
              placeholder="Unit Type"
              type="text"
              value={formData.unit_type}
              handleChange={handleChangeData("unit_type", "text")}
            />
            <FormControlCard
              labelForm="Depth Datum"
              placeholder="Depth Datum"
              type="text"
              value={formData.depth_datum}
              handleChange={handleChangeData("depth_datum", "text")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Zone Name"
              placeholder="Zone Name"
              type="text"
              value={formData.zone_name}
              handleChange={handleChangeData("zone_name", "text")}
            />
            <FormControlCard
              labelForm="Zone Top Depth"
              placeholder="Zone Top Depth"
              type="number"
              value={formData.zone_top_depth}
              handleChange={handleChangeData("zone_top_depth", "number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Zone Bottom Depth"
              placeholder="Zone Bottom Depth"
              type="number"
              value={formData.zone_bottom_depth}
              handleChange={handleChangeData("zone_bottom_depth", "number")}
            />
            <FormControlCard
              labelForm="Depth UOM"
              placeholder="Depth UOM"
              type="text"
              value={formData.depth_uom}
              handleChange={handleChangeData("depth_uom", "text")}
            />
          </Flex>
          <Flex mt={4}>
            <Button colorScheme="blue" variant="solid" onClick={handleAddData}>
              Add
            </Button>
          </Flex>
        </CardFormK3>
      </GridItem>

      {/* Grid Item kedua */}
      <Box
        rounded={"lg"}
        overflowX="auto"
        overflowY={"auto"}
        borderWidth={"1px"}
        p={0}
      >
        <GridItem>
          <Tabs>
            <TabList>
              <Tab>Table</Tab>
            </TabList>
            <TabPanel>
              <Box maxH={"510px"}>
                <TableComponent data={tableData} headers={headers} />
              </Box>
            </TabPanel>
          </Tabs>
        </GridItem>
      </Box>
    </Grid>
  );
};

export default WellTestForm;
