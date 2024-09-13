import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import {
  Box,
  Button,
  Grid,
  GridItem,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";

const HealthSafety = () => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    stopCards: "",
    lta: "",
    spill: "",
    h2sTest: "",
    hseMtg: "",
    kickTrip: "",
    kickDrill: "",
    fire: "",
    incidentTime: "",
    incident: "",
    type: "",
    comments: "",
  });

  const headers = [
    { Header: "Stop Cards", accessor: "stopCards" },
    { Header: "LTA", accessor: "lta" },
    { Header: "Spill", accessor: "spill" },
    { Header: "H2S Test", accessor: "h2sTest" },
    { Header: "HSE Mtg", accessor: "hseMtg" },
    { Header: "Kick-Trip", accessor: "kickTrip" },
    { Header: "Kick-Drill", accessor: "kickDrill" },
    { Header: "Fire", accessor: "fire" },
    { Header: "Incident Time", accessor: "incidentTime" },
    { Header: "Incident", accessor: "incident" },
    { Header: "Type", accessor: "type" },
    { Header: "Comments", accessor: "comments" },
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
      stopCards: "",
      lta: "",
      spill: "",
      h2sTest: "",
      hseMtg: "",
      kickTrip: "",
      kickDrill: "",
      fire: "",
      incidentTime: "",
      incident: "",
      type: "",
      comments: "",
    });
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

  const selectOptionValue= [
    {
        label: "LTA",
        name: "lta",
    },
    {
        label: "Spill",
        name: "spill",
    },
    {
        label: "H2S Test",
        name: "h2sTest",
    },
    {
        label: "HSE Mtg",
        name: "hseMtg",
    },
    {
        label: "Kick-Trip",
        name: "kickTrip",
    },
    {
        label: "Kick-Drill",
        name: "kickDrill",
    },
    {
        label: "Fire",
        name: "fire",
    },
  ]

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap={4} fontFamily={"Montserrat"}>
      <GridItem>
        <CardFormK3
          title="Health, Safety and Environment"
          padding="18px 8px"
          subtitle="Details"
        >
          <SimpleGrid columns={4} gap={4}>
            <FormControlCard
              labelForm="Stop Cards"
              placeholder="Enter Stop Card"
              type="text"
              value={formData.stopCards}
              handleChange={handleChangeData("stopCards")}
            />
            {selectOptionValue.map((field,index) => (
              <SelectComponent key={index} label={field.label} onChange={handleChangeData(field.name)}>
                <SelectOption value="Y" label="Y" />
                <SelectOption value="N" label="N" />
              </SelectComponent>
            ))}
          </SimpleGrid>
          <SimpleGrid columns={2} gap={4}>
            <FormControlCard
              labelForm="Incident Time"
              placeholder="Enter Incident Time"
              type="text"
              value={formData.incidentTime}
              handleChange={handleChangeData("incidentTime")}
            />
            <FormControlCard
              labelForm="Incident"
              placeholder="Enter Incident"
              type="text"
              value={formData.incident}
              handleChange={handleChangeData("incident")}
            />
            <FormControlCard
              labelForm="Type"
              placeholder="Enter Type"
              type="text"
              value={formData.type}
              handleChange={handleChangeData("type")}
            />
            <FormControlCard
              labelForm="Comments"
              placeholder="Enter Comments"
              type="text"
              value={formData.comments}
              handleChange={handleChangeData("comments")}
            />
          </SimpleGrid>
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
        <Box
          rounded="lg"
          overflowX="auto"
          overflowY="auto"
          borderWidth="1px"
          p={0}
        >
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

export default HealthSafety;
