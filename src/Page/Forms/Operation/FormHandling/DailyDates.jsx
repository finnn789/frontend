import React, { useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import SimpleButton from "../../Components/SimpleButton";
import FormControlCard from "../../Components/FormControl";
import CardFormK3 from "../../Components/CardFormK3";
const DailyDates = ({ handleChangeOfData }) => {
  const [dateNow, setDateNow] = useState("");

  const [dataSetData, setDataSetData] = useState({
    report_date: "2024-09-15",
    avg_wob: 0,
    avg_rop: 0,
    avg_rpm: 0,
    torque: 0,
    stand_pipe_pressure: 0,
    flow_rate: 0,
    string_weight: 0,
    rotating_weight: 0,
    total_drilling_time: 0,
    circulating_pressure: 0,
    daily_cost: 0,
    daily_mud_cost: 0,
    day_supervisor: 0,
    night_supervisor: 0,
    engineer: 0,
    geologist: 0,
  });
  // console.log(dataSetData);

  React.useEffect(() => {
    setDataSetData((prevData) => ({
      ...prevData,
      report_date: dateNow,
    }));
  }, [dateNow]);

  React.useEffect(() => {
    handleChangeOfData(dataSetData);
  }, [dataSetData]);

  const handleChange = React.useCallback(
    (name, type) => (e) => {
      let value = e.target.value;
      if (type === "number") {
        value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      } else {
        value = String(value);
      }

      setDataSetData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setDataSetData]
  );

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
          <FormControlCard
            labelForm="Avg WOB"
            placeholder="Avg WOB"
            handleChange={handleChange("avg_wob", "number")}
          />
          <FormControlCard
            labelForm="Avg ROB"
            type={"number"}
            placeholder="Avg ROB"
            handleChange={handleChange("avg_rop", "number")}
          />
          <FormControlCard
            labelForm="Avg RPM"
            type={"number"}
            placeholder="Avg RPM"
            handleChange={handleChange("avg_rpm", "number")}
          />
          <FormControlCard
            labelForm="Torque"
            type={"number"}
            placeholder="Torque"
            handleChange={handleChange("torque", "number")}
          />
          <FormControlCard
            labelForm="Stand Pipe Press"
            type={"text"}
            placeholder="Stand Pipe Press"
            handleChange={handleChange("stand_pipe_pressure", "number")}
          />
          <FormControlCard
            labelForm="Flow Rate"
            placeholder="Flow Rate"
            type={"number"}
            handleChange={handleChange("flow_rate", "number")}
          />
          <FormControlCard
            labelForm="String Weight"
            placeholder="String Weight"
            type={"number"}
            handleChange={handleChange("string_weight", "number")}
          />
          <FormControlCard
            labelForm="Rotating Weight"
            placeholder="Rotating Weight"
            type={"number"}
            handleChange={handleChange("rotating_weight", "number")}
          />
          <FormControlCard
            labelForm="Total Drilling Time"
            type={"number"}
            placeholder="Total Drilling Time"
            handleChange={handleChange("total_drilling_time", "number")}
          />
          <FormControlCard
            labelForm="Circulating Press"
            type={"number"}
            placeholder="Circulating Press"
            handleChange={handleChange("circulating_pressure", "number")}
          />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard
            labelForm="Rig Type / Name"
            type={"text"}
            placeholder="Rig Type / Name"
            handleChange={handleChange("rig_type", "text")}
          />
          <FormControlCard
            labelForm="Rig Power"
            type={"number"}
            placeholder="Rig Power"
            inputRightOn={"Horse Power "}
            handleChange={handleChange("rig_power", "number")}
          />
          <FormControlCard
            labelForm="KB Elev"
            type={"text"}
            placeholder="KB Elev"
            handleChange={handleChange("kb_elev", "number")}
          />
          <FormControlCard
            labelForm="Current MD"
            type={"number"}
            placeholder="Current MD"
            handleChange={handleChange("current_md", "number")}
          />
          <FormControlCard
            labelForm="Progress MD"
            type={"text"}
            handleChange={handleChange("progress_md", "number")}
          />
          <FormControlCard labelForm="PTMD" type={"text"} />
          <FormControlCard labelForm="Spud Date" type={"date"} />
          <FormControlCard labelForm="Realease Date" type={"date"} />
          <FormControlCard labelForm="Planned Days" type={"text"} />
          <FormControlCard labelForm="Days from Spud" type={"date"} />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard labelForm="AFE Number" type={"text"} />
          <FormControlCard labelForm="AFE Cost" type={"text"} />
          <FormControlCard
            labelForm="Daily Cost"
            type={"number"}
            handleChange={handleChange("daily_cost", "number")}
          />
          <FormControlCard labelForm="Cumulative Cost" type={"number"} handleChange={handleChange("cumulative_cost", "number")} />
          <FormControlCard
            labelForm="Daily Mud Cost"
            type={"number"}
            handleChange={handleChange("daily_mud_cost", "number")}
          />
          <FormControlCard labelForm="Cumulative Mud Cost" type={"number"}  handleChange={handleChange("cumulative_mud_cost", "number")}/>
          <FormControlCard
            labelForm="Day Suprevisor"
            type={"number"}
            handleChange={handleChange("day_supervisor", "number")}
          />
          <FormControlCard
            labelForm="Night Supervisor"
            type={"number"}
            handleChange={handleChange("night_supervisor", "number")}
          />
          <FormControlCard
            labelForm="Engineer"
            type={"number"}
            handleChange={handleChange("engineer", "number")}
          />
          <FormControlCard
            labelForm="Geologist"
            type={"number"}
            handleChange={handleChange("geologist", "number")}
          />
          {/* <FormControlCard labelForm="Days from Spud" type={"number"} /> */}
        </CardFormK3>
      </SimpleGrid>
    </>
  );
};

export default DailyDates;
