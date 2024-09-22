import React, { useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl"; // Pastikan path ini sesuai dengan lokasi komponen Anda
import CardFormK3 from "../../Components/CardFormK3";

const BitRecord = ({ handleChangeOfData, titleBitRecord }) => {
  const [formData, setFormData] = useState({
    id: null,
    bit_size: null,
    bit_number: null,
    bit_run: null,
    manufacturer: null,
    iadc_code: null,
    jets: null,
    serial: null,
    depth_out: null,
    depth_in: null,
    meterage: null,
    bit_hours: null,
    nozzels: null,
    dull_grade: null,
  });

  React.useEffect(() => {
    handleChangeOfData(formData);
  }, [formData]);
  const handleChangeData = (name) => (e) => {
    let value = e.target.value;
    const type = e.target.type;
    
    if (type === "number") {
      // Jika ada titik desimal, proses sebagai float, jika tidak proses sebagai integer
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);

      // Jika hasil parsing tidak valid (NaN), set ke string kosong atau null
      if (isNaN(value)) {
        value = "";
      }
    }

    // Update formData dengan nilai yang diproses
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      
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
  );
};

export default BitRecord;
