import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Button, Text } from "@chakra-ui/react";

const DocListMaterial = () => {
  const renderActioButton = () => {
    return (
      <Button colorScheme="blue" size={"md"}>
        Upload
      </Button>
    );
  };
  return (
    <div>
      <CardFormK3
        title="Dokumen Laporan Pekerjaan"
        subtitle=""
        icon={null}
        actionButton={renderActioButton()}
      >
        <Text fontSize="18px">
        Daftar material dan spare part yang ditandatangani oleh KKKS
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocListMaterial;
