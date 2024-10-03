import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { Button, Text } from "@chakra-ui/react";

const DocLapPekerjaan = () => {
  const renderActioButton = () => {
    return (
      <Button colorScheme="blue" size={"md"} >
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
          Laporan Pekerjaan yang ditandatangani pejabat KKKSdan berisi informasi
          Berikut: <br />
          1. Resume/riwayat singkat operasi kegiatan pekerjaanpemboran sumur
          dari awal/MIRU sampai dengankompleksinasi produksi/P&A/Rig
          Down/Moving.
          <br /> 2. Tabel perbandingan rincian kegiatan dan S-curve biayaantara
          program dan aktual lengkap dengan penjelasandetail.
          <br /> 3. Penampang sumur rencana awal sebelum kegiatanrencana awal
          dan aktualnya sesudah kegiatan pekerjaansumur (penampang akhir sumur).
          <br /> 4. Data hasil tes/produksi/injektivitas rata-rata.
          <br /> 5. Peta koordinat sumur. <br /> 6. Dokumentasi foto sumur.
        </Text>
      </CardFormK3>
    </div>
  );
};

export default DocLapPekerjaan;
