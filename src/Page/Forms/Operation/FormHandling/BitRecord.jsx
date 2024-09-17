import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl"; // Pastikan path ini sesuai dengan lokasi komponen Anda
import CardFormK3 from "../../Components/CardFormK3";

const BitRecord = ({handleChangeOfData}) => {
  const [formData, setFormData] = useState({
    daily_operations_report_id: "string",
    id: "string",
    bit_size: 0,
    bit_number: 0,
    bit_run: 0,
    manufacturer: "string",
    iadc_code: "string",
    jets: "string",
    serial: "string",
    depth_out: 0,
    depth_in: 0,
    meterage: 0,
    bit_hours: 0,
    nozzels: 0,
    dull_grade: "string",
  });

  React.useEffect(()=> {
    handleChangeOfData(formData)
  },[formData])
  const handleChangeData = (name) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  return (
    
      <CardFormK3 title="Bit Record" subtitle="BR">
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <FormControlCard
              labelForm="Daily Operations Report ID"
              placeholder="Daily Operations Report ID"
              type="text"
              value={formData.daily_operations_report_id}
              handleChange={handleChangeData("daily_operations_report_id")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="ID"
              placeholder="ID"
              type="text"
              value={formData.id}
              handleChange={handleChangeData("id")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Bit Size"
              placeholder="Bit Size"
              type="number"
              value={formData.bit_size}
              handleChange={handleChangeData("bit_size")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Bit Number"
              placeholder="Bit Number"
              type="number"
              value={formData.bit_number}
              handleChange={handleChangeData("bit_number")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Bit Run"
              placeholder="Bit Run"
              type="number"
              value={formData.bit_run}
              handleChange={handleChangeData("bit_run")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Manufacturer"
              placeholder="Manufacturer"
              type="text"
              value={formData.manufacturer}
              handleChange={handleChangeData("manufacturer")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="IADC Code"
              placeholder="IADC Code"
              type="text"
              value={formData.iadc_code}
              handleChange={handleChangeData("iadc_code")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Jets"
              placeholder="Jets"
              type="text"
              value={formData.jets}
              handleChange={handleChangeData("jets")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Serial"
              placeholder="Serial"
              type="text"
              value={formData.serial}
              handleChange={handleChangeData("serial")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Depth Out"
              placeholder="Depth Out"
              type="number"
              value={formData.depth_out}
              handleChange={handleChangeData("depth_out")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Depth In"
              placeholder="Depth In"
              type="number"
              value={formData.depth_in}
              handleChange={handleChangeData("depth_in")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Meterage"
              placeholder="Meterage"
              type="number"
              value={formData.meterage}
              handleChange={handleChangeData("meterage")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Bit Hours"
              placeholder="Bit Hours"
              type="number"
              value={formData.bit_hours}
              handleChange={handleChangeData("bit_hours")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Nozzels"
              placeholder="Nozzels"
              type="number"
              value={formData.nozzels}
              handleChange={handleChangeData("nozzels")}
            />
          </GridItem>

          <GridItem>
            <FormControlCard
              labelForm="Dull Grade"
              placeholder="Dull Grade"
              type="text"
              value={formData.dull_grade}
              handleChange={handleChangeData("dull_grade")}
            />
          </GridItem>
        </Grid>
      </CardFormK3>
    
  );
};

export default BitRecord;
