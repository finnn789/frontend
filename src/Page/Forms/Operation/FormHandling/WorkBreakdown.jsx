import React from "react";
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

const WorkBreakdown = () => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    event: "",
    startDate: "",
    endDate: "",
    remark: "",
  });

  

  const headers = [
    { Header: "Event", accessor: "event" },
    { Header: "Start Date", accessor: "startDate" },
    { Header: "End Date", accessor: "endDate" },
    { Header: "Remark", accessor: "remark" },
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

  const handleChangeData = (name) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({ event: "", startDate: "", endDate: "", remark: "" }); // Reset form
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
     
      gap={4}
    
    >
      {/* Grid Item pertama */}
      <GridItem>
        <CardFormK3 title="Work Breakdown Structure" subtitle="">
          <Flex>
            <FormControlCard
              labelForm="Event"
              placeholder="Event"
              type="text"
              value={formData.event}
              handleChange={handleChangeData("event")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Start Date"
              placeholder="Date"
              type="date"
              value={formData.startDate}
              handleChange={handleChangeData("startDate")}
            />
            <FormControlCard
              labelForm="End Date"
              placeholder="Date"
              type="date"
              min={formData.startDate}
              value={formData.endDate}
              isDisabled={!formData.startDate} // Disable if startDate is empty
              handleChange={handleChangeData("endDate")}
            />
          </Flex>
          <Flex>
            <FormControlCard
              labelForm="Remark"
              placeholder="Remark"
              isTextArea
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

export default WorkBreakdown;
