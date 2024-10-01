import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Button, Text } from "@chakra-ui/react";

const DocWPB = () => {
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
        Salinan dokumen persetujuan AFE atau WP&B dan ringkasan rencana Pekerjaan sesuai dengan persetujuan AFE yang disetujui
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocWPB;
