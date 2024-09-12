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

const HazardType = () => {
  const [tableData, setTableData] = React.useState([]);

  const [formData, setFormData] = React.useState({
    hazard_type: "",
    hazard_severity: "",
    hazard_description: null,
    mitigation: "",
    remarks: "",
  });

  const headers = [
    { Header: "Hazard Type", accessor: "hazard_type" },
    { Header: "Hazard Severity", accessor: "hazard_severity" },
    { Header: "Hazard Desc", accessor: "hazard_description" },
    { Header: "mitigation", accessor: "mitigation" },
    { Header: "remarks", accessor: "remarks" },
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
    setFormData({
      hazard_type: "",
      hazard_description: "",
      depth_out: "",
      mitigation: "",
    }); // Reset form
  }, [formData]);

  const handleDelete = useCallback((row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {/* Grid Item pertama */}
      <GridItem>
        <CardFormK3 title="Job Hazard" subtitle="">
          <Flex gap={2}>
            <FormControlCard
              labelForm="Hazard Type"
              placeholder="hazard_type"
              type="text"
              value={formData.hazard_type}
              handleChange={handleChangeData("hazard_type")}
            />
            <FormControlCard
              labelForm="Hazard Severity"
              placeholder="Hazard Severity"
              type="text"
              value={formData.hazard_severity}
              handleChange={handleChangeData("hazard_severity")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Hazard Description"
              placeholder="Hazard Description"
              type="text"
              isTextArea
              value={formData.hazard_description}
              handleChange={handleChangeData("hazard_description")}
            />
          </Flex>
          <Flex>
            <FormControlCard
              labelForm="Mitigation"
              placeholder="Mitigation"
              value={formData.mitigation}
              isTextArea
              handleChange={handleChangeData("mitigation")}
            />
          </Flex>
          <Flex>
            <FormControlCard
              labelForm="Remarks"
              placeholder="Remarks"
              value={formData.remarks}
              handleChange={handleChangeData("remarks")}
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

export default HazardType;
