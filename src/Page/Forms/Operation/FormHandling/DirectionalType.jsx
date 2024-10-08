import React, { useState, useEffect } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormControlCard from "../../Components/FormControl";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import { FaOilWell } from "react-icons/fa6";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";

const DirectionalType = ({ data, onChange }) => {
  const datas = data?.data;

  // console.log("🚀 ~ DirectionalType ~ datas:", datas)
  const directionalTypeOptions = [
    { value: "J-TYPE", label: "J-TYPE" },
    { value: "S-TYPE", label: "S-TYPE" },
    { value: "DIMENSION", label: "DIMENSION" },
  ];

  // State lokal untuk field di dalam well
  const [directionalType, setDirectionalType] = useState("");
  const [kickOffPoint, setKickOffPoint] = useState("");
  const [maximumInclination, setMaximumInclination] = useState("");
  const [azimuth, setAzimuth] = useState("");
  
  // Mengisi form dengan datas dari props ketika datas berubah
  useEffect(() => {
    if (datas) {
      setDirectionalType(datas.job_plan?.well?.well_directional_type ?? "");
      setKickOffPoint(datas.job_plan?.well.kick_off_point ?? "");
      setMaximumInclination(datas.job_plan?.well?.maximum_inclination ?? "");
      setAzimuth(datas.job_plan?.well?.azimuth ?? "");
    }
  }, [datas]);

  // console.log("🚀 ~ DirectionalType ~ kickOffPoint:", datas.job_plan?.well?.kick_off_point)
  const handleInputChange = (field, value) => {
    // Update state lokal
    switch (field) {
      case "well_directional_type":
        setDirectionalType(value);
        break;
      case "kick_off_point":
        setKickOffPoint(value);
        break;
      case "maximum_inclination":
        setMaximumInclination(value);
        break;
      case "azimuth":
        setAzimuth(value);
        break;
      default:
        break;
    }

    // Mengirim perubahan ke parent dalam struktur datas yang benar
    const updatedWellDatas = {
      ...datas?.well,
      [field]: value,
    };
    onChange("well", updatedWellDatas); // Update seluruh objek `well`
  };

  return (
    <CardFormK3
      title="Directional Type"
      icon={FaOilWell}
      subtitle="Directional Type"
      iconColor="black"
      padding="18px 36px"
    >
      <Flex gap={2}>
        <SelectComponent
          value={directionalType}
          onChange={(e) => handleInputChange("well_directional_type", e.target.value)}
        >
          {directionalTypeOptions.map((option, index) => (
            <SelectOption key={index} value={option.value} label={option.label} />
          ))}
        </SelectComponent>
      </Flex>
      <VStack>
        <FormControlCard
        
          type="number"
          labelForm="Kick Off Point"
          placeholder="Kick Off Point"
          value={kickOffPoint}
          handleChange={(e) => handleInputChange("kick_off_point", e.target.value)}
        />
      </VStack>
      <HStack>
        <FormControlCard
        
          type="number"
          labelForm="Maximum Inclination"
          placeholder="Maximum Inclination"
          value={maximumInclination}
          handleChange={(e) => handleInputChange("maximum_inclination", e.target.value)}
        />
        <FormControlCard
        
          type="number"
          labelForm="Azimuth"
          placeholder="Azimuth"
          value={azimuth}
          handleChange={(e) => handleInputChange("azimuth", e.target.value)}
        />
      </HStack>
    </CardFormK3>
  );
};

export default DirectionalType;
