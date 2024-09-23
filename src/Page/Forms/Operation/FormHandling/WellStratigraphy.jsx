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

const WellStratigraphyForm = ({ data, onChange }) => {
  const datas = data?.data;

  // State untuk menampung data dari form dan tabel
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    stratigraphy_id: "",
    top_depth: "",
    bottom_depth: "",
    depth_datum: "",
  });

  // Mengisi tabel ketika menerima data dari parent
  useEffect(() => {
    if (datas?.job_plan?.well?.well_stratigraphy) {
      setTableData(datas.job_plan.well.well_stratigraphy); // Isi tabel jika ada data well_stratigraphy
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
      stratigraphy_id: "",
      top_depth: "",
      bottom_depth: "",
      depth_datum: "",
    });

    // Kirim perubahan ke parent untuk `well_stratigraphy` di `datas.job_plan.well`
    onChange("job_plan.well.well_stratigraphy", updatedTableData);
  };

  const handleDelete = (row) => {
    const updatedTableData = tableData.filter((data) => data !== row);
    setTableData(updatedTableData);

    // Kirim perubahan ke parent setelah menghapus data
    onChange("job_plan.well.well_stratigraphy", updatedTableData);
  };

  const options = ["MSL", "KB", "GL"];

  const headers = [
    { Header: "Stratigraphy ID", accessor: "stratigraphy_id" },
    { Header: "Top Depth", accessor: "top_depth" },
    { Header: "Bottom Depth", accessor: "bottom_depth" },
    { Header: "Depth Datum", accessor: "depth_datum" },
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
          title="Well Stratigraphy"
          padding="36px 28px"
          subtitle="Well Stratigraphy"
          OptionDepth={options}
          OptionValue={(e) =>
            setFormData((prev) => ({ ...prev, depth_datum: e }))
          }
        >
          <Flex gap={2}>
            <FormControlCard
              labelForm="Stratigraphy ID"
              placeholder="Stratigraphy ID"
              type="text"
              value={formData.stratigraphy_id}
              handleChange={handleChangeData("stratigraphy_id", "text")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Top Depth"
              placeholder="Top Depth"
              type="number"
              value={formData.top_depth}
              handleChange={handleChangeData("top_depth", "number")}
            />
            <FormControlCard
              labelForm="Bottom Depth"
              placeholder="Bottom Depth"
              type="number"
              value={formData.bottom_depth}
              handleChange={handleChangeData("bottom_depth", "number")}
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

export default WellStratigraphyForm;
