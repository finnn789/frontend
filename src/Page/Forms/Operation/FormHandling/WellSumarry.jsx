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

const WellSummaryForm = ({ data, onChange }) => {
  const datas = data?.data;
  
  // State untuk menampung data dari form dan tabel
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    depth: 0,
    hole_diameter: 0,
    bit: "",
    casing_outer_diameter: 0,
    logging: "",
    mud_program: "",
    cementing_program: "",
    bottom_hole_temperature: 0,
    rate_of_penetration: 0,
    remarks: "",
  });

  // Mengisi tabel ketika menerima data dari parent
  useEffect(() => {
    if (datas?.job_plan?.well?.well_summary) {
      setTableData(datas.job_plan.well.well_summary); // Isi tabel jika ada data well_summary
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
      depth_datum: "RT",
      depth: 0,
      hole_diameter: 0,
      bit: "",
      casing_outer_diameter: 0,
      logging: "",
      mud_program: "",
      cementing_program: "",
      bottom_hole_temperature: 0,
      rate_of_penetration: 0,
      remarks: "",
    });

    // Kirim perubahan ke parent untuk `well_summary` di `datas.job_plan.well`
    onChange("job_plan.well.well_summary", updatedTableData);
  };

  const options = ["MSL", "GL", "RT", "RKB"];

  const handleDelete = (row) => {
    const updatedTableData = tableData.filter((item) => item !== row);
    setTableData(updatedTableData);

    // Kirim perubahan ke parent setelah menghapus data
    onChange("job_plan.well.well_summary", updatedTableData);
  };

  const headers = [
    { Header: "Depth Datum", accessor: "depth_datum" },
    { Header: "Depth", accessor: "depth" },
    { Header: "Hole Diameter", accessor: "hole_diameter" },
    { Header: "Bit", accessor: "bit" },
    { Header: "Casing Outer Diameter", accessor: "casing_outer_diameter" },
    { Header: "Logging", accessor: "logging" },
    { Header: "Mud Program", accessor: "mud_program" },
    { Header: "Cementing Program", accessor: "cementing_program" },
    { Header: "Bottom Hole Temperature", accessor: "bottom_hole_temperature" },
    { Header: "Rate of Penetration", accessor: "rate_of_penetration" },
    { Header: "Remarks", accessor: "remarks" },
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
          title="Well Summary"
          padding="36px 28px"
          subtitle="Well Details"
          OptionDepth={options}
          OptionValue={(e) =>
            setFormData((prev) => ({ ...prev, depth_datum: e }))
          }
        >
          <Flex gap={2}>
            <FormControlCard
            isDisabled
              labelForm="Depth"
              placeholder="Depth"
              type="number"
              value={formData.depth}
              handleChange={handleChangeData("depth", "number")}
            />
            <FormControlCard
            isDisabled
              labelForm="Hole Diameter"
              placeholder="Hole Diameter"
              type="number"
              value={formData.hole_diameter}
              handleChange={handleChangeData("hole_diameter", "number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
            isDisabled
              labelForm="Bit"
              placeholder="Bit"
              type="text"
              value={formData.bit}
              handleChange={handleChangeData("bit", "text")}
            />
            <FormControlCard
            isDisabled
              labelForm="Casing Outer Diameter"
              placeholder="Casing Outer Diameter"
              type="number"
              value={formData.casing_outer_diameter}
              handleChange={handleChangeData("casing_outer_diameter", "number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
            isDisabled
              labelForm="Logging"
              placeholder="Logging"
              type="text"
              value={formData.logging}
              handleChange={handleChangeData("logging", "text")}
            />
            <FormControlCard
            isDisabled
              labelForm="Mud Program"
              placeholder="Mud Program"
              type="text"
              value={formData.mud_program}
              handleChange={handleChangeData("mud_program", "text")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
            isDisabled
              labelForm="Cementing Program"
              placeholder="Cementing Program"
              type="text"
              value={formData.cementing_program}
              handleChange={handleChangeData("cementing_program", "text")}
            />
            <FormControlCard
            isDisabled
              labelForm="Bottom Hole Temperature"
              placeholder="Bottom Hole Temperature"
              type="number"
              value={formData.bottom_hole_temperature}
              handleChange={handleChangeData(
                "bottom_hole_temperature",
                "number"
              )}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
            isDisabled
              labelForm="Rate of Penetration"
              placeholder="Rate of Penetration"
              type="number"
              value={formData.rate_of_penetration}
              handleChange={handleChangeData("rate_of_penetration", "number")}
            />
            <FormControlCard
            isDisabled
              labelForm="Remarks"
              placeholder="Remarks"
              type="text"
              value={formData.remarks}
              handleChange={handleChangeData("remarks", "text")}
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

export default WellSummaryForm;
