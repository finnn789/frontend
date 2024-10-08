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

const DirectionalSurvey = () => {
  const [tableData, setTableData] = React.useState([]);
  const [formData, setFormData] = React.useState({
    md: "",
    incl: "",
    azm: "",
  });

  const [errors, setErrors] = React.useState({});

  const headers = [
    { Header: "MD", accessor: "md" },
    { Header: "Inclination", accessor: "incl" },
    { Header: "Azimuth", accessor: "azm" },
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

  const validateFormData = () => {
    let tempErrors = {};
    if (!formData.md) tempErrors.md = "Measured Depth (MD) is required";
    if (!formData.incl) tempErrors.incl = "Inclination is required";
    if (!formData.azm) tempErrors.azm = "Azimuth is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const handleAddData = () => {
    if (validateFormData()) {
      setTableData((prevTableData) => [...prevTableData, formData]);
      setFormData({
        md: "",
        incl: "",
        azm: "",
      });
      setErrors({}); // Clear errors after successful addition
    }
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
          title="Directional Data"
          padding="18px 8px"
          subtitle="Measurements"
        >
          <FormControlCard
            labelForm="MD (Measured Depth)"
            placeholder="Enter Measured Depth"
            type="number"
            value={formData.md}
            handleChange={handleChangeData("md")}
            isInvalid={!!errors.md}
            errorMessage={errors.md}
          />
          <FormControlCard
            labelForm="Inclination"
            placeholder="Enter Inclination"
            type="number"
            value={formData.incl}
            handleChange={handleChangeData("incl")}
            isInvalid={!!errors.incl}
            errorMessage={errors.incl}
          />
          <FormControlCard
            labelForm="Azimuth"
            placeholder="Enter Azimuth"
            type="number"
            value={formData.azm}
            handleChange={handleChangeData("azm")}
            isInvalid={!!errors.azm}
            errorMessage={errors.azm}
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
      <Box rounded="lg" overflowX="auto" overflowY="auto" borderWidth="1px">
        <GridItem>
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
        </GridItem>
      </Box>
    </Grid>
  );
};

export default DirectionalSurvey;
