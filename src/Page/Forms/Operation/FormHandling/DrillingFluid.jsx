import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";

const DrillingFluid = ({ handleChangeOfData }) => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    mud_type: "", // Mud Type
    time: "",
    mw_in: 0,
    mw_out: 0,
    temp_in: 0,
    temp_out: 0,
    pres_grad: 0,
    visc: 0,
    pv: 0,
    yp: 0,
    gels_10_sec: 0,
    gels_10_min: 0,
    fluid_loss: 0,
    ph: 0,
    solids: 0,
    sand: 0,
    water: 0,
    oil: 0,
    hgs: 0,
    lgs: 0,
    ltlp: 0,
    hthp: 0,
    cake: 0,
    e_stb: 0,
    pf: 0,
    mf: 0,
    pm: 0,
    ecd: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChangeData = useCallback(
    (name, type) => (e) => {
      let value = e.target.value;

      if (type === "number") {
        value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
        if (isNaN(value)) {
          value = "";
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const validateFormData = () => {
    let tempErrors = {};
    if (!formData.mud_type) tempErrors.mud_type = "Mud Type is required";
    if (!formData.time) tempErrors.time = "Time is required";
    if (!formData.mw_in) tempErrors.mw_in = "MW In is required";
    if (!formData.mw_out) tempErrors.mw_out = "MW Out is required";
    if (!formData.temp_in) tempErrors.temp_in = "Temp In is required";
    if (!formData.temp_out) tempErrors.temp_out = "Temp Out is required";
    if (!formData.pres_grad) tempErrors.pres_grad = "Pres. Grad is required";
    if (!formData.visc) tempErrors.visc = "Visc is required";
    if (!formData.pv) tempErrors.pv = "PV is required";
    if (!formData.yp) tempErrors.yp = "YP is required";
    if (!formData.gels_10_sec) tempErrors.gels_10_sec = "Gels 10 sec is required";
    if (!formData.gels_10_min) tempErrors.gels_10_min = "Gels 10 min is required";
    if (!formData.fluid_loss) tempErrors.fluid_loss = "Fluid Loss is required";
    if (!formData.ph) tempErrors.ph = "pH is required";
    if (!formData.solids) tempErrors.solids = "Solids is required";
    if (!formData.sand) tempErrors.sand = "Sand is required";
    if (!formData.water) tempErrors.water = "Water is required";
    if (!formData.oil) tempErrors.oil = "Oil is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Returns true if no errors
  };

  const handleAddData = () => {
    if (validateFormData()) {
      setTableData((prevTableData) => [...prevTableData, formData]);
      setFormData({
        mud_type: "",
        time: "",
        mw_in: 0,
        mw_out: 0,
        temp_in: 0,
        temp_out: 0,
        pres_grad: 0,
        visc: 0,
        pv: 0,
        yp: 0,
        gels_10_sec: 0,
        gels_10_min: 0,
        fluid_loss: 0,
        ph: 0,
        solids: 0,
        sand: 0,
        water: 0,
        oil: 0,
        hgs: 0,
        lgs: 0,
        ltlp: 0,
        hthp: 0,
        cake: 0,
        e_stb: 0,
        pf: 0,
        mf: 0,
        pm: 0,
        ecd: 0,
      });
      setErrors({});
    }
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };

  useEffect(() => {
    handleChangeOfData(tableData);
  }, [tableData]);

  const headers = [
    { Header: "Mud Type", accessor: "mud_type" },
    { Header: "Time", accessor: "time" },
    { Header: "MW In", accessor: "mw_in" },
    { Header: "MW Out", accessor: "mw_out" },
    { Header: "Temp In", accessor: "temp_in" },
    { Header: "Temp Out", accessor: "temp_out" },
    { Header: "Pres. Grad", accessor: "pres_grad" },
    { Header: "Visc", accessor: "visc" },
    { Header: "PV", accessor: "pv" },
    { Header: "YP", accessor: "yp" },
    { Header: "Gels 10 sec", accessor: "gels_10_sec" },
    { Header: "Gels 10 min", accessor: "gels_10_min" },
    { Header: "Fluid Loss", accessor: "fluid_loss" },
    { Header: "pH", accessor: "ph" },
    { Header: "Solids", accessor: "solids" },
    { Header: "Sand", accessor: "sand" },
    { Header: "Water", accessor: "water" },
    { Header: "Oil", accessor: "oil" },
    { Header: "HGS", accessor: "hgs" },
    { Header: "LGS", accessor: "lgs" },
    { Header: "LTLP", accessor: "ltlp" },
    { Header: "HTHP", accessor: "hthp" },
    { Header: "Cake", accessor: "cake" },
    { Header: "E Stb", accessor: "e_stb" },
    { Header: "PF", accessor: "pf" },
    { Header: "MF", accessor: "mf" },
    { Header: "PM", accessor: "pm" },
    { Header: "ECD", accessor: "ecd" },
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

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily={"Montserrat"}>
      <GridItem colSpan={2}>
        <CardFormK3
          title="Drilling Fluid"
          padding="18px 8px"
          subtitle="Drilling Fluid"
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem colSpan={2}>
              <FormControlCard
                labelForm="Time"
                placeholder="Time"
                type="datetime-local"
                value={formData.time}
                handleChange={handleChangeData("time", "text")}
                isInvalid={!!errors.time}
                errorMessage={errors.time}
              />
              <SelectComponent
                label="Mud Type"
                value={formData.mud_type}
                onChange={handleChangeData("mud_type", "text")}
                isInvalid={!!errors.mud_type}
                errorMessage={errors.mud_type}
              >
                <SelectOption label="Liquid" value="LIQUID" />
                <SelectOption label="Dry" value="DRY" />
              </SelectComponent>
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="MW In"
                placeholder="MW In"
                type="number"
                value={formData.mw_in}
                handleChange={handleChangeData("mw_in", "number")}
                isInvalid={!!errors.mw_in}
                errorMessage={errors.mw_in}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="MW Out"
                placeholder="MW Out"
                type="number"
                value={formData.mw_out}
                handleChange={handleChangeData("mw_out", "number")}
                isInvalid={!!errors.mw_out}
                errorMessage={errors.mw_out}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="Temp In"
                placeholder="Temp In"
                type="number"
                value={formData.temp_in}
                handleChange={handleChangeData("temp_in", "number")}
                isInvalid={!!errors.temp_in}
                errorMessage={errors.temp_in}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="Temp Out"
                placeholder="Temp Out"
                type="number"
                value={formData.temp_out}
                handleChange={handleChangeData("temp_out", "number")}
                isInvalid={!!errors.temp_out}
                errorMessage={errors.temp_out}
              />
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Pres. Grad"
                  placeholder="Pres. Grad"
                  type="number"
                  value={formData.pres_grad}
                  handleChange={handleChangeData("pres_grad", "number")}
                  isInvalid={!!errors.pres_grad}
                  errorMessage={errors.pres_grad}
                />
                <FormControlCard
                  labelForm="Visc"
                  placeholder="Visc"
                  type="number"
                  value={formData.visc}
                  handleChange={handleChangeData("visc", "number")}
                  isInvalid={!!errors.visc}
                  errorMessage={errors.visc}
                />
              </Flex>
            </GridItem>

            {/* Add validation for other fields here similarly */}
          </Grid>

          <Flex justifyContent="flex-end" mt={4}>
            <Button colorScheme="blue" variant="solid" onClick={handleAddData}>
              Add
            </Button>
          </Flex>
        </CardFormK3>
      </GridItem>

      <GridItem colSpan={2}>
        <Box
          rounded={"lg"}
          overflowX="auto"
          overflowY={"auto"}
          borderWidth={"1px"}
          p={0}
        >
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
        </Box>
      </GridItem>
    </Grid>
  );
};

export default DrillingFluid;
