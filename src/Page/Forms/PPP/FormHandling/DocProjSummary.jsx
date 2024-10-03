import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormInputFile from "../../Components/FormInputFile";
import { Button, Text } from "@chakra-ui/react";

const DocProjSummary = () => {
  const renderUpload = () => {
    return <Button colorScheme="blue">Upload</Button>;
  };
  return (
    <div>
      <CardFormK3
        actionButton={renderUpload()}
        title="Dokumen Project Summary"
        subtitle=""
        icon={null}
      >
        <Text fontSize="18px">
          Project Summary Latar Belakang proyek pekerjaan
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocProjSummary;
