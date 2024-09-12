import React, { useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import SimpleButton from "../../Components/SimpleButton";
import FormControlCard from "../../Components/FormControl";
import CardFormK3 from "../../Components/CardFormK3";
const DailyDates = () => {
  const [dateNow, setDateNow] = useState({
    date: null,
  });
  //   console.log(dateNow);

  const dates = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(2024, 8, index + 1); // 8 untuk bulan September (index dimulai dari 0)
    return {
      date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
      day: date.toLocaleString("en-US", { weekday: "long" }), // Nama hari
    };
  });
  return (
    <>
      <SimpleGrid width={"100%"} columns={10} spacing={2}>
        {dates.map((date, index) => (
          <Box key={index}>
            <SimpleButton
              isActive={date.date === dateNow}
              onClick={() => setDateNow(date.date)}
              colorScheme="gray"
              key={index}
              title={date.date}
            />
          </Box>
        ))}
      </SimpleGrid>
      <Flex mt={2}>
        <FormControlCard
          labelForm="Dates"
          type={"text"}
          value={dateNow}
          placeholder="Dates"
          isDisabled
        />
      </Flex>

      <SimpleGrid columns={3} spacing={4}>
        <CardFormK3 title="" subtitle="" padding="6px 12px" icon="">
          <FormControlCard labelForm="Avg WOB" type={"text"} />
          <FormControlCard labelForm="Avg ROB" type={"text"} />
          <FormControlCard labelForm="Avg RPM" type={"text"} />
          <FormControlCard labelForm="Torque" type={"text"} />
          <FormControlCard labelForm="Stand Pipe Press" type={"text"} />
          <FormControlCard labelForm="Flow Rate" type={"text"} />
          <FormControlCard labelForm="String Weight" type={"text"} />
          <FormControlCard labelForm="Rotating Weight" type={"text"} />
          <FormControlCard labelForm="Total Drilling Time" type={"text"} />
          <FormControlCard labelForm="Circulating Press" type={"text"} />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard labelForm="Rig Type / Name" type={"text"} />
          <FormControlCard labelForm="Rig Power" type={"text"} />
          <FormControlCard labelForm="KB Elev" type={"text"} />
          <FormControlCard labelForm="Current MD" type={"text"} />
          <FormControlCard labelForm="Progress MD" type={"text"} />
          <FormControlCard labelForm="PTMD" type={"text"} />
          <FormControlCard labelForm="Spud Date" type={"date"} />
          <FormControlCard labelForm="Realease Date" type={"date"} />
          <FormControlCard labelForm="Planned Days" type={"text"} />
          <FormControlCard labelForm="Days from Spud" type={"date"} />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard labelForm="AFE Number" type={"text"} />
          <FormControlCard labelForm="AFE Cost" type={"text"} />
          <FormControlCard labelForm="Daily Cost" type={"number"} />
          <FormControlCard labelForm="Cumulative Cost" type={"number"} />
          <FormControlCard labelForm="Daily Mud Cost" type={"text"} />
          <FormControlCard labelForm="Day Suprevisor" type={"text"} />
          <FormControlCard labelForm="Spud Date" type={"date"} />
          <FormControlCard labelForm="Realease Date" type={"date"} />
          <FormControlCard labelForm="Planned Days" type={"text"} />
          <FormControlCard labelForm="Days from Spud" type={"date"} />
        </CardFormK3>
      </SimpleGrid>
    </>
  );
};

export default DailyDates;
