import React from "react";
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

const WellStratigraphyForm = () => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    stratigraphy_id: "",
    depth: "",
    depth_datum: "",
  });

  const headers = [
    { Header: "Stratigraphy ID", accessor: "stratigraphy_id" },
    { Header: "Depth", accessor: "depth" },
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

  const handleChangeData = (name, type) => (e) => {
    let value = e.target.value;

    if (type === "number") {
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(value)) value = "";
    } else if (type === "text") {
      value = String(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      stratigraphy_id: "",
      depth: "",
      depth_datum: "",
    });
  };

  const options = ["MSL", "KB", "GL"];

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

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
              type="text"
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
