import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Button,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tab,
} from "@chakra-ui/react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import TableComponent from "../../Components/TableComponent";

const DrillingFluid = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    time: "",
    mw_in: "",
    mw_out: "",
    temp_in: "",
    temp_out: "",
    pres_grad: "",
    visc: "",
    pv: "",
    yp: "",
    gels_10_sec: "",
    gels_10_min: "",
    fluid_loss: "",
    ph: "",
    solids: "",
    sand: "",
    water: "",
    oil: "",
    hgs: "",
    lgs: "",
    ltlp: "",
    hthp: "",
    cake: "",
    e_stb: "",
    pf: "",
    mf: "",
    pm: "",
    ecd: "",
  });

  const headers = [
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

  const handleChangeData = (name) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      time: "",
      mw_in: "",
      mw_out: "",
      temp_in: "",
      temp_out: "",
      pres_grad: "",
      visc: "",
      pv: "",
      yp: "",
      gels_10_sec: "",
      gels_10_min: "",
      fluid_loss: "",
      ph: "",
      solids: "",
      sand: "",
      water: "",
      oil: "",
      hgs: "",
      lgs: "",
      ltlp: "",
      hthp: "",
      cake: "",
      e_stb: "",
      pf: "",
      mf: "",
      pm: "",
      ecd: "",
    });
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily={"Montserrat"}>
      <GridItem colSpan={2}>
        <CardFormK3 title="Drilling Fluid" padding="18px 8px" subtitle="Drilling Fluid">
          {/* Layout Grid with 2 columns for inputs */}
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem colSpan={2}>
              <FormControlCard
                labelForm="Time"
                placeholder="Time"
                type="text"
                value={formData.time}
                handleChange={handleChangeData("time")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="MW In"
                placeholder="MW In"
                type="text"
                value={formData.mw_in}
                handleChange={handleChangeData("mw_in")}
              />
            </GridItem>
            <GridItem>
              <FormControlCard
                labelForm="MW Out"
                placeholder="MW Out"
                type="text"
                value={formData.mw_out}
                handleChange={handleChangeData("mw_out")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="Temp In"
                placeholder="Temp In"
                type="text"
                value={formData.temp_in}
                handleChange={handleChangeData("temp_in")}
              />
            </GridItem>
            <GridItem>
              <FormControlCard
                labelForm="Temp Out"
                placeholder="Temp Out"
                type="text"
                value={formData.temp_out}
                handleChange={handleChangeData("temp_out")}
              />
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Pres. Grad"
                  placeholder="Pres. Grad"
                  type="text"
                  value={formData.pres_grad}
                  handleChange={handleChangeData("pres_grad")}
                />

                <FormControlCard
                  labelForm="Visc"
                  placeholder="Visc"
                  type="text"
                  value={formData.visc}
                  handleChange={handleChangeData("visc")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="PV"
                  placeholder="PV"
                  type="text"
                  value={formData.pv}
                  handleChange={handleChangeData("pv")}
                />

                <FormControlCard
                  labelForm="YP"
                  placeholder="YP"
                  type="text"
                  value={formData.yp}
                  handleChange={handleChangeData("yp")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Gels 10 sec"
                  placeholder="Gels 10 sec"
                  type="text"
                  value={formData.gels_10_sec}
                  handleChange={handleChangeData("gels_10_sec")}
                />

                <FormControlCard
                  labelForm="Gels 10 min"
                  placeholder="Gels 10 min"
                  type="text"
                  value={formData.gels_10_min}
                  handleChange={handleChangeData("gels_10_min")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Fluid Loss"
                  placeholder="Fluid Loss"
                  type="text"
                  value={formData.fluid_loss}
                  handleChange={handleChangeData("fluid_loss")}
                />

                <FormControlCard
                  labelForm="pH"
                  placeholder="pH"
                  type="text"
                  value={formData.ph}
                  handleChange={handleChangeData("ph")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Solids"
                  placeholder="Solids"
                  type="text"
                  value={formData.solids}
                  handleChange={handleChangeData("solids")}
                />

                <FormControlCard
                  labelForm="Sand"
                  placeholder="Sand"
                  type="text"
                  value={formData.sand}
                  handleChange={handleChangeData("sand")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Water"
                  placeholder="Water"
                  type="text"
                  value={formData.water}
                  handleChange={handleChangeData("water")}
                />

                <FormControlCard
                  labelForm="Oil"
                  placeholder="Oil"
                  type="text"
                  value={formData.oil}
                  handleChange={handleChangeData("oil")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="HGS"
                  placeholder="HGS"
                  type="text"
                  value={formData.hgs}
                  handleChange={handleChangeData("hgs")}
                />

                <FormControlCard
                  labelForm="LGS"
                  placeholder="LGS"
                  type="text"
                  value={formData.lgs}
                  handleChange={handleChangeData("lgs")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="LTLP"
                  placeholder="LTLP"
                  type="text"
                  value={formData.ltlp}
                  handleChange={handleChangeData("ltlp")}
                />

                <FormControlCard
                  labelForm="HTHP"
                  placeholder="HTHP"
                  type="text"
                  value={formData.hthp}
                  handleChange={handleChangeData("hthp")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Cake"
                  placeholder="Cake"
                  type="text"
                  value={formData.cake}
                  handleChange={handleChangeData("cake")}
                />

                <FormControlCard
                  labelForm="E Stb"
                  placeholder="E Stb"
                  type="text"
                  value={formData.e_stb}
                  handleChange={handleChangeData("e_stb")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="PF"
                  placeholder="PF"
                  type="text"
                  value={formData.pf}
                  handleChange={handleChangeData("pf")}
                />

                <FormControlCard
                  labelForm="MF"
                  placeholder="MF"
                  type="text"
                  value={formData.mf}
                  handleChange={handleChangeData("mf")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="PM"
                placeholder="PM"
                type="text"
                value={formData.pm}
                handleChange={handleChangeData("pm")}
              />
            </GridItem>
            <GridItem>
              <FormControlCard
                labelForm="ECD"
                placeholder="ECD"
                type="text"
                value={formData.ecd}
                handleChange={handleChangeData("ecd")}
              />
            </GridItem>
          </Grid>

          <Flex justifyContent="flex-end" mt={4}>
            <Button colorScheme="blue" variant="solid" onClick={handleAddData}>
              Add
            </Button>
          </Flex>
        </CardFormK3>
      </GridItem>

      <GridItem colSpan={2} >
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
