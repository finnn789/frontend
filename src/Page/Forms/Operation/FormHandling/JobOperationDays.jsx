import React, { useEffect, useCallback } from "react";
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

const JobOperationDays = ({ data, onChange }) => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    phase: "",
    depth_in: null,
    depth_out: null,
    operation_days: "",
    unit_type: "Metrics", // Default value if no previous data
    depth_datum: "RT", // Default value if no previous data
  });

  useEffect(() => {
    if (data?.job_plan?.job_operation_days) {
      setTableData(data.job_plan.job_operation_days);
    }
  }, [data]);

  // Set unit_type and depth_datum dynamically from the last entry if available
  useEffect(() => {
    if (tableData.length > 0) {
      const lastEntry = tableData[tableData.length - 1];
      setFormData((prevData) => ({
        ...prevData,
        unit_type: lastEntry.unit_type || "Metrics",
        depth_datum: lastEntry.depth_datum || "RT",
      }));
    }
  }, [tableData]);

  const headers = [
    { Header: "Phase", accessor: "phase" },
    { Header: "Depth In", accessor: "depth_in" },
    { Header: "Depth Out", accessor: "depth_out" },
    { Header: "Operation Days", accessor: "operation_days" },
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

  const handleAddData = useCallback(() => {
    const updatedTableData = [...tableData, formData];
    setTableData(updatedTableData);

    // Kirim perubahan ke parent
    onChange("job_plan.job_operation_days", updatedTableData);

    // Reset form but keep unit_type and depth_datum dynamically from the last entry
    setFormData({
      phase: "",
      depth_in: "",
      depth_out: "",
      operation_days: "",
      unit_type: formData.unit_type, // Keep the same unit_type as the last entry
      depth_datum: formData.depth_datum, // Keep the same depth_datum as the last entry
    });
  }, [formData, tableData, onChange]);

  const handleDelete = useCallback((row) => {
    const updatedTableData = tableData.filter((data) => data !== row);
    setTableData(updatedTableData);

    // Kirim perubahan ke parent
    onChange("job_plan.job_operation_days", updatedTableData);
  }, [tableData, onChange]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {/* Grid Item pertama */}
      <GridItem>
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
              handleChange={handleChangeData("depth_out")}
            />
          </Flex>
          <Flex>
            <FormControlCard
              labelForm="Operation Days"
              placeholder="Operation Days"
              type="number"
              value={formData.operation_days}
              handleChange={handleChangeData("operation_days")}
            />
          </Flex>
          {/* Display unit_type and depth_datum dynamically from the last entry */}
          <Flex>
            <FormControlCard
              labelForm="Unit Type"
              placeholder="Unit Type"
              value={formData.unit_type}
              isDisabled={true} // Disable as it's auto-filled from last entry
            />
            <FormControlCard
              labelForm="Depth Datum"
              placeholder="Depth Datum"
              value={formData.depth_datum}
              isDisabled={true} // Disable as it's auto-filled from last entry
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
