import React from "react";
import FormInputFile from "../../Components/FormInputFile";
import CardFormK3 from "../../Components/CardFormK3";
import { FaPlus } from "react-icons/fa6";
import { Button, Flex } from "@chakra-ui/react";
import FormControlCard from "../../Components/FormControl";

const DocPengajuanP3 = () => {
  return (
    <div>
      <CardFormK3 title="Dokumen Pengajuan P3" subtitle="" icon={null}>
        <Flex gap={4}>
          
          <FormControlCard labelForm="File Name" type={"text"} />
          <Button colorScheme="blue">Upload</Button>
        </Flex>
      </CardFormK3>
    </div>
  );
};

export default DocPengajuanP3;
