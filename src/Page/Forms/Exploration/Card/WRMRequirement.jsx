import React, { useState, useEffect } from "react";
import { Box, VStack, Checkbox, Heading } from "@chakra-ui/react";

const WRMRequirement = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    wrm_pembebasan_lahan: false,
    wrm_ippkh: false,
    wrm_ukl_upl: false,
    wrm_amdal: false,
    wrm_pengadaan_rig: false,
    wrm_pengadaan_drilling_services: false,
    wrm_pengadaan_lli: false,
    wrm_persiapan_lokasi: false,
    wrm_internal_kkks: false,
    wrm_evaluasi_subsurface: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  useEffect(() => {
    onDataChange(formData);
  }, [formData]);

  return (
    <Box borderWidth="1px" borderRadius="lg" mt={4} p={6} boxShadow="md">
      <Heading size="md" mb={4}>
        <Box as="span" mr={2}>
          🌐
        </Box>
        WRM Requirements
      </Heading>
      <VStack align="start" spacing={3}>
        <Checkbox
          name="wrm_pembebasan_lahan"
          isChecked={formData.wrm_pembebasan_lahan}
          onChange={handleCheckboxChange}
        >
          Pembebasan Lahan
        </Checkbox>
        <Checkbox
          name="wrm_ippkh"
          isChecked={formData.wrm_ippkh}
          onChange={handleCheckboxChange}
        >
          Izin PPKH
        </Checkbox>
        <Checkbox
          name="wrm_uklupl"
          isChecked={formData.wrm_uklupl}
          onChange={handleCheckboxChange}
        >
          UKL & UPL
        </Checkbox>
        <Checkbox
          name="wrm_amdal"
          isChecked={formData.wrm_amdal}
          onChange={handleCheckboxChange}
        >
          AMDAL
        </Checkbox>
        <Checkbox
          name="wrm_pengadaan_rig"
          isChecked={formData.wrm_pengadaan_rig}
          onChange={handleCheckboxChange}
        >
          Pengadaan Rig
        </Checkbox>
        <Checkbox
          name="wrm_pengadaan_drilling_services"
          isChecked={formData.wrm_pengadaan_drilling_services}
          onChange={handleCheckboxChange}
        >
          Pengadaan Drilling Services
        </Checkbox>
        <Checkbox
          name="wrm_pengadaan_lli"
          isChecked={formData.wrm_pengadaan_lli}
          onChange={handleCheckboxChange}
        >
          Pengadaan LLI
        </Checkbox>
        <Checkbox
          name="wrm_persiapan_lokasi"
          isChecked={formData.wrm_persiapan_lokasi}
          onChange={handleCheckboxChange}
        >
          Persiapan Lokasi
        </Checkbox>
        <Checkbox
          name="wrm_internal_kkks"
          isChecked={formData.wrm_internal_kkks}
          onChange={handleCheckboxChange}
        >
          Internal KKKS
        </Checkbox>
        <Checkbox
          name="wrm_evaluasi_subsurface"
          isChecked={formData.wrm_evaluasi_subsurface}
          onChange={handleCheckboxChange}
        >
          Evaluasi Subsurface
        </Checkbox>
      </VStack>
    </Box>
  );
};

export default WRMRequirement;
