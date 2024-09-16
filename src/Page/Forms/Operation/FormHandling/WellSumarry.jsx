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
  Radio,
  RadioGroup,
  VStack,
  Flex,
} from "@chakra-ui/react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";

const WellSummaryForm = () => {
  const [tableData, setTableData] = React.useState([]);
  const [radio, setRadio] = React.useState("");
  const [formData, setFormData] = React.useState({
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

  console.log(tableData);

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

  const handleChangeData = (name, type) => (e) => {
    let value = e.target.value;

    if (type === "number") {
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(value)) value = ""; // Jika parsing gagal, set nilai menjadi string kosong
    } else if (type === "text") {
      value = String(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category: radio,
    }));
  }, [radio, setRadio]);

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
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
    }); // Reset form
  };

  const options = ["MSL", "GL", "RT", "RKB"];

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
              labelForm="Depth"
              placeholder="Depth"
              type="number"
              value={formData.depth}
              handleChange={handleChangeData("depth","number")}
            />
            <FormControlCard
              labelForm="Hole Diameter"
              placeholder="Hole Diameter"
              type="number"
              value={formData.hole_diameter}
              handleChange={handleChangeData("hole_diameter","number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Bit"
              placeholder="Bit"
              type="text"
              value={formData.bit}
              handleChange={handleChangeData("bit","text")}
            />
            <FormControlCard
              labelForm="Casing Outer Diameter"
              placeholder="Casing Outer Diameter"
              type="number"
              value={formData.casing_outer_diameter}
              handleChange={handleChangeData("casing_outer_diameter","number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Logging"
              placeholder="Logging"
              type="text"
              value={formData.logging}
              handleChange={handleChangeData("logging")}
            />
            <FormControlCard
              labelForm="Mud Program"
              placeholder="Mud Program"
              type="text"
              value={formData.mud_program}
              handleChange={handleChangeData("mud_program")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Cementing Program"
              placeholder="Cementing Program"
              type="text"
              value={formData.cementing_program}
              handleChange={handleChangeData("cementing_program")}
            />
            <FormControlCard
              labelForm="Bottom Hole Temperature"
              placeholder="Bottom Hole Temperature"
              type="number"
              value={formData.bottom_hole_temperature}
              handleChange={handleChangeData("bottom_hole_temperature","number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Rate of Penetration"
              placeholder="Rate of Penetration"
              type="number"
              value={formData.rate_of_penetration}
              handleChange={handleChangeData("rate_of_penetration","number")}
            />
            <FormControlCard
              labelForm="Remarks"
              placeholder="Remarks"
              type="text"
              value={formData.remarks}
              handleChange={handleChangeData("remarks","text")}
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
