import React, { useState, useEffect } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";

const WellProfile = ({ data }) => {
  const datas = data?.data;
  
  // State untuk menyimpan nilai-nilai dari API yang bisa diubah
  const [afeNumber, setAfeNumber] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [wpbYear, setWpbYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rigType, setRigType] = useState("");
  const [rigName, setRigName] = useState("");
  const [rigHorsePower, setRigHorsePower] = useState("");

  // Mengisi nilai form dengan data dari API
  useEffect(() => {
    if (datas) {
      setAfeNumber(datas.afe_number || "");
      setTotalBudget(datas.job_plan?.total_budget || "");
      setWpbYear(datas.wpb_year || "");
      setStartDate(datas.job_plan?.start_date || "");
      setRigType(datas.job_plan?.rig_type || "");
      setRigName(datas.job_plan?.rig_name || "");
      setRigHorsePower(datas.job_plan?.rig_horse_power || "");
    }
  }, [datas]);

  // Fungsi untuk menangani perubahan input di setiap field
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <CardFormK3
      title="Well Profile"
      icon={FaOilWell}
      subtitle="Well Profile"
      iconColor="black"
      padding="18px 36px"
    >
      <Flex gap={2}>
        <FormControlCard
          labelForm="AFE Number"
          placeholder="AFE Number"
          value={afeNumber}
          onChange={handleInputChange(setAfeNumber)} // Field editable
        />
        <FormControlCard
          type={"number"}
          labelForm="Total Budget"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={handleInputChange(setTotalBudget)} // Field editable
        />
      </Flex>
      <VStack>
        <FormControlCard
          type={"number"}
          labelForm="WP&B Year"
          placeholder="WP&B Year"
          value={wpbYear}
          onChange={handleInputChange(setWpbYear)} // Field editable
        />
        <FormControlCard
          type="date"
          labelForm="Start Date"
          placeholder="Start Date"
          value={startDate}
          onChange={handleInputChange(setStartDate)} // Field editable
        />
      </VStack>
      <HStack>
        <FormControlCard
          labelForm="Rig Type"
          placeholder="Rig Type"
          value={rigType}
          onChange={handleInputChange(setRigType)} // Field editable
        />
        <FormControlCard
          type="text"
          labelForm="Rig Name"
          placeholder="Rig Name"
          value={rigName}
          onChange={handleInputChange(setRigName)} // Field editable
        />
      </HStack>
      <VStack>
        <FormControlCard
          type="number"
          labelForm="Rig Horse Power"
          placeholder="Rig Horse Power"
          value={rigHorsePower}
          inputRightOn={"HP"}
          onChange={handleInputChange(setRigHorsePower)} // Field editable
        />
      </VStack>
    </CardFormK3>
  );
};

export default WellProfile;
