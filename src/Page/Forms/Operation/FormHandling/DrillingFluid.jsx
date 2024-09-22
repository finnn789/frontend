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

const DrillingFluid = ({ handleChangeOfData }) => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    // mud_type: "",
    // time: "",
    // mw_in: 0,
    // mw_out: 0,
    // temp_in: 0,
    // temp_out: 0,
    // pres_grad: 0,
    // visc: 0,
    // pv: 0,
    // yp: 0,
    // gels_10_sec: 0,
    // gels_10_min: 0,
    // fluid_loss: 0,
    // ph: 0,
    // solids: 0,
    // sand: 0,
    // water: 0,
    // oil: 0,
    // hgs: 0,
    // lgs: 0,
    // ltlp: 0,
    // hthp: 0,
    // cake: 0,
    // e_stb: 0,
    // pf: 0,
    // mf: 0,
    // pm: 0,
    // ecd: 0,
  });

  React.useEffect(() => {
    handleChangeOfData(tableData);
  }, [tableData]);

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

  const handleChangeData = React.useCallback(
    (name, type) => (e) => {
      let value = e.target.value;

      // Jika tipe input adalah number, kita periksa apakah itu float atau integer
      if (type === "number") {
        // Konversi nilai ke number, dan pastikan menerima angka integer dan float
        value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);

        // Jika nilai yang dikonversi tidak valid (misalnya NaN), set nilai menjadi string kosong
        if (isNaN(value)) {
          value = "";
        }
      }

      // Set formData dengan nilai yang baru
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleAddData = () => {
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      mud_type: null,
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
  };

  const handleDelete = (row) => {
    setTableData((prevTableData) =>
      prevTableData.filter((data) => data !== row)
    );
  };
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily={"Montserrat"}>
      <GridItem colSpan={2}>
        <CardFormK3
          title="Drilling Fluid"
          padding="18px 8px"
          subtitle="Drilling Fluid"
        >
          {/* Layout Grid with 2 columns for inputs */}
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem colSpan={2}>
              <FormControlCard
                labelForm="Time"
                placeholder="Time"
                type="time"
                value={formData.time}
                handleChange={handleChangeData("time", "text")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="MW In"
                placeholder="MW In"
                type="number"
                value={formData.mw_in}
                handleChange={handleChangeData("mw_in", "number")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="MW Out"
                placeholder="MW Out"
                type="number"
                value={formData.mw_out}
                handleChange={handleChangeData("mw_out", "number")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="Temp In"
                placeholder="Temp In"
                type="number"
                value={formData.temp_in}
                handleChange={handleChangeData("temp_in", "number")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="Temp Out"
                placeholder="Temp Out"
                type="number"
                value={formData.temp_out}
                handleChange={handleChangeData("temp_out", "number")}
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
                />

                <FormControlCard
                  labelForm="Visc"
                  placeholder="Visc"
                  type="number"
                  value={formData.visc}
                  handleChange={handleChangeData("visc", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="PV"
                  placeholder="PV"
                  type="number"
                  value={formData.pv}
                  handleChange={handleChangeData("pv", "number")}
                />

                <FormControlCard
                  labelForm="YP"
                  placeholder="YP"
                  type="number"
                  value={formData.yp}
                  handleChange={handleChangeData("yp", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Gels 10 sec"
                  placeholder="Gels 10 sec"
                  type="number"
                  value={formData.gels_10_sec}
                  handleChange={handleChangeData("gels_10_sec", "number")}
                />

                <FormControlCard
                  labelForm="Gels 10 min"
                  placeholder="Gels 10 min"
                  type="number"
                  value={formData.gels_10_min}
                  handleChange={handleChangeData("gels_10_min", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Fluid Loss"
                  placeholder="Fluid Loss"
                  type="number"
                  value={formData.fluid_loss}
                  handleChange={handleChangeData("fluid_loss", "number")}
                />

                <FormControlCard
                  labelForm="pH"
                  placeholder="pH"
                  type="number"
                  value={formData.ph}
                  handleChange={handleChangeData("ph", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Solids"
                  placeholder="Solids"
                  type="number"
                  value={formData.solids}
                  handleChange={handleChangeData("solids", "number")}
                />

                <FormControlCard
                  labelForm="Sand"
                  placeholder="Sand"
                  type="number"
                  value={formData.sand}
                  handleChange={handleChangeData("sand", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="Water"
                  placeholder="Water"
                  type="number"
                  value={formData.water}
                  handleChange={handleChangeData("water", "number")}
                />

                <FormControlCard
                  labelForm="Oil"
                  placeholder="Oil"
                  type="number"
                  value={formData.oil}
                  handleChange={handleChangeData("oil", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="HGS"
                  placeholder="HGS"
                  type="number"
                  value={formData.hgs}
                  handleChange={handleChangeData("hgs", "number")}
                />

                <FormControlCard
                  labelForm="LGS"
                  placeholder="LGS"
                  type="number"
                  value={formData.lgs}
                  handleChange={handleChangeData("lgs", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="LTLP"
                  placeholder="LTLP"
                  type="number"
                  value={formData.ltlp}
                  handleChange={handleChangeData("ltlp", "number")}
                />

                <FormControlCard
                  labelForm="HTHP"
                  placeholder="HTHP"
                  type="number"
                  value={formData.hthp}
                  handleChange={handleChangeData("hthp", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex gap={2}>
                <FormControlCard
                  labelForm="Cake"
                  placeholder="Cake"
                  type="number"
                  value={formData.cake}
                  handleChange={handleChangeData("cake", "number")}
                />

                <FormControlCard
                  labelForm="E Stb"
                  placeholder="E Stb"
                  type="number"
                  value={formData.e_stb}
                  handleChange={handleChangeData("e_stb", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex>
                <FormControlCard
                  labelForm="PF"
                  placeholder="PF"
                  type="number"
                  value={formData.pf}
                  handleChange={handleChangeData("pf", "number")}
                />

                <FormControlCard
                  labelForm="MF"
                  placeholder="MF"
                  type="number"
                  value={formData.mf}
                  handleChange={handleChangeData("mf", "number")}
                />
              </Flex>
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="PM"
                placeholder="PM"
                type="number"
                value={formData.pm}
                handleChange={handleChangeData("pm", "number")}
              />
            </GridItem>

            <GridItem>
              <FormControlCard
                labelForm="ECD"
                placeholder="ECD"
                type="number"
                value={formData.ecd}
                handleChange={handleChangeData("ecd", "number")}
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
