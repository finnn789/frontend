import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import { Button, SimpleGrid } from "@chakra-ui/react";

const AFENumber = () => {

  
  const [fieldData, setFieldData] = React.useState([]);

  const handleChange = React.useCallback((data, name) => {
    setFieldData({
      ...fieldData,
      [name]: data,
    });
  });
  return (
    <div>
      <CardFormK3 title="" subtitle="" icon={null} >
        <SimpleGrid columns={2} gap={2} >
          <FormControlCard labelForm="AFE Number" type={"text"} />
          <FormControlCard labelForm="Total Anggaran" type={"text"} />
        </SimpleGrid>

        <FormControlCard labelForm="Estimasi Realisasi Biaya" type={"text"} />
      </CardFormK3>
    </div>
  );
};

export default AFENumber;
