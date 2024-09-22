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

const HazardType = ({ data, onChange }) => {
  // Mengisi tableData dan formData dengan nilai dari data yang diterima dari parent
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    hazard_type: "",
    severity: "",
    hazard_description: "",
    mitigation: "",
    remark: "",
  });

  useEffect(() => {
    if (data?.job_plan?.job_hazards) {
      setTableData(data.job_plan.job_hazards);
    }
  }, [data]);

  const headers = [
    { Header: "Hazard Type", accessor: "hazard_type" },
    { Header: "Hazard Severity", accessor: "severity" },
    { Header: "Hazard Desc", accessor: "hazard_description" },
    { Header: "Mitigation", accessor: "mitigation" },
    { Header: "Remarks", accessor: "remark" },
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
    onChange("job_plan.job_hazards", updatedTableData);

    // Reset form
    setFormData({
      hazard_type: "",
      severity: "",
      hazard_description: "",
      mitigation: "",
      remark: "",
    });
  }, [formData, tableData, onChange]);

  const handleDelete = useCallback((row) => {
    const updatedTableData = tableData.filter((data) => data !== row);
    setTableData(updatedTableData);

    // Kirim perubahan ke parent
    onChange("job_plan.job_hazards", updatedTableData);
  }, [tableData, onChange]);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      {/* Grid Item pertama */}
      <GridItem>
        <CardFormK3 title="Job Hazard" subtitle="">
          <Flex gap={2}>
            <FormControlCard
              labelForm="Hazard Type"
              placeholder="Hazard Type"
              type="text"
              value={formData.hazard_type}
              handleChange={handleChangeData("hazard_type")}
            />
            <FormControlCard
              labelForm="Hazard Severity"
              placeholder="Hazard Severity"
              type="text"
              value={formData.severity}
              handleChange={handleChangeData("severity")}
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
              value={formData.remark}
              handleChange={handleChangeData("remark")}
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
