import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Button, Text } from "@chakra-ui/react";

const DocNotProduction = () => {
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
          Untuk sumur yang ditutup dan tidak akan diproduksikan dilengkapi
          dengan:
          <br />
          a. Fotokopi formulir Migas bentuk lxi. <br />
          b. Data hasil uji kandungan lapisan atau hasil logging.
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocNotProduction;
