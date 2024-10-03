import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Button, Text } from "@chakra-ui/react";

const DocKorepondensi = () => {
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
          Korespondensi, surat menyurat dan/atau Risalah Rapatatas perubahan
          program kerja/casing design, problemsumur/problem operasi dan
          lain-lain sesuaibiaya diuar — persetujuan
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocKorepondensi;
