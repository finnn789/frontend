import React, { useState, useEffect } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";

const WellProfile = ({ data, onChange }) => {
  const datas = data?.data;

  // State lokal untuk field di luar dan di dalam job_plan
  const [afeNumber, setAfeNumber] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [wpbYear, setWpbYear] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rigType, setRigType] = useState("");
  const [rigName, setRigName] = useState("");
  const [rigHorsePower, setRigHorsePower] = useState("");

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

  const handleInputChange = (field, isJobPlanField = false) => (e) => {
    const value = e.target.value;

    // Update state lokal
    switch (field) {
      case 'afe_number':
        setAfeNumber(value);
        break;
      case 'total_budget':
        setTotalBudget(value);
        break;
      case 'wpb_year':
        setWpbYear(value);
        break;
      case 'start_date':
        setStartDate(value);
        break;
      case 'rig_type':
        setRigType(value);
        break;
      case 'rig_name':
        setRigName(value);
        break;
      case 'rig_horse_power':
        setRigHorsePower(value);
        break;
      default:
        break;
    }

    // Mengirim perubahan ke parent, menyesuaikan apakah field ada di dalam job_plan atau tidak
    if (isJobPlanField) {
      onChange(`job_plan.${field}`, value); // Field yang ada di dalam job_plan
    } else {
      onChange(field, value); // Field di luar job_plan
    }
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
          onChange={handleInputChange('afe_number')} // Field di luar job_plan
        />
        <FormControlCard
          type="number"
          labelForm="Total Budget"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={handleInputChange('total_budget', true)} // Field di dalam job_plan
        />
      </Flex>
      <VStack>
        <FormControlCard
          type="number"
          labelForm="WP&B Year"
          placeholder="WP&B Year"
          value={wpbYear}
          onChange={handleInputChange('wpb_year')} // Field di luar job_plan
        />
        <FormControlCard
          type="date"
          labelForm="Start Date"
          placeholder="Start Date"
          value={startDate}
          onChange={handleInputChange('start_date', true)} // Field di dalam job_plan
        />
      </VStack>
      <HStack>
        <FormControlCard
          labelForm="Rig Type"
          placeholder="Rig Type"
          value={rigType}
          onChange={handleInputChange('rig_type', true)} // Field di dalam job_plan
        />
        <FormControlCard
          type="text"
          labelForm="Rig Name"
          placeholder="Rig Name"
          value={rigName}
          onChange={handleInputChange('rig_name', true)} // Field di dalam job_plan
        />
      </HStack>
      <VStack>
        <FormControlCard
          type="number"
          labelForm="Rig Horse Power"
          placeholder="Rig Horse Power"
          value={rigHorsePower}
          inputRightOn="HP"
          onChange={handleInputChange('rig_horse_power', true)} // Field di dalam job_plan
        />
      </VStack>
    </CardFormK3>
  );
};

export default WellProfile;
