import { Button, CardFooter, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CardFormK3 from "../../Components/CardFormK3";

const DocPernyataan = () => {
  const renderUpload = () => {
    return <Button colorScheme="blue">Upload</Button>;
  };
  return (
    <div>
      <CardFormK3 title="Dokumen Pernyataan" actionButton={renderUpload()} subtitle="" icon={null}>
        <Flex gap={4}>
          <Text>
            Pernyataan Bahwa data yang disampaikan adalah benar dan realisasi
            penyelesaian kontrakn sudah sesuai dengan ruang lingkup kerja yang
            <br />
            disetujui SKKMigas dan peraturan/ketentuan yang berlaku
          </Text>
        </Flex>
      </CardFormK3>
    </div>
  );
};

export default DocPernyataan;
