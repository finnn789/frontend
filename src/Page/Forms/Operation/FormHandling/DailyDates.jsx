import React, { useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import SimpleButton from "../../Components/SimpleButton";
import FormControlCard from "../../Components/FormControl";
import CardFormK3 from "../../Components/CardFormK3";
import { GetDateJobInstances } from "../../../API/APIKKKS";
import { useLocation } from "react-router-dom";
import { dates } from "./Dates";

const DailyDates = ({ handleChangeOfData }) => {
  let location = useLocation();
  const { job_plan_ld } = location.state;
  const date = dates();

  console.log(date);
  
  const [dateNow, setDateNow] = useState("");

  const [dateDataJobPlan, setDateDataJobPlan] = useState([]);
  
  

  const [dataSetData, setDataSetData] = useState({
    report_date: null,
    avg_wob: null,
    avg_rop: null,
    avg_rpm: null,
    torque: null,
    stand_pipe_pressure: null,
    flow_rate: null,
    string_weight: null,
    rotating_weight: null,
    total_drilling_time: null,
    circulating_pressure: null,
    daily_cost: null,
    daily_mud_cost: null,
    day_supervisor: null,
    night_supervisor: null,
    engineer: null,
    geologist: null,
  });
  // console.log(dataSetData);

  React.useEffect(()=> {
    GetDateJobInstances(job_plan_ld).then((res) => {
      setDateDataJobPlan(res.data);
    });

  },[job_plan_ld])

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

  //   x
  return (
    <>
      <SimpleGrid width={"100%"} columns={10} spacing={2}>
        {dateDataJobPlan.map((date, index) => (
          <Box key={index}>
            <SimpleButton
              isActive={date === dateNow}
              onClick={() => setDateNow(date.date)}
              colorScheme={date.color}
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
            type={"number"}
            value={dataSetData.avg_wob}
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
            type={"number"}
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
          <FormControlCard
            labelForm="AFE Number"
            type={"text"}
            handleChange={handleChange("afe_number", "number")}
          />
          <FormControlCard
            labelForm="AFE Cost"
            type={"text"}
            handleChange={handleChange("afe_cost", "number")}
          />
          <FormControlCard
            labelForm="Daily Cost"
            type={"number"}
            handleChange={handleChange("daily_cost", "number")}
          />
          <FormControlCard
            labelForm="Cumulative Cost"
            type={"number"}
            handleChange={handleChange("cumulative_cost", "number")}
          />
          <FormControlCard
            labelForm="Daily Mud Cost"
            type={"number"}
            handleChange={handleChange("daily_mud_cost", "number")}
          />
          <FormControlCard
            labelForm="Cumulative Mud Cost"
            type={"number"}
            handleChange={handleChange("cumulative_mud_cost", "number")}
          />
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
      <CardFormK3 title="" subtitle="" icon={""} padding=" 0px 12px 20px 12px">
        <FormControlCard
          labelForm="Day Summary "
          type={"text"}
          handleChange={handleChange("day_summary", "text")}
          isTextArea
        />
        <FormControlCard
          labelForm="Day Forecast "
          type={"text"}
          handleChange={handleChange("day_forecast", "text")}
          isTextArea
        />
      </CardFormK3>
    </>
  );
};

export default DailyDates;
