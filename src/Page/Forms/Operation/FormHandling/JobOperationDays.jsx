import React, { useCallback } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";

const JobOperationDays = () => {
  const [tableData, setTableData] = React.useState([]);

  const [formData, setFormData] = React.useState({
    phase: "",
    depth_in: null,
    depth_out: null,
    operation_days: "",
  });

  const headers = [
    { Header: "phase", accessor: "phase" },
    { Header: "Depth In", accessor: "depth_in" },
    { Header: "Depth Out", accessor: "depth_out" },
    { Header: "operation_days", accessor: "operation_days" },
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

  const handleChangeData = useCallback(
    (name) => (e) => {
      let value = e.target.value;

      if (e.target.type === "number") {
        value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
        if (isNaN(value)) value = "";
      } else {
        value = value.toString();
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  // Memoized handleAddData function to prevent unnecessary re-renders
  const handleAddData = useCallback(() => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({ phase: "", depth_in: "", depth_out: "", operation_days: "" }); // Reset form
  }, [formData]);

  const handleDelete = useCallback((row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {/* Grid Item pertama */}
      <GridItem >
        <CardFormK3 title="Job Operation Days" subtitle="">
          <Flex>
            <FormControlCard
              labelForm="Phase"
              placeholder="Phase"
              type="text"
              value={formData.phase}
              handleChange={handleChangeData("phase")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Depth In"
              placeholder="Depth In"
              type="number"
              value={formData.depth_in}
              handleChange={handleChangeData("depth_in")}
            />
            <FormControlCard
              labelForm="Depth Out"
              placeholder="Depth Out"
              type="number"
              value={formData.depth_out}
              // Disable if depth_in is empty
              handleChange={handleChangeData("depth_out")}
            />
          </Flex>
          <Flex>
            <FormControlCard
              labelForm="Operation Days"
              placeholder="Operation Days"
              value={formData.operation_days}
              handleChange={handleChangeData("operation_days")}
            />
          </Flex>
          <Flex>
            <Button colorScheme="blue" variant="solid" onClick={handleAddData}>
              Add
            </Button>
          </Flex>
        </CardFormK3>
      </GridItem>

      {/* Grid Item kedua */}
      <Box rounded={"lg"} borderWidth={"1px"} p={0}>
        <GridItem>
          <Tabs>
            <TabList>
              <Tab>Table</Tab>
            </TabList>
            <TabPanel>
              <TableComponent data={tableData} headers={headers} />
            </TabPanel>
          </Tabs>
        </GridItem>
      </Box>
    </Grid>
  );
};

export default JobOperationDays;

