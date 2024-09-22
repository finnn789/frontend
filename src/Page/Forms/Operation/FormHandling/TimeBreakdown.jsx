import React, { useEffect } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Radio,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import { GetCodeTimeBreakDown } from "../../../API/APIKKKS";

const TimeBreakdown = ({ handleChange }) => {
  const [codeTime, setCodeTime] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);

  React.useEffect(() => {
    GetCodeTimeBreakDown().then((res) => {
      setCodeTime(res);
    });
  }, []);

  React.useEffect(() => {
    handleChange(tableData);
  }, [tableData]);
  const [radio, setRadio] = React.useState("");
  const [formData, setFormData] = React.useState({
    start_time: null,
    end_time: null,
    start_measured_depth: null,
    end_measured_depth: null,
    category: null,
    p: null,
    npt: null,
    code: null,
    operation: null,
  });

  const headers = [
    { Header: "Start Time", accessor: "start_time" },
    { Header: "End Time", accessor: "end_time" },
    { Header: "Start Measured Depth", accessor: "start_measured_depth" },
    { Header: "End Measured Depth", accessor: "end_measured_depth" },
    { Header: "Category", accessor: "category" },
    { Header: "P", accessor: "p" },
    { Header: "NPT", accessor: "npt" },
    { Header: "Code", accessor: "code" },
    { Header: "Operation", accessor: "operation" },
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

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category: radio,
    }));
  }, [radio, setRadio]);
  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      start_time: "",
      end_time: "",
      start_measured_depth: 0,
      end_measured_depth: 0,
      category: "",
      p: null,
      npt: null,
      code: "",
      operation: null,
    }); // Reset form
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily={"Montserrat"}>
      {/* Grid Item pertama */}
      <GridItem>
        <CardFormK3 title="Time Breakdown" padding="18px 8px" subtitle="time">
          <Flex gap={2}>
            <FormControlCard
              labelForm="Start Time"
              placeholder="start_time"
              type="time"
              value={formData.start_time}
              handleChange={handleChangeData("start_time")}
            />
            <FormControlCard
              labelForm="End Time"
              placeholder="End Time"
              type="time"
              value={formData.end_time}
              handleChange={handleChangeData("end_time")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Start Depth"
              placeholder="Date"
              type="number"
              value={formData.start_measured_depth}
              handleChange={handleChangeData("start_measured_depth")}
            />
            <FormControlCard
              labelForm="End Depth"
              placeholder="Date"
              type="number"
              value={formData.end_measured_depth}
              //   isDisabled={!formData.startDate} // Disable if startDate is empty
              handleChange={handleChangeData("end_measured_depth")}
            />
          </Flex>
          <Flex>
            <RadioGroup value={radio} onChange={setRadio}>
              <VStack>
                <Flex flexDirection={"column"} gap={2}>
                  <Radio value="Productive">Productive</Radio>
                  <Radio value="Non_Productive">Non Productive</Radio>
                </Flex>
              </VStack>
            </RadioGroup>
          </Flex>
          <Flex>
            <SelectComponent onChange={handleChangeData("code")} label="Code" placeholder="Select Code">
              {codeTime.map((data, index) => (
                <SelectOption label={data.operation} value={data.operation} key={index} />
              ))}
            </SelectComponent>
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

export default TimeBreakdown;
