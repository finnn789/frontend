import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";

const Pumps = () => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    slow_speed: "Y",
    circulate: 0,
    strokes: 0,
    pressure: 0,
    liner_size: 0,
    efficiency: 0,
    daily_operations_report_id: "string",
  });

  const headers = [
    { Header: "Circulate", accessor: "circulate" },
    { Header: "Strokes", accessor: "strokes" },
    { Header: "Pressure", accessor: "pressure" },
    {
      Header: "Action",
      render: (row) => (
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => handleDelete(row)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleChangeData = (name) => (e) => {
    const { value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      slow_speed: "Y",
      circulate: 0,
      strokes: 0,
      pressure: 0,
      liner_size: 0,
      efficiency: 0,
      daily_operations_report_id: "string",
    });
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      minW="100%"
      w="100%"
      h="100%"
      gap={4}
      fontFamily={"Montserrat"}
    >
      <GridItem>
        <CardFormK3
          title="Pump Data"
          padding="18px 8px"
          subtitle="Measurements"
        >
          <FormControlCard
            labelForm="Slow Speed"
            placeholder="Enter Slow Speed"
            type="text"
            value={formData.slow_speed}
            handleChange={handleChangeData("slow_speed")}
          />
          <FormControlCard
            labelForm="Circulate"
            placeholder="Enter Circulate"
            type="number"
            value={formData.circulate}
            handleChange={handleChangeData("circulate")}
          />
          <FormControlCard
            labelForm="Strokes"
            placeholder="Enter Strokes"
            type="number"
            value={formData.strokes}
            handleChange={handleChangeData("strokes")}
          />
          <FormControlCard
            labelForm="Pressure"
            placeholder="Enter Pressure"
            type="number"
            value={formData.pressure}
            handleChange={handleChangeData("pressure")}
          />
          <FormControlCard
            labelForm="Liner Size"
            placeholder="Enter Liner Size"
            type="number"
            value={formData.liner_size}
            handleChange={handleChangeData("liner_size")}
          />
          <FormControlCard
            labelForm="Efficiency"
            placeholder="Enter Efficiency"
            type="number"
            value={formData.efficiency}
            handleChange={handleChangeData("efficiency")}
          />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleAddData}
            mt={4}
          >
            Add
          </Button>
        </CardFormK3>
      </GridItem>
      <GridItem>
        <Box rounded="lg" overflowX="auto" overflowY="auto" borderWidth="1px">
          <Tabs>
            <TabList>
              <Tab>Table</Tab>
            </TabList>
            <TabPanel>
              <Box maxH="510px">
                <TableComponent data={tableData} headers={headers} />
              </Box>
            </TabPanel>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Pumps;
