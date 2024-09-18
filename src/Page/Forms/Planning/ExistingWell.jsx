import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Grid,
} from "@chakra-ui/react";
import { getWellInstance } from "../../../Page/API/APIKKKS";
import AsyncSelect from "react-select/async";

const ExistingWell = ({ formErrors, dataExistingWell }) => {
  const [wellInstance, setWellInstance] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getWellInstance();
      setWellInstance(data);
    };
    getData();
  }, []);

  const handleChange = (field) => (e) => {
    dataExistingWell({ [field]: e.target.value });
  };

  const handleChangeNumber = (field) => (e) => {
    dataExistingWell({ [field]: Number(e.target.value) });
  };

  // Function to filter well options with flexible search
  const filterWellOptions = (inputValue) => {
    return wellInstance
      .filter((well) =>
        well.well_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        well.well_name.toLowerCase().replace(/\s+/g, '').includes(inputValue.toLowerCase()) ||
        well.well_name.match(new RegExp(inputValue, 'i'))
      )
      .map((well) => ({
        value: well.id,
        label: well.well_name,
      }));
  };

  const loadOptions = (inputValue, callback) => {
    const filteredOptions = filterWellOptions(inputValue);
    callback(filteredOptions);
  };

  return (
    <Box>
      {/* Searchable Dropdown for Existing Well */}
      <FormControl isInvalid={formErrors["job_plan.well_id"]}>
        <FormLabel>Existing Well</FormLabel>
        <AsyncSelect
          cacheOptions
          defaultOptions={wellInstance.map((well) => ({
            value: well.id,
            label: well.well_name,
          }))}
          loadOptions={loadOptions}
          onChange={(selectedOption) => handleChange("well_id")({ target: { value: selectedOption.value } })}
          placeholder="Select Existing Well"
        />
        {formErrors["job_plan.well_id"] && (
          <FormErrorMessage>{formErrors["job_plan.well_id"]}</FormErrorMessage>
        )}
      </FormControl>

      {/* Grid Layout for Onstream to Target Water Cut Fields */}
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
        {/* Field Onstream Oil */}
        <FormControl isInvalid={formErrors["job_plan.onstream_oil"]}>
          <FormLabel>Onstream Oil</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("onstream_oil")}
          />
          {formErrors["job_plan.onstream_oil"] && (
            <FormErrorMessage>{formErrors["job_plan.onstream_oil"]}</FormErrorMessage>
          )}
        </FormControl>

        {/* Field Onstream Gas */}
        <FormControl isInvalid={formErrors["job_plan.onstream_gas"]}>
          <FormLabel>Onstream Gas</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("onstream_gas")}
          />
          {formErrors["job_plan.onstream_gas"] && (
            <FormErrorMessage>{formErrors["job_plan.onstream_gas"]}</FormErrorMessage>
          )}
        </FormControl>

        {/* Field Onstream Water Cut */}
        <FormControl isInvalid={formErrors["job_plan.onstream_water_cut"]}>
          <FormLabel>Onstream Water Cut</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("onstream_water_cut")}
          />
          {formErrors["job_plan.onstream_water_cut"] && (
            <FormErrorMessage>{formErrors["job_plan.onstream_water_cut"]}</FormErrorMessage>
          )}
        </FormControl>

        {/* Field Target Oil */}
        <FormControl isInvalid={formErrors["job_plan.target_oil"]}>
          <FormLabel>Target Oil</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("target_oil")}
          />
          {formErrors["job_plan.target_oil"] && (
            <FormErrorMessage>{formErrors["job_plan.target_oil"]}</FormErrorMessage>
          )}
        </FormControl>

        {/* Field Target Gas */}
        <FormControl isInvalid={formErrors["job_plan.target_gas"]}>
          <FormLabel>Target Gas</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("target_gas")}
          />
          {formErrors["job_plan.target_gas"] && (
            <FormErrorMessage>{formErrors["job_plan.target_gas"]}</FormErrorMessage>
          )}
        </FormControl>

        {/* Field Target Water Cut */}
        <FormControl isInvalid={formErrors["job_plan.target_water_cut"]}>
          <FormLabel>Target Water Cut</FormLabel>
          <Input
            type="number"
            onChange={handleChangeNumber("target_water_cut")}
          />
          {formErrors["job_plan.target_water_cut"] && (
            <FormErrorMessage>{formErrors["job_plan.target_water_cut"]}</FormErrorMessage>
          )}
        </FormControl>
      </Grid>
    </Box>
  );
};

export default ExistingWell;
